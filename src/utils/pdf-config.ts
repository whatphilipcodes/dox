import { join } from 'node:path';
import type { Options, PageOptions } from 'astro-pdf';
import { ExifTool } from 'exiftool-vendored';
import { SITE_AUTHOR } from '../consts';

const scale = 1.3333333;
// puppeteer uses 96 dpi instead of 72 to rasterize the pdf, to get the exact resolution in the output we need to multiply with 96 / 72

const pageConfig: PageOptions = {
	pdf: {
		width: 1920 * scale,
		height: 1080 * scale,
		printBackground: true,
		displayHeaderFooter: false,
	},
	path: 'download/pdf/test.pdf',
	waitUntil: 'networkidle0',
	throwOnFail: true,
	screen: false,
};
const pdfConfig: Options = {
	pages: { '/dex/': pageConfig },
	// pages: (pathname) => {
	// 	if (pathname.startsWith('/press/')) {
	// 		return { path: `${pathname}.pdf` };
	// 	}
	// 	if (pathname.startsWith('/brochure/')) {
	// 		return [
	// 			{
	// 				waitUntil: 'networkidle0',
	// 				pdf: { format: 'A4', printBackground: true },
	// 			},
	// 			{
	// 				path: `${pathname}-alt.pdf`,
	// 				callback: async (page) => {
	// 					await page.evaluate(() => document.body.classList.add('alt'));
	// 				},
	// 			},
	// 		];
	// 	}
	// },
	runAfter: async (dir, pathnames) => {
		const tool = new ExifTool({
			taskTimeoutMillis: 5000,
			forceWrite: true,
			writeArgs: ['-all=', '-overwrite_original', `-Author=${SITE_AUTHOR}`],
		});
		for (const path of pathnames) {
			const abs = join(dir.pathname, path);
			console.log('updating pdf metadata:', abs);
			await tool.write(abs, {}).catch((e) => {
				console.log(e);
			});
		}
		tool.end();
	},
};

export default pdfConfig;
