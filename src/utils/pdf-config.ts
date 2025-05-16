import type { Options, PageOptions } from 'astro-pdf';

const pageConfig: PageOptions = {
	pdf: {
		width: 1920,
		height: 1080,
		printBackground: true,
	},
	path: 'test.pdf',
	waitUntil: 'networkidle0',
	screen: false,
};
const pdfConfig: Options = {
	pages: { '/': pageConfig },
};
export default pdfConfig;
