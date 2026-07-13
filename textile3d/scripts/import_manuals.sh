#!/bin/zsh
set -euo pipefail

source_dir='/Users/xiaowu/Library/Containers/com.tencent.xinWeChat/Data/Documents/xwechat_files/wlq462127350_f33e/business/favorite/temp'
project_dir="${0:A:h:h}"
output_dir="$project_dir/assets/manuals"
pdftoppm_bin="${PDFTOPPM_BIN:-$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/override/pdftoppm}"
if [[ ! -x "$pdftoppm_bin" ]]; then
  pdftoppm_bin="$(command -v pdftoppm)"
fi

manuals=(
  'jwf1124c|JWF1124C-160外供立体图.pdf'
  'tf2513|TF2513外供图.pdf'
  'jwf1102|JWF1102-外供图立体图.pdf'
  'zfa051a|ZFA051A-120机件略图.pdf'
  'fa103b|FA103B-外供立体图.pdf'
  'jwf1026|JWF1026-160_10机械略图.pdf'
  'jwf1012|JWF1012机件略图.pdf'
  'jwf1206|JWF1206.pdf'
)

mkdir -p "$output_dir"

for spec in "${manuals[@]}"; do
  key="${spec%%|*}"
  filename="${spec#*|}"
  src="$source_dir/$filename"
  dest="$output_dir/$key"
  mkdir -p "$dest/pages" "$dest/pages-hd"
  rm -f "$dest/original.pdf"
  cp "$src" "$dest/original.pdf"
  chmod u+w "$dest/original.pdf"
  rm -f "$dest/pages"/page-*.jpg(N)
  "$pdftoppm_bin" -jpeg -scale-to 1400 -jpegopt quality=84,progressive=y,optimize=y \
    "$src" "$dest/pages/page" >/dev/null 2>&1
  rm -f "$dest/pages-hd"/page-*.jpg(N)
  "$pdftoppm_bin" -jpeg -r 300 -jpegopt quality=92,progressive=y,optimize=y \
    "$src" "$dest/pages-hd/page" >/dev/null 2>&1
  cp "$dest/pages/page-01.jpg" "$dest/cover.jpg"
  count=$(find "$dest/pages" -name 'page-*.jpg' | wc -l | tr -d ' ')
  printf '已导入：%s（%s 页，含300dpi高清页）\n' "$filename" "$count"
done

printf '全部手册导入完成。\n'
