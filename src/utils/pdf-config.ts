import type { Options, PageOptions } from 'astro-pdf';

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
	screen: false,
};
const pdfConfig: Options = {
	pages: { '/dex/': pageConfig },
};
export default pdfConfig;
