import type { Options, PageOptions } from 'astro-pdf';

const pageConfig: PageOptions = {
	pdf: {
		width: 1200,
		height: 720,
		printBackground: true,
	},
	path: 'download/pdf/test.pdf',
	waitUntil: 'networkidle0',
	screen: false,
};
const pdfConfig: Options = {
	pages: { '/dex/': pageConfig },
};
export default pdfConfig;
