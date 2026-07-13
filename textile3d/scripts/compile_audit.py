#!/usr/bin/env python3
"""把逐格审计 JSON 编译成网页数据模块和高清原格生成清单。"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="编译零件审计数据。")
    parser.add_argument("audit", type=Path, help="逐格审计 JSON")
    parser.add_argument("module", type=Path, help="输出 JavaScript 模块")
    parser.add_argument("manifest", type=Path, help="输出高清原格生成清单")
    parser.add_argument(
        "--export-name",
        help="JavaScript导出变量名；默认保持JWF1206-0100旧模块命名",
    )
    return parser.parse_args()


def slug_for(part: dict, manual: str) -> str:
    code = part.get("code")
    if code:
        source = str(code)
    else:
        cell = part["cell"]
        source = part.get("recordKey") or (
            f"{manual}-p{part['pdfPage']}-r{cell['row']}-c{cell['column']}-blank-code"
        )
    slug = re.sub(r"[^A-Za-z0-9._-]+", "_", source.strip())
    if not slug:
        raise ValueError(f"记录无法生成安全文件名：{part!r}")
    return slug


def dimension_value(value: str) -> str | float | int:
    text = str(value).strip()
    if re.fullmatch(r"\d+", text):
        return int(text)
    if re.fullmatch(r"\d+\.\d+", text):
        return float(text)
    return text


def main() -> int:
    args = parse_args()
    audit = json.loads(args.audit.read_text(encoding="utf-8"))
    parts = audit.get("parts", [])
    scope = audit.get("scope", {})
    expected = scope.get("partCount", scope.get("recordCount"))
    if not parts or len(parts) != expected:
        raise SystemExit(f"审计条数异常：实际{len(parts)}，期望{expected}")

    manual = audit["manualId"]
    source_pdf = audit["sourcePdf"]
    slugs = [slug_for(part, manual) for part in parts]
    if len(set(slugs)) != len(slugs):
        raise SystemExit("审计数据生成了重复裁格文件名。")
    compiled = []
    manifest_items = []
    for part, slug in zip(parts, slugs):
        code = part.get("code")
        model_verified = code == "JWF1204-0100-10"
        dimensions = [dimension_value(value) for value in part.get("dimensions", [])]
        record = {
            "manual": manual,
            "assembly": part["assembly"],
            "code": code,
            "name": part["nameZh"],
            "nameEn": part["nameEn"],
            "page": part["pdfPage"],
            "sheetPage": part["sheetPage"],
            "quantity": part["quantity"]["value"],
            "quantityUnit": part["quantity"]["unit"],
            "dims": dimensions,
            "dataStatus": "厂家资料已核",
            "modelStatus": "轮廓级3D已核" if model_verified else "待核",
            "status": "资料已核·轮廓3D已核" if model_verified else "资料已核·3D待核",
            "dimensionNote": (
                "厂家原格明确标注：" + "、".join(map(str, dimensions))
                if dimensions
                else "厂家原格未标明确尺寸"
            ),
            "sourceCrop": f"assets/manuals/{manual}/crops/{slug}.png",
            "sourceVector": f"assets/manuals/{manual}/crops/{slug}.pdf",
            "auditIssues": part.get("existingIssues", []),
        }
        if part.get("recordKey"):
            record["recordKey"] = part["recordKey"]
        if part.get("sourceCodeCell"):
            record["sourceCodeCell"] = part["sourceCodeCell"]
        compiled.append(record)
        manifest_items.append(
            {
                "source_pdf": source_pdf,
                "page": part["pdfPage"],
                "crop_box": part["cell"]["cropBoxPt"],
                "slug": slug,
            }
        )

    export_name = args.export_name or re.sub(r"\W+", "_", f"{manual}_0100_verified")
    if not re.fullmatch(r"[A-Za-z_$][A-Za-z0-9_$]*", export_name):
        raise SystemExit(f"JavaScript导出变量名不合法：{export_name}")
    module_text = (
        "// 由 scripts/compile_audit.py 根据逐格人工审计生成；不要手工猜改。\n"
        f"export const {export_name} = "
        + json.dumps(compiled, ensure_ascii=False, indent=2, separators=(",", ": "))
        + ";\n"
    )
    manifest = {
        "output_dir": f"assets/manuals/{manual}/crops",
        "crop_dpi": 600,
        "full_page": False,
        "items": manifest_items,
    }

    args.module.parent.mkdir(parents=True, exist_ok=True)
    args.manifest.parent.mkdir(parents=True, exist_ok=True)
    args.module.write_text(module_text, encoding="utf-8")
    args.manifest.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"已编译：{len(compiled)} 条网页资料")
    print(f"已生成：{len(manifest_items)} 个高清原格任务")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
