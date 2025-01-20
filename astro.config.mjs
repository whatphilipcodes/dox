// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import rewrite from 'rehype-rewrite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

import expressiveConfig from './src/utils/expressiveConfig.ts';
import { SITE_URL } from './src/consts.ts';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  markdown: {
    rehypePlugins: [
      [
        rewrite,
        {
          selector: 'table',
          rewrite: (
            /** @type {{ type: string; properties: { className: string; }; }} */ node,
          ) => {
            if (node.type === 'element') {
              node.properties.className = 'table-test';
            }
          },
        },
      ],
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
// host option currently not working on my machine
