import type { AstroIntegrationLogger, AstroIntegration } from 'astro';
import { SITE_AUTHOR } from '../consts';
import { ExifTool } from 'exiftool-vendored';

const metawrite = (): AstroIntegration => ({
	name: 'meta-write',
	hooks: {
		'astro:build:done': async (options: {
			pages: { pathname: string }[];
			dir: URL;
			assets: Map<string, URL[]>;
			logger: AstroIntegrationLogger;
		}) => {
			options.logger.info(options.dir.pathname);
			const tool = new ExifTool({
				taskTimeoutMillis: 5000,
				forceWrite: true,
				writeArgs: ['-all=', '-overwrite_original', `-Author=${SITE_AUTHOR}`],
			});
			await tool.write('dist/download/pdf/test.pdf', {}).catch((e) => {
				options.logger.info(e);
			});
			tool.end();
		},
	},
});

export default metawrite;
