import base64
import hashlib
import hmac
import json
import os
import sqlite3
import sys
import time
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


ROOT = Path(__file__).resolve().parent
DATA_DIR = ROOT / "license-data"
DB_PATH = DATA_DIR / "licenses.sqlite3"
SECRET_PATH = DATA_DIR / "server-secret"
LEGACY_SECRET = "xiaowu1994"
LEGACY_MIGRATION_DEADLINE = 1785859200000
ADMIN_PASSWORD_HASH = "157421c681bfde5495f18aea96b37ae84921aab31c4098439e0cf409fe459008"
ALLOWED_ORIGINS = {
    "https://jiaxin-ppt.xiaowustudio.cn",
    "https://texhong-ppt.xiaowustudio.cn",
    "https://wiujianzhong.github.io",
}


def now_ms():
    return int(time.time() * 1000)


def simple_hash(value):
    result = 5381
    for char in value:
        result = ((result << 5) + result) + ord(char)
        result &= 0xFFFFFFFF
        if result >= 0x80000000:
            result -= 0x100000000
    return numpy_abs_compatible(result)


def numpy_abs_compatible(value):
    if value == -2147483648:
        return "zik0zk"
    return base36(abs(value))


def base36(value):
    chars = "0123456789abcdefghijklmnopqrstuvwxyz"
    if value == 0:
        return "0"
    output = []
    while value:
        value, remainder = divmod(value, 36)
        output.append(chars[remainder])
    return "".join(reversed(output))


def legacy_signature(machine_code, expiry):
    return simple_hash(f"{machine_code}|{expiry}|{LEGACY_SECRET}")


def decode_code(code):
    padding = "=" * (-len(code) % 4)
    raw = base64.b64decode(code + padding).decode("utf-8")
    return json.loads(raw)


def load_server_secret():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    if not SECRET_PATH.exists():
        SECRET_PATH.write_text(os.urandom(32).hex(), encoding="utf-8")
    return SECRET_PATH.read_text(encoding="utf-8").strip()


SERVER_SECRET = load_server_secret()


def server_signature(machine_code, expiry):
    message = f"{machine_code}|{expiry}".encode()
    return hmac.new(SERVER_SECRET.encode(), message, hashlib.sha256).hexdigest()


def verify_code(code):
    try:
        data = decode_code(code)
        machine_code = str(data["m"])
        expiry = int(data["e"])
        signature = str(data["s"])
        if expiry < now_ms():
            return None
        if hmac.compare_digest(signature, legacy_signature(machine_code, expiry)):
            return machine_code, expiry, "legacy"
        if hmac.compare_digest(signature, server_signature(machine_code, expiry)):
            return machine_code, expiry, "server"
    except (ValueError, KeyError, TypeError, json.JSONDecodeError):
        return None
    return None


def db():
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(DB_PATH)
    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS licenses (
            code_hash TEXT PRIMARY KEY,
            expiry INTEGER NOT NULL,
            original_machine TEXT NOT NULL,
            installations TEXT NOT NULL,
            updated_at INTEGER NOT NULL
        )
        """
    )
    return connection


def register_or_check(code, installation_id):
    code_hash = hashlib.sha256(code.encode()).hexdigest()
    with db() as connection:
        row = connection.execute(
            "SELECT expiry, original_machine, installations FROM licenses WHERE code_hash = ?",
            (code_hash,),
        ).fetchone()
        if row and int(row[0]) >= now_ms():
            expiry = int(row[0])
            machine_code = row[1]
        else:
            verified = verify_code(code)
            if not verified:
                return None
            machine_code, expiry, code_type = verified
            if code_type == "legacy" and now_ms() > LEGACY_MIGRATION_DEADLINE:
                return None
        installations = []
        if row:
            installations = json.loads(row[2] or "[]")
        if installation_id and installation_id not in installations:
            installations.append(installation_id)
        connection.execute(
            """
            INSERT INTO licenses(code_hash, expiry, original_machine, installations, updated_at)
            VALUES (?, ?, ?, ?, ?)
            ON CONFLICT(code_hash) DO UPDATE SET
                expiry = excluded.expiry,
                installations = excluded.installations,
                updated_at = excluded.updated_at
            """,
            (code_hash, expiry, machine_code, json.dumps(installations), now_ms()),
        )
    return expiry


class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        if self.path.startswith("/api/license/"):
            origin = self.headers.get("Origin", "")
            if origin in ALLOWED_ORIGINS:
                self.send_header("Access-Control-Allow-Origin", origin)
                self.send_header("Vary", "Origin")
            self.send_header("Access-Control-Allow-Headers", "Content-Type")
            self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
            self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_OPTIONS(self):
        if self.path.startswith("/api/license/"):
            self.send_response(204)
            self.end_headers()
            return
        self.send_error(404)

    def do_GET(self):
        if self.path == "/health":
            self.send_json(200, {"ok": True})
            return
        self.send_error(404)

    def read_json(self):
        length = int(self.headers.get("Content-Length", "0"))
        if length <= 0 or length > 65536:
            raise ValueError("请求内容无效")
        return json.loads(self.rfile.read(length).decode("utf-8"))

    def send_json(self, status, payload):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_POST(self):
        if self.path == "/api/license/check":
            try:
                payload = self.read_json()
                expiry = register_or_check(
                    str(payload.get("code", "")).strip(),
                    str(payload.get("installationId", "")).strip(),
                )
                if not expiry:
                    self.send_json(200, {"valid": False})
                    return
                self.send_json(200, {"valid": True, "expiry": expiry})
            except (ValueError, json.JSONDecodeError):
                self.send_json(400, {"valid": False, "message": "请求内容无效"})
            return

        if self.path == "/api/license/admin/generate":
            try:
                payload = self.read_json()
                password_hash = hashlib.sha256(
                    str(payload.get("password", "")).encode()
                ).hexdigest()
                if not hmac.compare_digest(password_hash, ADMIN_PASSWORD_HASH):
                    self.send_json(403, {"ok": False, "message": "管理员密码错误"})
                    return
                machine_code = str(payload.get("machineCode", "")).strip()
                days = max(1, min(int(payload.get("days", 365)), 3650))
                if not machine_code:
                    raise ValueError("机器码为空")
                expiry = now_ms() + days * 24 * 60 * 60 * 1000
                data = {
                    "m": machine_code,
                    "e": expiry,
                    "s": server_signature(machine_code, expiry),
                }
                code = base64.b64encode(
                    json.dumps(data, separators=(",", ":")).encode()
                ).decode()
                self.send_json(200, {"ok": True, "code": code, "expiry": expiry})
            except (ValueError, json.JSONDecodeError):
                self.send_json(400, {"ok": False, "message": "请求内容无效"})
            return

        self.send_error(404)

    def log_message(self, format_string, *args):
        sys.stderr.write(
            "%s - - [%s] %s\n"
            % (self.address_string(), self.log_date_time_string(), format_string % args)
        )


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 4011
    os.chdir(ROOT)
    server = ThreadingHTTPServer(("0.0.0.0", port), Handler)
    print(f"PPT授权服务已启动：http://0.0.0.0:{port}", flush=True)
    server.serve_forever()
