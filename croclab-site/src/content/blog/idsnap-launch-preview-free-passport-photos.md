---
title: "IDSnap Launch Preview: Free Passport Photos on Your iPhone — No Upload, No Subscription"
description: "IDSnap is coming soon to iOS — on-device AI for passport and visa photos, 12+ country specs, print-ready export, and zero cloud uploads."
date: 2026-05-22
tag: "Photography"
readTime: 7
heroImage: "/images/blog/idsnap-hero.webp"
relatedProduct: "idsnap"
---

You need a passport photo in the next two weeks. The pharmacy wants $15. The online service wants you to upload your face to a server you've never heard of. The "free" apps watermark your export until you pay.

We're about to ship something different. **[IDSnap](/idsnap)** — a free iOS app that makes print-ready ID photos on your iPhone, entirely on-device. No uploads. No subscription for basic export. No trip to a photo booth.

Here's what's coming, why we built it, and how it compares to what you're probably using today.

## The Real Cost of a "Simple" Passport Photo

A passport photo looks trivial: white background, neutral expression, correct size. In practice, people lose time and money at every step:

| Method | Typical cost | Time | Privacy risk |
|---|---|---|---|
| Pharmacy / photo studio | $10–$20 | 15–30 min + travel | Low (in person) |
| Online ID photo service | $5–$15 | 10–20 min | **High** (face uploaded) |
| Generic photo apps | $0–$30/yr | 5–15 min | Medium–High |
| DIY at home (no tools) | Free | 1+ hour trial & error | Low |

The U.S. State Department alone processes millions of passport applications per year. A large share of rejections come down to **photo specs** — wrong size, bad lighting, incorrect background, or face position — not the application form itself.

> **The problem isn't taking a photo. It's meeting exact official specs without professional equipment.**

That's the gap IDSnap targets.

## What IDSnap Does (Preview)

IDSnap is built around one workflow: **capture → detect → crop → export**. Everything runs locally using Apple's on-device frameworks.

### On-Device AI Face Detection

When you take or import a photo, IDSnap uses on-device vision models to find your face, align eyes and head position, and crop to the exact aspect ratio required for your document type. Your image never leaves your phone for processing.

![Person taking a photo with smartphone for ID document](/images/blog/idsnap-phone-camera.webp)

### One-Tap Background Swap

Remove the messy room behind you and replace it with standard colors — white, blue, red, or custom — in seconds. No green screen, no Photoshop skills.

### 12+ Country Specifications Built In

Choose your document type and country preset:

- U.S. passport & visa
- UK, EU Schengen, and common visa formats
- China, Japan, India, and more

Each preset applies the correct dimensions and framing rules so you're not guessing pixel sizes from a government PDF.

### Print-Ready 4×6 Layout

Export a single digital file for online applications, or generate a **4×6 inch sheet** with multiple copies and crop marks — ready for home printing or a local photo shop.

![Printed photo sheets and documents on a desk](/images/blog/idsnap-print-ready.webp)

> **Privacy by architecture:** If your photo never uploads, it can't leak. For identity documents, that's not a nice-to-have — it's the baseline.

## How IDSnap Compares

| Feature | IDSnap (preview) | Typical online service | Studio |
|---|---|---|---|
| Price for basic export | Free | Often paid | $10–$20 |
| On-device processing | ✅ | ❌ | N/A |
| No account required | ✅ | ❌ | N/A |
| Country presets | 12+ | Varies | Manual |
| Print layout export | ✅ | Sometimes paid | ✅ |
| Same-day at home | ✅ | ✅ | ❌ |

IDSnap won't replace a professional studio for every edge case — but for standard passport, visa, and ID renewals, it should cover what most people actually need.

## Why CrocLab Is Building IDSnap

After [FocusCroc](/focuscroc) (focus timer) and [DreamTone](/dreamtone) (sleep sounds — [now live on Product Hunt](https://www.producthunt.com/products/dreamtone?launch=dreamtone)), IDSnap fits the same philosophy:

1. **Solve a daily annoyance** — expensive, slow, or invasive ID photos
2. **Keep the core free** — export and standard specs shouldn't be paywalled
3. **Privacy first** — on-device AI, no cloud photo pipeline

We're polishing the last details before App Store submission. If you want early access updates, watch our [blog](/blog/) or [contact us](/contact/) — we'll announce the launch date here first.

## What to Expect at Launch

When IDSnap ships, you'll get:

- **Free core workflow** — capture, background swap, crop, and export
- **iPhone & iPad** support (iOS 16+)
- **Offline-capable** processing after install
- **Fast iteration** — more country specs and quality-of-life features based on your feedback

[Learn more about IDSnap →](/idsnap)

The App Store link will go live on launch day. Bookmark the [IDSnap product page](/idsnap) — we'll update it the moment the app is available.

---

## FAQ

**Q: Is IDSnap really free?**
A: Yes. The core passport photo workflow — capture, AI crop, background swap, and standard export — is free. Optional premium features may come later; the essentials stay free.

**Q: Will my photos be uploaded to a server?**
A: No. Face detection, segmentation, and cropping run on your device. CrocLab does not operate a cloud photo pipeline for IDSnap.

**Q: Which countries and document types are supported?**
A: Launch builds include 12+ country presets for common passport and visa photo sizes. We'll expand based on user requests after release.

**Q: Can I print at home?**
A: Yes. IDSnap exports print-ready 4×6 layouts with crop guides, suitable for home printers or photo shops.

**Q: How is this different from the IDSnap article you published earlier?**
A: Our earlier post introduced the concept. This article is a launch preview with updated positioning ahead of the App Store release — follow the blog for the official launch announcement.
