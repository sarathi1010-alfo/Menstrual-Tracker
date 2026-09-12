import http from 'http';
import { spawn } from 'child_process';

const server = spawn('npm', ['run', 'start'], { stdio: 'pipe' });

let isListening = false;
let output = '';

server.stdout.on('data', (data) => {
  output += data.toString();
  if (output.includes('Ready in') || output.includes('started server on')) {
    isListening = true;
    runTests();
  }
});

server.on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

const pagesToTest = [
  '/blog',
  '/blog/menstrual-cycle-101-beginners-guide',
  '/what-is-menstrual-cycle',
  '/use-cases/cycle-tracking-teens-guide',
  '/conditions/pcos-and-cycle-tracking-guide',
  '/sitemap.xml'
];

async function runTests() {
  console.log('Testing pages...');

  let success = true;
  for (const page of pagesToTest) {
    await new Promise((resolve) => {
      http.get(`http://localhost:3000${page}`, (res) => {
        console.log(`GET ${page} - Status: ${res.statusCode}`);
        if (res.statusCode !== 200) success = false;
        resolve();
      }).on('error', (err) => {
        console.error(`Error fetching ${page}:`, err);
        success = false;
        resolve();
      });
    });
  }

  server.kill();
  if (success) {
    console.log('All tests passed.');
    process.exit(0);
  } else {
    console.log('Some tests failed.');
    process.exit(1);
  }
}

// Timeout after 30 seconds
setTimeout(() => {
  if (!isListening) {
    console.error('Server did not start in time. Output so far:');
    console.error(output);
    server.kill();
    process.exit(1);
  }
}, 30000);
