# CrocLab Blog Reference

Templates and lookup tables for `write-croclab-blog`. Read this when you need exact wording, frontmatter, or copy patterns. Don't read it for steps the SKILL.md already covers.

## 1. Frontmatter spec (from `src/content/config.ts`)

```ts
const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  updatedDate: z.date().optional(),
  author: z.string().default('CrocLab'),
  tag: z.string(),
  readTime: z.number(),
  heroImage: z.string().optional(),
  ogImage: z.string().optional(),
  relatedProduct: z.string().optional(),
});
```

Canonical example:

```yaml
---
title: "How to Mix Sleep Soundscapes Like a Sound Designer"
description: "Layer rain, brown noise, and a fireplace to build a sleep soundscape that masks distractions and lulls you to sleep faster."
date: 2026-04-29
tag: "Sleep"
readTime: 7
heroImage: "/images/blog/soundscape-mix-hero.webp"
relatedProduct: "dreamtone"
---
```

Rules:

- `date` is **unquoted** (`2026-04-29`), not a string. Quoting forces it to be parsed as a string and the schema fails.
- `tag` is free-form; pick from existing tags. The same English tag string is used in both EN posts. The ZH version uses the Chinese tag (see §6 below).
- `relatedProduct` matches an `id` from `src/data/products.ts`: `focuscroc | dreamtone | idsnap | aidock | devcodec`.
- `heroImage` path must start with `/images/blog/` and end in `.webp`. The file must exist before build.

## 2. App store / product URLs

Source of truth: `src/data/products.ts`. As of writing:

| Product | Page (EN / ZH) | Store link |
|---|---|---|
| FocusCroc | `/focuscroc/` · `/zh/focuscroc/` | `https://apps.apple.com/us/app/focuscroc/id6757192119` |
| DreamTone | `/dreamtone/` · `/zh/dreamtone/` | `https://apps.apple.com/us/app/dreamtone-sleep-sounds/id6762450717` |
| IDSnap | `/idsnap/` · `/zh/idsnap/` | `https://apps.apple.com/us/app/idsnap/id6766225002` |
| AiDock | `/aidock/` · `/zh/aidock/` | `https://chromewebstore.google.com/detail/aidock-%E2%80%94-ai-%E5%AF%B9%E8%AF%9D%E7%AE%A1%E7%90%86%E5%99%A8/egalaijjmojfnnefehaajbedfjabpijd` |
| DevCodec | `/devcodec/` · `/zh/devcodec/` | `https://chromewebstore.google.com/detail/devcodec-%E5%BC%80%E5%8F%91%E8%80%85%E7%BC%96%E8%A7%A3%E7%A0%81%E5%B7%A5%E5%85%B7%E7%AE%B1/aldgckgohkcgckielncdbiinjimiffmo` |

Always re-check `src/data/products.ts` if you suspect a URL has changed.

## 3. CTA block templates

### App (iOS) — English

```markdown
## Try [Product] today

[Product] is built for [problem statement in 1 sentence]. [One concrete benefit sentence.]

Want to [related goal]? Read our guide on [related-post anchor](/blog/{slug}/) and see how [Product] compares in our [comparison post anchor](/blog/{slug}/).

[Download [Product] on the App Store →](<store_url>)
```

### App (iOS) — 中文

```markdown
## 立即试试 [Product]

[Product] 专为[一句话问题陈述]打造。[一句话具体收益。]

想[相关目标]？阅读我们的[相关文章锚文本](/zh/blog/{slug}/)，并查看[对比文章锚文本](/zh/blog/{slug}/)。

[在 App Store 下载 [Product] →](<store_url>)
```

### Chrome extension — English

```markdown
## Get [Product] for Chrome

[Add [Product] to Chrome →](<chrome_store_url>)
```

### Chrome extension — 中文

```markdown
## 安装 [Product]

[在 Chrome 应用商店添加 [Product] →](<chrome_store_url>)
```

## 4. FAQ template (required at the bottom)

3–5 question/answer pairs, one blank line between pairs, separated from the article body by a single `---`.

```markdown
---

## FAQ

**Q: First question reflecting a real reader concern?**
A: Direct, ≤2 sentence answer. Reference the product or another post when natural.

**Q: Second question?**
A: …

**Q: Third question?**
A: …
```

中文版用 `常见问题` 作为 H2 标题，`**问：…？**` 与 `**答：**` 配对。

## 5. Internal-link sentence patterns

Weave links **inside paragraphs** rather than as a bare list. Patterns that read naturally:

- `Once you've picked an app, check out our guide on [how to fall asleep in 5 minutes](/blog/how-to-fall-asleep-fast/)…`
- `For the science behind why this works, see our [complete guide to noise colors](/blog/white-noise-brown-noise-pink-noise-guide/).`
- `Want to build a daily study habit? Read our guide on [the streak method that actually works](/blog/how-to-build-consistent-study-habit/)…`

Place at least **one link in the body** (not just at the end). The closing CTA paragraph is a good place for a "what to read next" mention.

## 6. EN ↔ ZH tag mapping

These are the tag strings observed in existing `blog-zh/` files. Match them exactly:

| EN tag | ZH tag |
|---|---|
| Productivity | 效率 |
| Sleep | 睡眠 |
| Focus | 专注 |
| ADHD | ADHD |
| Photography | 摄影 |
| Travel | 旅行 |
| Developer Tools | 开发者工具 |

If you create a new tag, add it consistently to both posts and prefer reusing an existing one.

## 7. Comparison table snippet

For "best X" or "X vs Y" posts, use a 4–7 column markdown table near the middle of the article. Example structure:

```markdown
| App | Price | Sounds | Sleep Timer | Offline | Mixing | No Ads |
|-----|-------|--------|-------------|---------|--------|--------|
| **DreamTone** | Free | 30+ | ✅ | ✅ | ✅ | ✅ |
| Calm | $69.99/yr | 100+ | ✅ | ✅ | ❌ | ✅ |
```

Bold the row of the CrocLab product. Use `✅` / `❌` for boolean cells. Avoid emoji-only cells when a number or word would be more informative.

## 8. Hero & body image conventions

| Image type | Filename pattern | Width | Quality | Typical file size |
|---|---|---|---|---|
| Hero | `{slug}-hero.webp` or `{topic}-hero.webp` | 1600 px | 82 | 80–150 KB |
| Body | `{topic-or-scene}.webp` | 1600 px | 82 | 30–80 KB |

Use kebab-case lowercase filenames, ASCII only. Reuse an existing image if a relevant one already lives in `public/images/blog/` — the manifest is short enough to scan with `ls`.

## 9. Common Unsplash query suggestions by cluster

Starting points; refine until the photo matches the section it accompanies:

- **Sleep / DreamTone:** `cozy bedroom warm light`, `rain on window night`, `peaceful sleep dark room`, `nature forest mist`, `headphones on bed`.
- **Focus / FocusCroc:** `tomato kitchen timer`, `clean desk laptop morning`, `notebook coffee study`, `student writing notes`, `open book sunlight`.
- **Photography / IDSnap:** `passport documents on desk`, `photo booth retro`, `business headshot studio light`, `printer printing photos`, `travel boarding pass`.
- **Developer / DevCodec / AiDock:** `mechanical keyboard close-up`, `dark code editor screen`, `monitor with terminal`, `developer workspace desk`.

## 10. Body image placement

- Place the **first body image** within the first 2–3 H2 sections (before the reader scrolls past the fold).
- For posts with a comparison table, follow the table with one supporting image.
- 3 images max for short posts (≤6 min read), 4 for long ones (≥10 min). More than that hurts page weight without aiding comprehension.

## 11. Build commands

```bash
# from croclab-site root
npm run build         # full build, surfaces frontmatter errors
npm run dev           # local preview at localhost:4321
```

A successful build prints `Astro built in …` with no `[error]` lines. The `[content]` plugin reports unknown frontmatter fields explicitly — read those messages line by line if it fails.
