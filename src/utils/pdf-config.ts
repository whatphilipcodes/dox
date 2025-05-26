import { join, basename } from 'node:path';
import type { Options, PageOptions } from 'astro-pdf';
import { ExifTool } from 'exiftool-vendored';
import { SITE_AUTHOR } from '../consts';

const scale = 1.3333333;
// puppeteer uses 96 dpi instead of 72 to rasterize the pdf, to get the exact resolution in the output we need to multiply with 96 / 7
const pageConfig = (width: number, height: number) => {
	return {
		pdf: {
			width: width * scale,
			height: height * scale,
			printBackground: true,
			displayHeaderFooter: false,
		},
		waitUntil: 'networkidle0',
		throwOnFail: true,
		screen: false,
	} as PageOptions;
};

const pdfConfig = (
	route: string,
	outDir = 'pdf',
	width = 1920,
	height = 1080,
) => {
	return {
		pages: (pathname) => {
			if (pathname.startsWith(route)) {
				const filename = basename(pathname).replace(/[\\/]/g, '');
				return {
					...pageConfig(width, height),
					path: join(outDir, `${filename}.pdf`),
				};
			}
		},
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
	} as Options;
};

export default pdfConfig;
