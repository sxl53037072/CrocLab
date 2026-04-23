# CrocLab Official Website

The official website for [CrocLab](https://croclab.dev) — an independent developer studio building focused apps and browser extensions.

## Tech Stack

- **Framework**: [Astro](https://astro.build/) (Static Site Generation)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/)
- **Blog**: Astro Content Collections (Markdown)

## Getting Started

```bash
npm install
npm run dev       # Start dev server at localhost:4321
npm run build     # Build for production
npm run preview   # Preview production build
```

## Project Structure

```
src/
├── layouts/          # Page layouts (Base, Product, Legal, Blog)
├── pages/            # All routes
│   ├── focuscroc/    # FocusCroc product pages
│   ├── dreamtone/    # DreamTone product pages
│   ├── aidock/       # AiDock product pages
│   ├── devcodec/     # DevCodec product pages
│   ├── blog/         # Blog pages
│   └── zh/           # Chinese locale pages
├── components/       # Reusable components
├── data/             # Product data
├── content/blog/     # Blog posts (Markdown)
├── i18n/             # Translations
└── styles/           # Global styles
```

## Deployment

Push to `main` branch → Cloudflare Pages auto-builds and deploys.

**Build settings:**
- Framework: Astro
- Build command: `npm run build`
- Output directory: `dist`

## Adding a New Product

1. Add product data to `src/data/products.ts`
2. Create product pages in `src/pages/{product-id}/`
3. Create Chinese locale pages in `src/pages/zh/{product-id}/`
4. Add product images to `public/images/{product-id}/`

## Adding a Blog Post

Create a new `.md` file in `src/content/blog/` with frontmatter:

```yaml
---
title: "Your Post Title"
description: "Brief description"
date: 2026-04-23
tag: "Category"
readTime: 5
relatedProduct: "focuscroc"  # optional
---
```
