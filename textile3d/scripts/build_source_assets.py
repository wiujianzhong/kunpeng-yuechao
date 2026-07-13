#!/usr/bin/env python3
"""从厂家 PDF 批量生成零件原图资产。

输入是 JSON 清单，裁切框单位为 PDF 点（1 点 = 1/72 英寸），坐标顺序为
``[left, bottom, right, top]``，原点在 PDF 页面左下角。

清单示例：

{
  "output_dir": "assets/manuals/jwf1206/crops",
  "crop_dpi": 600,
  "full_page": {
    "enabled": false,
    "dpi": 300,
    "format": "webp"
  },
  "items": [
    {
      "source_pdf": "assets/manuals/jwf1206/original.pdf",
      "page": 5,
      "crop_box": [80, 417, 199, 604],
      "slug": "JWF1204-0100-10"
    }
  ]
}

稳定输出文件名：

- ``<slug>.pdf``：保留原 PDF 矢量内容的单页裁切图。
- ``<slug>.png``：默认 600dpi 的高清裁切图。
- ``<slug>-page-<页码>-<dpi>dpi.<png|webp>``：可选高清全页图。

运行方式（建议使用 Codex 内置 Python）：

  ~/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3.12 \
    scripts/build_source_assets.py 清单.json

默认不覆盖已有资产；确认需要重建时才使用 ``--force``。
"""

from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import struct
import subprocess
import sys
import tempfile
from dataclasses import dataclass
from pathlib import Path
from typing import Any

try:
    from pypdf import PdfReader, PdfWriter
    from pypdf.generic import RectangleObject
except ImportError as exc:  # pragma: no cover - 仅在环境缺依赖时触发
    raise SystemExit(
        "缺少 pypdf。请用 Codex 内置 Python 运行：\n"
        "~/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/"
        "python3.12 scripts/build_source_assets.py 清单.json"
    ) from exc


BUNDLED_PDFTOPPM = Path(
    "~/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/override/pdftoppm"
).expanduser()
SLUG_FORBIDDEN = re.compile(r"[\\/\x00-\x1f\x7f]")
BOX_TOLERANCE = 0.05


class ConfigError(ValueError):
    """清单格式或资产边界不合法。"""


@dataclass(frozen=True)
class FullPageConfig:
    enabled: bool = False
    dpi: int = 300
    formats: tuple[str, ...] = ()


@dataclass(frozen=True)
class Job:
    source_pdf: Path
    page: int
    crop_box: tuple[float, float, float, float]
    slug: str
    output_dir: Path
    crop_dpi: int
    full_page: FullPageConfig

    @property
    def crop_pdf(self) -> Path:
        return self.output_dir / f"{self.slug}.pdf"

    @property
    def crop_png(self) -> Path:
        return self.output_dir / f"{self.slug}.png"

    def full_page_path(self, image_format: str) -> Path:
        return self.output_dir / (
            f"{self.slug}-page-{self.page:03d}-{self.full_page.dpi}dpi.{image_format}"
        )


@dataclass
class SourceState:
    reader: PdfReader
    page_count: int
    size: int
    mtime_ns: int


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="从厂家 PDF 生成矢量裁切 PDF 和高清原图。"
    )
    parser.add_argument(
        "manifest",
        help="JSON 清单路径；传 - 可从标准输入读取。",
    )
    parser.add_argument(
        "--base-dir",
        type=Path,
        default=Path.cwd(),
        help="清单中相对路径的基准目录，默认为当前目录。",
    )
    parser.add_argument(
        "--pdftoppm",
        type=Path,
        help="指定 pdftoppm；默认优先使用 Codex 内置版。",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="覆盖已有输出（默认遇到同名文件就停止）。",
    )
    return parser.parse_args()


def load_json(path_text: str) -> dict[str, Any]:
    try:
        if path_text == "-":
            payload = json.load(sys.stdin)
        else:
            with Path(path_text).expanduser().open("r", encoding="utf-8") as handle:
                payload = json.load(handle)
    except (OSError, json.JSONDecodeError) as exc:
        raise ConfigError(f"无法读取 JSON 清单：{exc}") from exc
    if not isinstance(payload, dict):
        raise ConfigError("JSON 顶层必须是对象。")
    return payload


def positive_int(value: Any, field: str) -> int:
    if isinstance(value, bool) or not isinstance(value, int) or value <= 0:
        raise ConfigError(f"{field} 必须是正整数。")
    return value


def parse_formats(value: Any) -> tuple[str, ...]:
    if isinstance(value, str):
        raw_formats = [value]
    elif isinstance(value, list) and all(isinstance(item, str) for item in value):
        raw_formats = value
    else:
        raise ConfigError("full_page.format 必须是 png、webp 或它们的数组。")

    normalized: list[str] = []
    for image_format in raw_formats:
        image_format = image_format.lower().strip()
        if image_format == "both":
            candidates = ("png", "webp")
        elif image_format in {"png", "webp"}:
            candidates = (image_format,)
        else:
            raise ConfigError("full_page.format 只支持 png、webp 或 both。")
        for candidate in candidates:
            if candidate not in normalized:
                normalized.append(candidate)
    return tuple(normalized)


def full_page_config(value: Any, fallback: FullPageConfig | None = None) -> FullPageConfig:
    base = fallback or FullPageConfig()
    if value is None:
        return base
    if value is False:
        return FullPageConfig()
    if value is True:
        return FullPageConfig(True, base.dpi or 300, base.formats or ("webp",))
    if not isinstance(value, dict):
        raise ConfigError("full_page 必须是布尔值或对象。")

    enabled = value.get("enabled", True)
    if not isinstance(enabled, bool):
        raise ConfigError("full_page.enabled 必须是布尔值。")
    if not enabled:
        return FullPageConfig()

    dpi = positive_int(value.get("dpi", base.dpi or 300), "full_page.dpi")
    formats = parse_formats(
        value.get("formats", value.get("format", base.formats or ("webp",)))
    )
    return FullPageConfig(True, dpi, formats)


def clean_slug(value: Any, index: int) -> str:
    if not isinstance(value, str):
        raise ConfigError(f"items[{index}].slug 必须是字符串。")
    slug = value.strip()
    if not slug or slug in {".", ".."} or SLUG_FORBIDDEN.search(slug):
        raise ConfigError(f"items[{index}].slug 含有不安全的文件名字符。")
    return slug


def path_from(value: Any, base_dir: Path, field: str) -> Path:
    if not isinstance(value, str) or not value.strip():
        raise ConfigError(f"{field} 必须是非空路径字符串。")
    path = Path(value).expanduser()
    return (base_dir / path).resolve() if not path.is_absolute() else path.resolve()


def parse_box(value: Any, index: int) -> tuple[float, float, float, float]:
    if not isinstance(value, list) or len(value) != 4:
        raise ConfigError(f"items[{index}].crop_box 必须是 4 个数字的数组。")
    try:
        box = tuple(float(number) for number in value)
    except (TypeError, ValueError) as exc:
        raise ConfigError(f"items[{index}].crop_box 必须全是数字。") from exc
    if not all(number == number and abs(number) != float("inf") for number in box):
        raise ConfigError(f"items[{index}].crop_box 不能含 NaN 或无穷大。")
    left, bottom, right, top = box
    if right <= left or top <= bottom:
        raise ConfigError(f"items[{index}].crop_box 的 right/top 必须大于 left/bottom。")
    return box  # type: ignore[return-value]


def build_jobs(payload: dict[str, Any], base_dir: Path) -> list[Job]:
    raw_items = payload.get("items")
    if not isinstance(raw_items, list) or not raw_items:
        raise ConfigError("items 必须是非空数组。")

    default_output = payload.get("output_dir")
    default_dpi = positive_int(payload.get("crop_dpi", 600), "crop_dpi")
    default_full = full_page_config(payload.get("full_page", False))
    jobs: list[Job] = []

    for index, raw_item in enumerate(raw_items):
        if not isinstance(raw_item, dict):
            raise ConfigError(f"items[{index}] 必须是对象。")
        output_value = raw_item.get("output_dir", default_output)
        if output_value is None:
            raise ConfigError(f"items[{index}] 缺少 output_dir，顶层也未提供。")
        jobs.append(
            Job(
                source_pdf=path_from(
                    raw_item.get("source_pdf"), base_dir, f"items[{index}].source_pdf"
                ),
                page=positive_int(raw_item.get("page"), f"items[{index}].page"),
                crop_box=parse_box(raw_item.get("crop_box"), index),
                slug=clean_slug(raw_item.get("slug"), index),
                output_dir=path_from(output_value, base_dir, f"items[{index}].output_dir"),
                crop_dpi=positive_int(
                    raw_item.get("crop_dpi", default_dpi), f"items[{index}].crop_dpi"
                ),
                full_page=full_page_config(raw_item.get("full_page"), default_full),
            )
        )
    return jobs


def find_pdftoppm(explicit: Path | None) -> Path:
    candidates: list[Path] = []
    if explicit:
        candidates.append(explicit.expanduser())
    else:
        candidates.append(BUNDLED_PDFTOPPM)
        system_path = shutil.which("pdftoppm")
        if system_path:
            candidates.append(Path(system_path))
    for candidate in candidates:
        if candidate.is_file() and os.access(candidate, os.X_OK):
            return candidate.resolve()
    raise ConfigError(
        "找不到 pdftoppm。请确认 Codex 内置依赖存在，或传入 --pdftoppm。"
    )


def source_state(path: Path) -> SourceState:
    if not path.is_file():
        raise ConfigError(f"源 PDF 不存在：{path}")
    try:
        reader = PdfReader(str(path), strict=False)
    except Exception as exc:  # pypdf 对不同损坏 PDF 抛出不同异常
        raise ConfigError(f"无法读取源 PDF：{path}\n{exc}") from exc
    if reader.is_encrypted:
        try:
            reader.decrypt("")
        except Exception as exc:
            raise ConfigError(f"源 PDF 已加密，且无法空密码读取：{path}") from exc
    stat = path.stat()
    return SourceState(reader, len(reader.pages), stat.st_size, stat.st_mtime_ns)


def box_values(rectangle: RectangleObject) -> tuple[float, float, float, float]:
    return tuple(float(value) for value in rectangle)  # type: ignore[return-value]


def validate_crop_inside_page(job: Job, state: SourceState) -> None:
    if job.page > state.page_count:
        raise ConfigError(
            f"{job.slug}: 页码 {job.page} 超出源 PDF 的 {state.page_count} 页。"
        )
    page_box = box_values(state.reader.pages[job.page - 1].mediabox)
    page_left, page_bottom, page_right, page_top = page_box
    left, bottom, right, top = job.crop_box
    if (
        left < page_left - BOX_TOLERANCE
        or bottom < page_bottom - BOX_TOLERANCE
        or right > page_right + BOX_TOLERANCE
        or top > page_top + BOX_TOLERANCE
    ):
        raise ConfigError(
            f"{job.slug}: crop_box {job.crop_box} 超出页面范围 {page_box}。"
        )


def planned_paths(job: Job) -> tuple[Path, ...]:
    paths: list[Path] = [job.crop_pdf, job.crop_png]
    if job.full_page.enabled:
        paths.extend(job.full_page_path(fmt) for fmt in job.full_page.formats)
    return tuple(paths)


def preflight(jobs: list[Job], force: bool) -> dict[Path, SourceState]:
    states: dict[Path, SourceState] = {}
    owners: dict[Path, str] = {}
    for job in jobs:
        state = states.get(job.source_pdf)
        if state is None:
            state = source_state(job.source_pdf)
            states[job.source_pdf] = state
        validate_crop_inside_page(job, state)
        for output in planned_paths(job):
            if output in owners:
                raise ConfigError(
                    f"输出文件重复：{output}\n"
                    f"同时被 {owners[output]} 和 {job.slug} 占用。"
                )
            owners[output] = job.slug
            if output.exists() and not force:
                raise ConfigError(
                    f"输出已存在，未覆盖：{output}\n"
                    "确认要重建时请显式加 --force。"
                )
    return states


def write_cropped_pdf(job: Job, state: SourceState, destination: Path) -> None:
    writer = PdfWriter()
    output_page = writer.add_page(state.reader.pages[job.page - 1])
    crop = RectangleObject(job.crop_box)
    # 同时缩小五种页面框，内容流不重画，因此保留原矢量线条与字形。
    output_page.mediabox = crop
    output_page.cropbox = crop
    output_page.trimbox = crop
    output_page.bleedbox = crop
    output_page.artbox = crop
    with destination.open("wb") as handle:
        writer.write(handle)


def validate_cropped_pdf(job: Job, destination: Path) -> None:
    reader = PdfReader(str(destination), strict=False)
    if len(reader.pages) != 1:
        raise RuntimeError(f"{job.slug}: 裁切 PDF 应为 1 页，实际为 {len(reader.pages)} 页。")
    page = reader.pages[0]
    actual = box_values(page.mediabox)
    if any(abs(left - right) > BOX_TOLERANCE for left, right in zip(actual, job.crop_box)):
        raise RuntimeError(
            f"{job.slug}: 裁切 PDF 页面框不符，期望 {job.crop_box}，实际 {actual}。"
        )
    source_page = PdfReader(str(job.source_pdf), strict=False).pages[job.page - 1]
    if source_page.get("/Contents") is not None and page.get("/Contents") is None:
        raise RuntimeError(f"{job.slug}: 裁切 PDF 意外丢失页面内容流。")
    if source_page.get("/Resources") is not None and page.get("/Resources") is None:
        raise RuntimeError(f"{job.slug}: 裁切 PDF 意外丢失页面资源。")


def render_png(
    pdftoppm: Path,
    source_pdf: Path,
    destination: Path,
    dpi: int,
    page: int | None = None,
) -> None:
    prefix = destination.with_suffix("")
    command = [str(pdftoppm), "-png", "-singlefile", "-r", str(dpi)]
    if page is not None:
        command.extend(["-f", str(page), "-l", str(page)])
    command.extend([str(source_pdf), str(prefix)])
    result = subprocess.run(command, text=True, capture_output=True, check=False)
    if result.returncode != 0 or not destination.is_file():
        details = result.stderr.strip() or result.stdout.strip() or "未输出错误详情"
        raise RuntimeError(f"pdftoppm 渲染失败：{details}")


def png_size(path: Path) -> tuple[int, int]:
    with path.open("rb") as handle:
        header = handle.read(24)
    if len(header) < 24 or header[:8] != b"\x89PNG\r\n\x1a\n":
        raise RuntimeError(f"不是有效 PNG：{path}")
    return struct.unpack(">II", header[16:24])


def validate_png_size(path: Path, width_points: float, height_points: float, dpi: int) -> None:
    width, height = png_size(path)
    expected_width = round(width_points * dpi / 72)
    expected_height = round(height_points * dpi / 72)
    if abs(width - expected_width) > 2 or abs(height - expected_height) > 2:
        raise RuntimeError(
            f"PNG 尺寸不符：{path.name} 实际 {width}x{height}，"
            f"期望约 {expected_width}x{expected_height}。"
        )


def png_to_lossless_webp(source: Path, destination: Path) -> None:
    try:
        from PIL import Image
    except ImportError as exc:  # pragma: no cover - 仅在启用 WebP 且缺依赖时触发
        raise RuntimeError(
            "输出 WebP 需要 Pillow。请使用 Codex 内置 Python 运行本脚本。"
        ) from exc
    with Image.open(source) as image:
        image.save(destination, "WEBP", lossless=True, method=6, exact=True)
    with Image.open(destination) as verification:
        verification.verify()


def stage_name(index: int, suffix: str) -> str:
    return f"{index:06d}-{suffix}"


def build_all(
    jobs: list[Job],
    states: dict[Path, SourceState],
    pdftoppm: Path,
    force: bool,
) -> None:
    staged: list[tuple[Path, Path]] = []
    with tempfile.TemporaryDirectory(prefix="textile3d-source-assets-") as temp_text:
        temp_dir = Path(temp_text)
        for index, job in enumerate(jobs, start=1):
            crop_pdf = temp_dir / stage_name(index, "crop.pdf")
            crop_png = temp_dir / stage_name(index, "crop.png")

            write_cropped_pdf(job, states[job.source_pdf], crop_pdf)
            validate_cropped_pdf(job, crop_pdf)
            render_png(pdftoppm, crop_pdf, crop_png, job.crop_dpi)
            left, bottom, right, top = job.crop_box
            validate_png_size(crop_png, right - left, top - bottom, job.crop_dpi)
            staged.extend(((crop_pdf, job.crop_pdf), (crop_png, job.crop_png)))

            if job.full_page.enabled:
                full_png = temp_dir / stage_name(index, "full.png")
                render_png(
                    pdftoppm,
                    job.source_pdf,
                    full_png,
                    job.full_page.dpi,
                    page=job.page,
                )
                page_box = box_values(states[job.source_pdf].reader.pages[job.page - 1].mediabox)
                validate_png_size(
                    full_png,
                    page_box[2] - page_box[0],
                    page_box[3] - page_box[1],
                    job.full_page.dpi,
                )
                if "png" in job.full_page.formats:
                    staged.append((full_png, job.full_page_path("png")))
                if "webp" in job.full_page.formats:
                    full_webp = temp_dir / stage_name(index, "full.webp")
                    png_to_lossless_webp(full_png, full_webp)
                    staged.append((full_webp, job.full_page_path("webp")))

            print(f"[已生成] {job.slug} · 原 PDF 第 {job.page} 页")

        # 全部生成并验证通过后再统一落盘，避免留下半套资产。
        for staged_path, final_path in staged:
            final_path.parent.mkdir(parents=True, exist_ok=True)
            if final_path.exists() and not force:
                raise RuntimeError(f"落盘前发现同名文件，已停止：{final_path}")
            os.replace(staged_path, final_path)

    # 源 PDF 本身不应被修改，重新校验页数与文件指纹。
    for path, before in states.items():
        after_stat = path.stat()
        after_count = len(PdfReader(str(path), strict=False).pages)
        if (
            after_count != before.page_count
            or after_stat.st_size != before.size
            or after_stat.st_mtime_ns != before.mtime_ns
        ):
            raise RuntimeError(f"源 PDF 页数或文件指纹发生变化，请立即检查：{path}")


def main() -> int:
    args = parse_args()
    try:
        payload = load_json(args.manifest)
        base_dir = args.base_dir.expanduser().resolve()
        jobs = build_jobs(payload, base_dir)
        pdftoppm = find_pdftoppm(args.pdftoppm)
        states = preflight(jobs, args.force)
        print(f"使用 pdftoppm：{pdftoppm}")
        print(f"待处理：{len(jobs)} 个零件原图")
        build_all(jobs, states, pdftoppm, args.force)
        print(f"验证通过：{len(states)} 本源 PDF 页数与文件指纹未变。")
        return 0
    except (ConfigError, RuntimeError, OSError) as exc:
        print(f"错误：{exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
