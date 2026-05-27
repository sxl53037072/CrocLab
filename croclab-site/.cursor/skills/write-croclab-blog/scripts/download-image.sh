#!/usr/bin/env bash
# download-image.sh — Download an Unsplash (or arbitrary) image and compress to webp.
#
# Usage:
#   download-image.sh <url-or-local-path> <output-stem> [--width 1600] [--quality 82] [--site PATH]
#
# Examples:
#   download-image.sh "https://unsplash.com/photos/cozy-bedroom-abc12345xyz" cozy-bedroom-warm-light
#   download-image.sh "https://images.unsplash.com/photo-1517336714731-489689fd1ca8" focus-desk-hero --width 1600 --quality 82
#   download-image.sh ./local/photo.jpg morning-coffee-journal --site /Users/me/IdeaProjects/web/CrocLab/croclab-site
#
# Output: <site>/public/images/blog/<output-stem>.webp

set -euo pipefail

if [[ $# -lt 2 ]]; then
  cat <<'USAGE' >&2
Usage: download-image.sh <url-or-local-path> <output-stem> [--width N] [--quality N] [--site PATH]

  <url-or-local-path>   Unsplash photo page URL, direct images.unsplash.com URL,
                        any HTTP(S) image URL, or a local file path.
  <output-stem>         Filename without extension; saved as <stem>.webp.
  --width N             Resize to this width (default: 1600). Pass 0 to keep original.
  --quality N           cwebp quality 0-100 (default: 82).
  --site PATH           CrocLab site root (default: auto-detect; falls back to
                        $(pwd)/CrocLab/croclab-site).
USAGE
  exit 1
fi

SOURCE="$1"
STEM="$2"
shift 2

WIDTH=1600
QUALITY=82
SITE=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --width)   WIDTH="$2"; shift 2 ;;
    --quality) QUALITY="$2"; shift 2 ;;
    --site)    SITE="$2"; shift 2 ;;
    *) echo "Unknown flag: $1" >&2; exit 1 ;;
  esac
done

# --- Resolve site root --------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# scripts/ → write-croclab-blog → skills → .cursor → croclab-site
SKILL_SITE_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"

if [[ -z "$SITE" ]]; then
  for candidate in \
    "$SKILL_SITE_ROOT" \
    "$(pwd)" \
    "$(pwd)/croclab-site" \
    "$(pwd)/CrocLab/croclab-site"; do
    if [[ -f "$candidate/src/content/config.ts" ]]; then
      SITE="$candidate"; break
    fi
  done
fi

if [[ -z "$SITE" || ! -d "$SITE/public/images/blog" ]]; then
  echo "Error: could not locate CrocLab site root (looked for src/content/config.ts)." >&2
  echo "Pass --site /path/to/croclab-site explicitly." >&2
  exit 1
fi

OUT_DIR="$SITE/public/images/blog"
OUT_PATH="$OUT_DIR/${STEM}.webp"

if [[ -e "$OUT_PATH" ]]; then
  echo "Refusing to overwrite existing file: $OUT_PATH" >&2
  echo "Choose a different stem or delete the file first." >&2
  exit 1
fi

# --- Tools sanity check -------------------------------------------------------
command -v cwebp >/dev/null || { echo "cwebp not found. Install with: brew install webp" >&2; exit 1; }
command -v curl  >/dev/null || { echo "curl not found." >&2; exit 1; }

# --- Resolve source URL -------------------------------------------------------
TMP_INPUT="$(mktemp -t croclab-blog-img.XXXXXX)"
trap 'rm -f "$TMP_INPUT"' EXIT

is_url=0
case "$SOURCE" in
  http://*|https://*) is_url=1 ;;
esac

if [[ $is_url -eq 1 ]]; then
  URL="$SOURCE"

  # Case A: Unsplash photo page (https://unsplash.com/photos/<slug>...-<id>).
  # Rewrite to the /download endpoint, which 302-redirects to the direct image
  # on images.unsplash.com with a working signature.
  # NB: photo IDs are 11 chars and may contain `-` or `_`, so we take the
  # trailing 11 chars rather than splitting on `-`.
  if [[ "$URL" =~ ^https?://(www\.)?unsplash\.com/photos/ ]]; then
    last_segment="$(printf '%s' "$URL" | sed -E 's#.*/photos/([^/?#]+).*#\1#')"
    photo_id="${last_segment: -11}"
    if [[ -n "$photo_id" && ${#last_segment} -ge 11 ]]; then
      if (( WIDTH > 0 )); then
        URL="https://unsplash.com/photos/${photo_id}/download?w=${WIDTH}"
      else
        URL="https://unsplash.com/photos/${photo_id}/download"
      fi
    fi
  fi

  # Case B: direct images.unsplash.com URL — append sizing params if absent.
  if [[ "$URL" == https://images.unsplash.com/* ]]; then
    sep="?"; [[ "$URL" == *\?* ]] && sep="&"
    if (( WIDTH > 0 )); then
      URL="${URL}${sep}w=${WIDTH}&q=85&fm=jpg&fit=max"
    else
      URL="${URL}${sep}q=85&fm=jpg"
    fi
  fi

  echo "→ Downloading: $URL"
  http_status=$(curl -sSL --max-time 60 \
    -A 'Mozilla/5.0 CrocLab-blog-skill' \
    -H 'Referer: https://unsplash.com/' \
    -w '%{http_code}' \
    -o "$TMP_INPUT" "$URL" || true)
  if [[ -z "$http_status" || "$http_status" -ge 400 ]]; then
    echo "Download failed (HTTP $http_status)." >&2
    echo "Likely the photo is Unsplash+ paid content (403) or the ID is invalid (404)." >&2
    echo "Try a free direct URL like https://images.unsplash.com/photo-<id> instead." >&2
    exit 1
  fi
else
  if [[ ! -f "$SOURCE" ]]; then
    echo "Local file not found: $SOURCE" >&2
    exit 1
  fi
  cp "$SOURCE" "$TMP_INPUT"
  echo "→ Using local file: $SOURCE"
fi

INPUT_SIZE=$(wc -c < "$TMP_INPUT" | tr -d ' ')
if (( INPUT_SIZE < 1024 )); then
  echo "Downloaded file is suspiciously small (${INPUT_SIZE} bytes). Aborting." >&2
  exit 1
fi

# --- Compress to webp ---------------------------------------------------------
if (( WIDTH > 0 )); then
  cwebp -quiet -q "$QUALITY" -resize "$WIDTH" 0 -metadata none "$TMP_INPUT" -o "$OUT_PATH"
else
  cwebp -quiet -q "$QUALITY" -metadata none "$TMP_INPUT" -o "$OUT_PATH"
fi

OUT_SIZE_BYTES=$(wc -c < "$OUT_PATH" | tr -d ' ')
OUT_SIZE_KB=$(( OUT_SIZE_BYTES / 1024 ))

echo "✓ Saved: $OUT_PATH (${OUT_SIZE_KB} KB)"
echo "  Reference in markdown as: /images/blog/${STEM}.webp"
