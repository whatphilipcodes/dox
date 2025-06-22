import { basename, join, parse } from 'node:path';
import type { Options, PageOptions } from 'astro-pdf';
import { ExifTool } from 'exiftool-vendored';
import { SITE_AUTHOR } from '../consts';

const pageConfig = (width: number, height: number) => {
	// puppeteer uses 96 dpi instead of 72 to rasterize the pdf, to get the exact resolution in the output we need to multiply with 96 / 72
	const scale = 96 / 72;
	return {
		pdf: {
			width: width * scale,
			height: height * scale,
			printBackground: true,
			scale: scale,
		},
		waitUntil: 'networkidle0',
		throwOnFail: true,
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
					callback: async (page) => {
						await page.evaluate(() => {
							const style = document.createElement('style');
							style.innerHTML = `
							  @media print {
								  body * {
									  visibility: hidden !important;
								  }
								  .pdf-export,
								  .pdf-export * {
									  visibility: visible !important;
								  }
							  }
							`;
							document.head.appendChild(style);
						});
					},
					path: join(outDir, `${filename}.pdf`),
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
