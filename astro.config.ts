// @ts-check
import { defineConfig } from 'astro/config';
import { SITE_URL } from './src/consts.ts';
import pdfConfig from './src/utils/pdf-config.ts';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';
import pdf from 'astro-pdf';

import rehypeKatex from 'rehype-katex';
import rehypeWrapAll from 'rehype-wrap-all';
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
	integrations: [
		react({
			// experimentalReactChildren: true,
			// experimentalDisableStreaming: true,
		}),
		expressiveCode(),
		mdx(),
		sitemap(),
		pdf(pdfConfig('/dex/', '/pdf/', 1920, 1080)),
	],
	// server: {
	// 	host: true,
	vite: {
		plugins: [tailwindcss()],
		build: {
			chunkSizeWarningLimit: 1000,
		},
	},
});
