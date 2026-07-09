#!/usr/bin/env python3
import argparse
import json
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class SwordHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def do_GET(self):
        if self.path == "/health":
            body = json.dumps(
                {"ok": True, "service": "xiaowu-dageng-sword"},
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
    parser = argparse.ArgumentParser(description="小伍大庚剑阵静态服务")
    parser.add_argument("--port", type=int, default=4008)
    args = parser.parse_args()
    server = ThreadingHTTPServer(("127.0.0.1", args.port), SwordHandler)
    server.serve_forever()


if __name__ == "__main__":
    main()
