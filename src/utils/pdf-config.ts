import { join, basename, parse } from 'node:path';
import type { Options, PageOptions } from 'astro-pdf';
import { ExifTool } from 'exiftool-vendored';
import { SITE_AUTHOR } from '../consts';

const scale = 1.3333333;
const zoom = 1.2;
// puppeteer uses 96 dpi instead of 72 to rasterize the pdf, to get the exact resolution in the output we need to multiply with 96 / 72
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
					callback: async (page) => {
						await page.evaluate((zoomValue: number) => {
							const style = document.createElement('style');
							style.innerHTML = `
							  @media print {
								  body * {
									  zoom: ${zoomValue};
									  visibility: hidden !important;
								  }
								  .pdf-export,
								  .pdf-export * {
									  visibility: visible !important;
								  }
							  }
							`;
							document.head.appendChild(style);
						}, zoom);
					},
				};
			}
		},
		runAfter: async (dir, pathnames) => {
			for (const path of pathnames) {
				const tool = new ExifTool({
					taskTimeoutMillis: 5000,
					forceWrite: true,
					writeArgs: [
						'-all=',
						'-overwrite_original',
						`-Title=${parse(path).name}`,
						`-Author=${SITE_AUTHOR}`,
					],
				});
				const abs = join(dir.pathname, path);
				console.log('updating pdf metadata:', abs);
				await tool.write(abs, {}).catch((e) => {
					console.log(e);
				});
				tool.end();
			}
		},
	} as Options;
};

export default pdfConfig;
