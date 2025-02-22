// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';
import rehypeWrapAll from 'rehype-wrap-all';

// import expressiveConfig from './src/utils/expressiveCode/expressiveConfig.ts';
import { SITE_URL } from './src/consts.ts';

import expressiveCode from 'astro-expressive-code';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  markdown: {
    rehypePlugins: [
      [rehypeWrapAll, { selector: 'table', wrapper: 'div.responsive-table' }],
    ],
  },
  integrations: [react(), expressiveCode(), mdx(), sitemap()],
  experimental: {
    responsiveImages: true,
    svg: true,
  },
  image: {
    experimentalLayout: 'responsive',
  },
  server: {
    host: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
