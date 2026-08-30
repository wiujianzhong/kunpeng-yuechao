#!/usr/bin/env python3
"""纺织设备老师傅经验萃取系统本地服务器。"""

from __future__ import annotations

import argparse
import json
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse


PROJECT_DIR = Path(__file__).resolve().parent


class AppHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PROJECT_DIR), **kwargs)

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "same-origin")
        super().end_headers()

    def do_GET(self) -> None:  # noqa: N802
        if urlparse(self.path).path.rstrip("/") == "/health":
            payload = json.dumps(
                {"ok": True, "app": "textile-experience", "mode": "mock"},
                ensure_ascii=False,
            ).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
            return
        super().do_GET()

    def log_message(self, format: str, *args: object) -> None:
        print(f"访问：{self.address_string()} - {format % args}")


def main() -> None:
    parser = argparse.ArgumentParser(description="启动纺织设备经验萃取系统MVP")
    parser.add_argument("--host", default="127.0.0.1", help="监听地址；手机测试用0.0.0.0")
    parser.add_argument("--port", default=4173, type=int, help="监听端口")
    args = parser.parse_args()

    server = ThreadingHTTPServer((args.host, args.port), AppHandler)
    print(f"纺织设备经验萃取系统已启动：http://{args.host}:{args.port}")
    print("终端光标持续闪动表示服务正在运行；按 Control+C 停止。")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n服务已停止。")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
