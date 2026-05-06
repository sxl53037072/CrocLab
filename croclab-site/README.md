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
