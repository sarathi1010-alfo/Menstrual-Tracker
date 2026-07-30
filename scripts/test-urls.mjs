import http from 'http';
import { spawn } from 'child_process';

const urls = [
  '/blog',
  '/blog/menstrual-cycle-101-beginners-guide',
  '/blog/cycle-phases-explained-follicular-ovulation-luteal',
  '/blog/hormones-and-your-cycle-explained',
  '/blog/how-to-track-your-cycle-step-by-step',
  '/blog/understanding-your-period-normal-vs-not-normal',
  '/blog/what-is-menstrual-cycle',
  '/blog/what-is-ovulation',
  '/blog/what-is-fertile-window',
  '/blog/what-is-luteal-phase',
  '/blog/what-is-follicular-phase',
  '/blog/cycle-tracking-teens-guide',
  '/blog/pcos-and-cycle-tracking-guide',
];

const checkUrl = (url) => {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${url}`, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => {
      resolve({ url, status: 'Error: ' + e.message });
    });
  });
};

const run = async () => {
  console.log('Starting Next.js server...');
  const serverProcess = spawn('npm', ['run', 'start'], {
    detached: true,
  });

  // Wait a few seconds for server to start
  await new Promise(r => setTimeout(r, 5000));

  console.log('Testing URLs...');
  const results = await Promise.all(urls.map(checkUrl));

  results.forEach(({ url, status }) => {
    console.log(`${url}: ${status === 200 ? '✅ 200 OK' : `❌ ${status}`}`);
  });

  // Kill the server process
  process.kill(-serverProcess.pid);
  console.log('Done.');
};

run().catch(console.error);
