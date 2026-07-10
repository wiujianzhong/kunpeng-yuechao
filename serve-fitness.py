#!/usr/bin/env python3
import argparse
import json
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit


class FitnessHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        self.send_header("X-Frame-Options", "SAMEORIGIN")
        super().end_headers()

    def do_GET(self):
        request_path = urlsplit(self.path).path
        if request_path == "/health":
            body = json.dumps(
                {"ok": True, "service": "xiaowu-fitness-library"},
                ensure_ascii=False,
            ).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(body)
            return

        if (
            request_path == "/data/exercises.json"
            and "gzip" in self.headers.get("Accept-Encoding", "")
        ):
            gzip_path = Path(self.directory) / "data" / "exercises.json.gz"
            if gzip_path.is_file():
                size = gzip_path.stat().st_size
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Content-Encoding", "gzip")
                self.send_header("Content-Length", str(size))
                self.send_header("Cache-Control", "public, max-age=3600")
                self.send_header("Vary", "Accept-Encoding")
                self.end_headers()
                with gzip_path.open("rb") as source:
                    self.copyfile(source, self.wfile)
                return
        super().do_GET()


def main():
    parser = argparse.ArgumentParser(description="小伍健身动作库静态服务")
    parser.add_argument("--port", type=int, default=4009)
    args = parser.parse_args()
    server = ThreadingHTTPServer(("127.0.0.1", args.port), FitnessHandler)
    server.serve_forever()


if __name__ == "__main__":
    main()
