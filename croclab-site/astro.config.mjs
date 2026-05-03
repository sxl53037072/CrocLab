import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://croclab.dev',
  trailingSlash: 'always',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) =>
        !page.includes('/terms/') &&
        !page.includes('/privacy/') &&
        !page.includes('/contact/'),
      serialize: (item) => ({
        ...item,
        lastmod: new Date().toISOString(),
      }),
    }),
  ],
});
