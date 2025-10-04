import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { remarkWikiLinks } from './src/lib/remark-wikilinks';

export default defineConfig({
  integrations: [react()],
  site: 'https://1ex.me',
  output: 'static',
  compressHTML: true,
  markdown: {
    remarkPlugins: [
      [remarkWikiLinks, { collection: 'blog' }] // Default collection
    ],
  },
});