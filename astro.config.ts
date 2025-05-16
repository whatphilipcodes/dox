// @ts-check
import { defineConfig } from 'astro/config';
import pdfConfig from './src/utils/pdf-config.ts';
import { SITE_URL } from './src/consts.ts';

import expressiveCode from 'astro-expressive-code';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import pdf from 'astro-pdf';

import rehypeWrapAll from 'rehype-wrap-all';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: SITE_URL,
	markdown: {
		remarkPlugins: [remarkMath],
		rehypePlugins: [
			rehypeKatex,
			[rehypeWrapAll, { selector: 'table', wrapper: 'div.responsive-table' }],
		],
	},
	integrations: [react(), expressiveCode(), mdx(), sitemap(), pdf(pdfConfig)],
	experimental: {
		responsiveImages: true,
	},
	// server: {
	// 	host: true,
	// },
	vite: {
		plugins: [tailwindcss()],
		build: {
			chunkSizeWarningLimit: 1000,
		},
	},
});
