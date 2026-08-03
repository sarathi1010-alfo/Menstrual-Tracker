import http from 'http';
import { spawn } from 'child_process';

const URLS_TO_TEST = [
  '/',
  '/blog/menstrual-cycle-101-beginners-guide',
  '/blog/cycle-phases-explained-follicular-ovulation-luteal',
  '/blog/hormones-and-your-cycle-explained',
  '/blog/how-to-track-your-cycle-step-by-step',
  '/blog/understanding-your-period-normal-vs-not-normal',
  '/use-cases/cycle-tracking-teens-guide',
  '/conditions/pcos-and-cycle-tracking-guide',
  '/what-is-menstrual-cycle',
  '/what-is-ovulation',
  '/what-is-fertile-window',
  '/what-is-luteal-phase',
  '/what-is-follicular-phase',
  '/sitemap.xml'
];

async function startServer() {
  return new Promise((resolve) => {
    const server = spawn('npm', ['run', 'start'], {
      stdio: 'pipe',
      env: { ...process.env, PORT: '3000' }
    });

    server.stdout.on('data', (data) => {
      if (data.toString().includes('Ready in')) {
        resolve(server);
      }
    });
  });
}

async function testUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${url}`, (res) => {
      resolve(res.statusCode);
    }).on('error', (e) => {
      reject(e);
    });
  });
}

async function runTests() {
  console.log('Starting server...');
  const server = await startServer();
  console.log('Server started. Testing URLs...');

  let allPass = true;
  for (const url of URLS_TO_TEST) {
    try {
      const status = await testUrl(url);
      if (status === 200) {
        console.log(`✅ 200 OK: ${url}`);
      } else {
        console.log(`❌ ${status}: ${url}`);
        allPass = false;
      }
    } catch (e) {
      console.log(`❌ ERROR ${e.message}: ${url}`);
      allPass = false;
    }
  }

  server.kill();
  if (allPass) {
    console.log('All tests passed!');
    process.exit(0);
  } else {
    console.log('Some tests failed.');
    process.exit(1);
  }
}

runTests();
