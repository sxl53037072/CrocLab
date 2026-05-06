# CrocLab Official Website

The official website for [CrocLab](https://croclab.dev) — an independent developer studio building focused apps and browser extensions.

## Tech Stack

- **Framework**: [Astro](https://astro.build/) (Static Site Generation)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Supabase](https://supabase.com/) (Auth, Database)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/)
- **Blog**: Astro Content Collections (Markdown)

## Getting Started

```bash
npm install
npm run dev       # Start dev server at localhost:4321
npm run build     # Build for production
npm run preview   # Preview production build
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```bash
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run `supabase-schema.sql` in the SQL Editor to create all tables
3. Enable Google OAuth in Authentication → Providers → Google
4. Set the redirect URL to `https://croclab.dev/auth/callback/`

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
│   ├── auth/         # OAuth callback
│   ├── wishwall      # Feature request wall
│   ├── profile       # User profile page
│   └── zh/           # Chinese locale pages
├── components/       # Reusable components
│   ├── AuthButton    # Google sign-in / user menu
│   └── CookieConsent # GDPR cookie consent banner
├── lib/              # Supabase client & types
├── data/             # Product data
├── content/blog/     # Blog posts (Markdown)
├── i18n/             # Translations
└── styles/           # Global styles
```

## Features

- **Cookie Consent**: GDPR-compliant cookie consent banner (accept all / necessary only)
- **Google Login**: OAuth via Supabase Auth
- **Wish Wall**: Community feature request wall with voting (word-cloud style, more votes = bigger text)
- **Article Favorites**: Logged-in users can favorite blog posts
- **User Profile**: Personal dashboard with favorites list and browsing history
- **Visit History**: Automatic page visit tracking for logged-in users

## Deployment

Push to `main` branch → Cloudflare Pages auto-builds and deploys.

**Build settings:**
- Framework: Astro
- Build command: `npm run build`
- Output directory: `dist`

**Environment variables** (set in Cloudflare Pages dashboard):
- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`

## Subdomain Routing

App 类型产品使用 `{app}.croclab.dev` 子域名，通过 Cloudflare Worker 代理到主站对应路径。

**当前子域名：**
- `focuscroc.croclab.dev` → `croclab.dev/focuscroc/`
- `dreamtone.croclab.dev` → `croclab.dev/dreamtone/`
- `idsnap.croclab.dev` → `croclab.dev/idsnap/`

**Worker 代码：** `cloudflare/subdomain-router-worker.js`，部署在 Cloudflare Workers 的 `croc-subdomain-router` 服务上。

### 添加新子域名

1. 在 `cloudflare/subdomain-router-worker.js` 的 `APP_MAP` 中添加新条目
2. 在 Cloudflare Dashboard → DNS 中添加 CNAME 记录：`{app}` → `croclab.dev`（开启代理/橙色云朵）
3. 在 Cloudflare Dashboard → Workers 和 Pages → `croc-subdomain-router` → 设置 → 域和路由 中添加路由：`{app}.croclab.dev/*`
4. 在 Workers 和 Pages → `croc-subdomain-router` 中更新 Worker 代码并部署（快速编辑或 `wrangler deploy`）

> **注意：** Worker 与 Cloudflare Pages 是独立部署的。修改 `subdomain-router-worker.js` 后需要单独部署 Worker，push 到 `main` 只会更新 Pages 静态站点。

## Adding a New Product

1. Add product data to `src/data/products.ts`
2. Create product pages in `src/pages/{product-id}/`
3. Create Chinese locale pages in `src/pages/zh/{product-id}/`
4. Add product images to `public/images/{product-id}/`
5. 如果是 App 类型产品且需要子域名，参考上方 [Subdomain Routing](#subdomain-routing) 配置

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
