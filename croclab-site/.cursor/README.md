# CrocLab site — Cursor skills

Project-local Agent Skills for this Astro site. Cursor loads skills from `.cursor/skills/<name>/SKILL.md` when the workspace root is `croclab-site`.

## Included skills

| Skill | Purpose |
|-------|---------|
| `write-croclab-blog` | Bilingual EN/ZH blog posts, Unsplash images, internal links, product CTAs |
| `gsap-*` | GSAP / ScrollTrigger patterns for homepage and UI motion |

## Write blog — image script

From the `croclab-site` directory:

```bash
.cursor/skills/write-croclab-blog/scripts/download-image.sh \
  "https://unsplash.com/photos/..." \
  my-post-hero \
  --width 1600 --quality 82
```

Requires `curl` and `cwebp` (`brew install webp`).

## Syncing to your global Cursor skills (optional)

To use the same skills in other workspaces:

```bash
ln -sf "$(pwd)/.cursor/skills/write-croclab-blog" ~/.cursor/skills/write-croclab-blog
```
