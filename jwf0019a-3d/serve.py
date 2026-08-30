#!/usr/bin/env python3
import argparse
import json
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit


class JWF0019AHandler(SimpleHTTPRequestHandler):
    REMOTE_ASSET_BASE = "https://cdn.jsdelivr.net/gh/wiujianzhong/kunpeng-yuechao@6c303ef/jwf0019a-3d"

    def end_headers(self):
        request_path = urlsplit(self.path).path
        suffix = Path(request_path).suffix.lower()
        if request_path == "/health":
            cache_control = "no-store"
        elif request_path.endswith("/") or suffix in {"", ".html"}:
            cache_control = "no-cache"
        elif getattr(self, "_remote_asset_redirect", False):
            cache_control = "no-store"
        elif request_path.startswith(("/assets/", "/vendor/")):
            cache_control = "public, max-age=31536000, immutable"
        elif suffix in {".js", ".css", ".json"}:
            cache_control = "public, max-age=86400, stale-while-revalidate=604800"
        else:
            cache_control = "public, max-age=3600"
        self.send_header("Cache-Control", cache_control)
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        self.send_header("X-Frame-Options", "SAMEORIGIN")
        super().end_headers()

    def send_head(self):
        request_path = urlsplit(self.path).path
        local_path = Path(self.translate_path(self.path))
        is_remote_asset = request_path.startswith(("/assets/", "/vendor/"))
        if is_remote_asset and not local_path.is_file():
            self._remote_asset_redirect = True
            self.send_response(302)
            self.send_header("Location", f"{self.REMOTE_ASSET_BASE}{self.path}")
            self.end_headers()
            return None
        return super().send_head()

    def do_GET(self):
        if urlsplit(self.path).path == "/health":
            body = json.dumps(
                {"ok": True, "service": "jwf0019a-3d"},
                ensure_ascii=False,
            ).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        super().do_GET()


def main():
    parser = argparse.ArgumentParser(description="JWF0019A设备3D知识平台静态服务")
    parser.add_argument("--port", type=int, default=4010)
    args = parser.parse_args()
    server = ThreadingHTTPServer(("127.0.0.1", args.port), JWF0019AHandler)
    server.serve_forever()


if __name__ == "__main__":
    main()
