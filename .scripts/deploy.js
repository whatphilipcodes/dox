import { deploy } from '@samkirkland/ftp-deploy';

async function deployMyCode() {
  console.log('deploying to test domain...');
  await deploy({
    server: process.env.FTPSERVER,
    username: process.env.FTPUSERNAME,
    password: process.env.FTPPASSWORD,
    protocol: 'ftps',
    'local-dir': './dist/',
    'server-dir': './public_html/',
    exclude: ['.*'],
  });
  console.log('deployment complete. Check out on: https://your.url.here', '\n');
}

deployMyCode();
