#!/usr/bin/env python3
import argparse
import json
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit
from urllib.request import Request, urlopen


GESTURE_ASSET_PREFIX = "/vendor/mediapipe/hands/"
GESTURE_ASSET_SOURCES = (
    "https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/",
    "https://wiujianzhong.github.io/kunpeng-yuechao/vendor/mediapipe/hands/",
)
GESTURE_ASSET_FILES = {
    "hand_landmark_lite.tflite",
    "hands.binarypb",
    "hands.js",
    "hands_solution_packed_assets.data",
    "hands_solution_packed_assets_loader.js",
    "hands_solution_simd_wasm_bin.data",
    "hands_solution_simd_wasm_bin.js",
    "hands_solution_simd_wasm_bin.wasm",
    "hands_solution_wasm_bin.js",
    "hands_solution_wasm_bin.wasm",
}


def ensure_gesture_asset(request_path):
    clean_path = urlsplit(request_path).path
    if not clean_path.startswith(GESTURE_ASSET_PREFIX):
        return
    filename = clean_path.removeprefix(GESTURE_ASSET_PREFIX)
    if filename not in GESTURE_ASSET_FILES:
        raise FileNotFoundError(filename)
    target = Path(__file__).resolve().parent / "vendor" / "mediapipe" / "hands" / filename
    if target.is_file() and target.stat().st_size > 0:
        return
    target.parent.mkdir(parents=True, exist_ok=True)
    temp_target = target.with_name(f"{target.name}.download")
    last_error = None
    for source in GESTURE_ASSET_SOURCES:
        request = Request(
            f"{source}{filename}?v=hands-local-v1",
            headers={"User-Agent": "XiaowuGestureCache/1.0"},
        )
        try:
            with urlopen(request, timeout=180) as response:
                temp_target.write_bytes(response.read())
            break
        except OSError as error:
            last_error = error
    else:
        raise OSError(f"手势资源下载失败：{filename}") from last_error
    if temp_target.stat().st_size <= 0:
        raise OSError(f"手势资源下载失败：{filename}")
    temp_target.replace(target)


class XmasHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        if self.path.startswith("/vendor/mediapipe/hands/"):
            self.send_header("Cache-Control", "public, max-age=31536000, immutable")
        else:
            self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
            self.send_header("Pragma", "no-cache")
            self.send_header("Expires", "0")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        self.send_header("X-Frame-Options", "SAMEORIGIN")
        super().end_headers()

    def do_GET(self):
        try:
            ensure_gesture_asset(self.path)
        except (FileNotFoundError, OSError):
            self.send_error(503, "Gesture asset unavailable")
            return
        if self.path == "/health":
            body = json.dumps(
                {"ok": True, "service": "xiaowu-xmas"},
                ensure_ascii=False,
            ).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(body)
            return
        super().do_GET()


def main():
    parser = argparse.ArgumentParser(description="小伍手势圣诞树静态服务")
    parser.add_argument("--port", type=int, default=4007)
    args = parser.parse_args()
    server = ThreadingHTTPServer(("127.0.0.1", args.port), XmasHandler)
    server.serve_forever()


if __name__ == "__main__":
    main()
