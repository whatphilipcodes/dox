import { deploy } from '@samkirkland/ftp-deploy';
import { SERVER_DIR, SITE_URL } from '../src/consts.ts';

async function deployMyCode() {
	console.log('Deploying to configured FTP server...');
	await deploy({
		server: process.env.FTPSERVER,
		username: process.env.FTPUSERNAME,
		password: process.env.FTPPASSWORD,
		protocol: 'ftps',
		'local-dir': './dist/',
		'server-dir': SERVER_DIR,
		exclude: ['.*'],
	});
	console.log(
		`Deployment complete. Check out the updated page on: ${SITE_URL}`,
		'\n',
	);
}

deployMyCode();
