// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

import { SITE_URL } from './src/consts.ts';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  markdown: {
    shikiConfig: {
      themes: {
        light: 'one-light',
        dark: 'one-dark-pro',
      },
    },
  },
  integrations: [react(), mdx(), sitemap(), tailwind()],
});

// using react and mdx currently prints a bug to console when using hooks: https://github.com/withastro/astro/issues/12802
// during build vite throws a resolve error for 'react-compiler-runtime'
