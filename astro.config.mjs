// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

import rehypeRaw from 'rehype-raw';
import rehypeWrapAll from 'rehype-wrap-all';

import expressiveConfig from './src/utils/expressiveCode/expressiveConfig.ts';
import { SITE_URL } from './src/consts.ts';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  markdown: {
    rehypePlugins: [
      rehypeRaw,
      [rehypeWrapAll, { selector: 'table', wrapper: 'div.responsive-table' }],
    ],
  },
  integrations: [expressiveConfig, react(), mdx(), sitemap(), tailwind()],
  experimental: {
    svg: true,
  },
  server: {
    host: true,
  },
});

// during build vite throws a resolve error for 'react-compiler-runtime'
