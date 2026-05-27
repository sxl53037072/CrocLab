---
name: write-croclab-blog
description: Write a CrocLab blog post (English + Chinese) under `CrocLab/croclab-site/src/content/blog{,-zh}/`, including downloading hero/body images from Unsplash, compressing them to webp, weaving internal links to existing posts, and adding App Store / Chrome Web Store CTAs. Use when the user asks to write/add a CrocLab blog post, draft a new article for FocusCroc / DreamTone / IDSnap / AiDock / DevCodec, produce an SEO-friendly bilingual post, or promote a CrocLab app via blog content.
---

# Write a CrocLab Blog Post

Author a bilingual (EN + ZH) blog post for the CrocLab website that:

1. Lives under `src/content/blog/{slug}.md` and `src/content/blog-zh/{slug}.md` (same slug, same `date`, same `heroImage`).
2. Has a hero image and 1–3 body images downloaded from **Unsplash**, compressed to **webp**, and saved under `public/images/blog/`.
3. Includes 2–3 **internal links** to existing CrocLab blog posts in the same tag/topic cluster.
4. Ends with a clear **app CTA** (App Store URL or Chrome Web Store URL) for the related product.

The site is Astro with content collections defined in `src/content/config.ts`. Frontmatter must match that schema exactly.

## Workflow checklist

Track your progress against this list:

```
- [ ] Step 1: Confirm topic, slug, related product, target tag, language(s)
- [ ] Step 2: Pick 2–3 internal-link targets from existing posts
- [ ] Step 3: Pick image queries; download + compress with scripts/download-image.sh
- [ ] Step 4: Write English markdown at src/content/blog/{slug}.md
- [ ] Step 5: Write Chinese markdown at src/content/blog-zh/{slug}.md (mirror structure)
- [ ] Step 6: Verify with `npm run build` (or skip if user only wants drafts)
```

Do not skip steps unless the user explicitly says so.

## Step 1 — Gather inputs

Before writing, confirm with the user (use AskQuestion when several values are missing):

- **Topic / working title** (e.g. "How brown noise helps ADHD focus").
- **Slug** (kebab-case, lowercase, ASCII; the SAME slug is used in both `blog/` and `blog-zh/`).
- **Related product** — one of: `focuscroc`, `dreamtone`, `idsnap`, `aidock`, `devcodec`. This drives the CTA URL and the topic cluster for internal links.
- **Tag** — pick from existing tags used in `src/content/blog/`: `Productivity`, `Sleep`, `Photography`, `Focus`, `ADHD`, `Travel`, `Developer Tools`, etc. Match an existing tag exactly when possible (Astro doesn't normalize them).
- **`readTime`** in minutes (estimate honestly; 5–10 is typical).
- **`date`** — today's date in `YYYY-MM-DD` (no quotes in frontmatter).

If the user gave the topic in English only, still produce both EN and ZH versions unless they say otherwise. The two files share the same slug, date, and `heroImage`.

## Step 2 — Pick internal-link targets

Open `src/content/blog/` and list candidates in the same topic cluster as the new post. Pick 2–3 to link to from inside the article body (not just at the bottom).

Topic clusters (from `SEO优化计划-2026W19.md`, keep these consistent):

| Cluster | Posts you can link between |
|---|---|
| Sleep | `how-to-fall-asleep-fast`, `best-sleep-sounds-app-2026`, `rain-sounds-for-sleeping`, `white-noise-sleep-quality`, `white-noise-brown-noise-pink-noise-guide`, `binaural-beats-sleep-science-guide`, `sleep-music-frequencies-deep-sleep`, `why-body-jerks-when-falling-asleep`, `how-to-mix-sleep-soundscapes`, `free-sleep-sound-apps-no-subscription`, `dreamtone-launches-free-sleep-sounds-app` |
| Focus / Study (FocusCroc) | `best-pomodoro-techniques-2026`, `how-to-build-consistent-study-habit`, `best-study-timer-apps-2026`, `science-of-study-streaks`, `52-17-rule-vs-pomodoro-best-focus-timer`, `adhd-study-tips-focus-timer`, `best-brown-noise-apps-adhd-focus`, `morning-routine-productivity-guide`, `remote-study-focus-toolkit` |
| Photography (IDSnap) | `idsnap-free-passport-photo-maker`, `idsnap-launch-preview-free-passport-photos`, `idsnap-v1-1-beauty-outfits-50-countries`, `how-to-take-passport-photo-at-home`, `why-diy-passport-photos-save-time-money`, `visa-photo-requirements-by-country` |
| Developer Tools | `chrome-extensions-for-developers` |

URL formats (always use trailing slash — `astro.config.mjs` enforces it):

- EN blog → `/blog/{slug}/`
- ZH blog → `/zh/blog/{slug}/`
- EN product page → `/{product}/`  (e.g. `/dreamtone/`)
- ZH product page → `/zh/{product}/`

## Step 3 — Images: download + compress

All blog images live in `public/images/blog/` and are referenced as `/images/blog/{filename}.webp`. Every blog post needs:

- **1 hero image** declared in frontmatter as `heroImage: "/images/blog/{slug}-hero.webp"` (or any descriptive name; keep filenames lowercase, kebab-case, ASCII, ≤ ~40 chars).
- **1–3 body images** placed inline with `![descriptive alt text](/images/blog/{name}.webp)`.

EN and ZH versions reuse the **same image files** (only the `alt` text differs).

### How to source from Unsplash

1. Search `https://unsplash.com/s/photos/{keywords}` (use specific, scene-based queries: `cozy bedroom warm light`, `passport photo booth`, `pomodoro tomato kitchen timer`).
2. Open the photo page; the URL looks like `https://unsplash.com/photos/<slug>-<id>` where `<id>` is the trailing 11-char alphanumeric. Copy the **photo page URL** (or the `https://images.unsplash.com/photo-<id>?…` direct URL — both work).
3. Run the download/compress script (see below). Default output is 1600 px wide, quality 82, which matches the size profile of existing assets (~80–150 KB for hero, smaller for body).

If the user provides their own image URL or local file, skip Unsplash and pass that URL/path directly to the script.

### Script: `scripts/download-image.sh`

Compresses any URL or local image to a webp file under the project's `public/images/blog/`.

```bash
.cursor/skills/write-croclab-blog/scripts/download-image.sh \
  <unsplash_url_or_local_path> \
  <output_filename_without_extension> \
  [--width 1600] [--quality 82] [--site /path/to/croclab-site]
```

Run from the `croclab-site` root. Default `--site` auto-detects this project (including when the skill lives under `.cursor/skills/`). The script:

- Downloads the URL with `curl` (auto-appends `?w={width}&q=80&fm=jpg&fit=max` for `images.unsplash.com` URLs; resolves `unsplash.com/photos/...` pages by extracting the photo ID).
- Resizes + re-encodes to webp via `cwebp -q {quality} -resize {width} 0`.
- Writes `public/images/blog/{filename}.webp` and prints the final size.

Run it once per image. **Always verify each image visually after download** — Unsplash's auto-pick can return unrelated photos if the query is loose. Re-run with a different photo URL if the result doesn't fit.

### Image attribution

Unsplash photos are free for commercial use under the [Unsplash License](https://unsplash.com/license). Attribution is not required, and existing CrocLab posts do not include it. Match the existing convention — no inline credit lines.

## Step 4 — Write the English post

Save to `src/content/blog/{slug}.md`. The frontmatter schema (from `src/content/config.ts`) is:

```yaml
---
title: "Headline-cased, includes a year or specific number when natural"
description: "1–2 sentence meta description, ≤160 chars, written for SERP click-through"
date: 2026-MM-DD
tag: "Productivity"            # match an existing tag exactly
readTime: 8
heroImage: "/images/blog/{slug}-hero.webp"
relatedProduct: "focuscroc"     # one of: focuscroc | dreamtone | idsnap | aidock | devcodec
---
```

Optional fields: `updatedDate` (only when revising a published post), `author` (defaults to `CrocLab`), `ogImage`.

Body structure (mirror the conventions in `best-pomodoro-techniques-2026.md`, `best-sleep-sounds-app-2026.md`, `idsnap-v1-1-beauty-outfits-50-countries.md`):

1. **Hook paragraph** (2–4 sentences). State the problem and promise concretely. No "in today's fast-paced world" filler.
2. **One body image** within the first 2–3 sections (`![alt](/images/blog/...)`), with a meaningful alt text.
3. **3–6 H2 sections.** Use numbered lists for "best X" / "top techniques" posts; use prose + tables for comparison posts. Add a markdown comparison table when comparing apps/products/specs (see `best-sleep-sounds-app-2026.md`).
4. **At least one blockquote** (`> **Lead-in:** …`) for a key insight or pro tip.
5. **2–3 internal links** woven into prose — at least one in the body, one in a closing "what to read next" sentence. Use trailing-slash URLs.
6. **One CTA section near the end** that links to the related product page and the App Store / Chrome Web Store URL. Use the format from `best-pomodoro-techniques-2026.md`:
   ```markdown
   ## Try [Product] today
   …
   [Download {Product} on the App Store →](<store_url>)
   ```
7. **FAQ section** with 3–5 `**Q:** … **A:** …` pairs. Required — every existing post has one and the SEO plan adds FAQPage Schema based on it.

App store URLs (current as of the products.ts manifest):

- FocusCroc → `https://apps.apple.com/us/app/focuscroc/id6757192119`
- DreamTone → `https://apps.apple.com/us/app/dreamtone-sleep-sounds/id6762450717`
- IDSnap → `https://apps.apple.com/us/app/idsnap/id6766225002`
- AiDock (Chrome) → `https://chromewebstore.google.com/detail/aidock-%E2%80%94-ai-%E5%AF%B9%E8%AF%9D%E7%AE%A1%E7%90%86%E5%99%A8/egalaijjmojfnnefehaajbedfjabpijd`
- DevCodec (Chrome) → `https://chromewebstore.google.com/detail/devcodec-%E5%BC%80%E5%8F%91%E8%80%85%E7%BC%96%E8%A7%A3%E7%A0%81%E5%B7%A5%E5%85%B7%E7%AE%B1/aldgckgohkcgckielncdbiinjimiffmo`

If a URL might have changed, check `src/data/products.ts` first — that file is the source of truth.

For the full set of templates (CTA blocks, FAQ patterns, comparison tables, internal-link sentence patterns), see [reference.md](reference.md).

## Step 5 — Write the Chinese post

Save to `src/content/blog-zh/{slug}.md` with the **same** slug. Rules:

- Translate the body, headings, and FAQ. Keep technical terms (App Store, FocusCroc, Pomodoro) untranslated where existing posts do.
- Frontmatter: same `date`, same `readTime`, same `heroImage`, same `relatedProduct`. Translate `title` and `description`. Translate `tag` to match the Chinese tag used in existing `blog-zh/` files (e.g. `Productivity` → `效率`, `Sleep` → `睡眠`, `Photography` → `摄影`). When in doubt, grep `blog-zh/*.md` for the cluster's posts and copy the tag verbatim.
- Image alt text: translate to natural Chinese.
- Internal links must use the `/zh/...` prefix:
  - `/zh/blog/{slug}/`
  - `/zh/{product}/`
- App Store URL stays the same as the English post (the Apple link works globally).
- CTA wording: mirror existing phrasing, e.g. `[在 App Store 下载 FocusCroc →]`, `[Download FocusCroc on the App Store →]` is also acceptable but the convention in `blog-zh/` is Chinese.

## Step 6 — Build verification (optional but recommended)

Run a build to catch frontmatter errors and broken image references:

```bash
npm run build
```

If it fails, the most common causes are:

- `tag` not in the schema's allowed list — there is no allow-list, but a typo'd tag still ships; double-check against existing posts.
- `date` quoted as a string with mismatched format. Use unquoted `2026-04-22`.
- `heroImage` path missing — the file must exist under `public/images/blog/`.
- Missing trailing slash in internal links — Astro is configured with `trailingSlash: 'always'`, so `/blog/foo` will 308-redirect.

## What NOT to do

- Don't invent images. Always download from Unsplash (or the user's URL), verify the photo matches the alt text, then commit the webp.
- Don't add JPG/PNG to `public/images/blog/`. Webp only.
- Don't link to non-existent posts. Cross-check every internal link against the actual filenames in `src/content/blog/`.
- Don't paraphrase the user's verbatim copy when they paste exact wording.
- Don't push speculative product features. Only describe features that appear in `src/data/products.ts` or in an existing announcement post.
- Don't add tracking pixels, social embeds, or external scripts inside the markdown.
- Don't translate proper nouns (FocusCroc, DreamTone, IDSnap, CrocLab, Pomodoro stays Pomodoro in en; existing zh posts use the English brand names verbatim).

## Reference files

- [reference.md](reference.md) — Frontmatter spec, CTA blocks, FAQ examples, comparison-table snippets, EN↔ZH tag mapping, app store URLs, internal-link sentence patterns.
- `scripts/download-image.sh` — Unsplash → webp pipeline (used in Step 3).
