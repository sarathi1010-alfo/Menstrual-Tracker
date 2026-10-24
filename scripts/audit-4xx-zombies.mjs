import fs from 'fs';
import path from 'path';
import http from 'http';

// Helper function to check a URL
const checkUrl = (url) => {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      resolve({ url, statusCode: res.statusCode });
    }).on('error', (err) => {
      resolve({ url, statusCode: 500, error: err.message });
    });
  });
};

async function auditZombies() {
  console.log('Starting 4xx Zombie Audit...');

  // These are the URLs we expect to be working based on the new content
  const urlsToTest = [
    'http://localhost:3000/',
    'http://localhost:3000/blog',
    'http://localhost:3000/faq',
    'http://localhost:3000/privacy',
    'http://localhost:3000/blog/ultimate-guide-menstrual-cycle-tracking-2026',
    'http://localhost:3000/what-is-a-menstrual-cycle',
    'http://localhost:3000/what-is-ovulation',
    'http://localhost:3000/what-is-the-fertile-window',
    'http://localhost:3000/what-is-the-luteal-phase',
    'http://localhost:3000/what-is-the-follicular-phase'
  ];

  let hasErrors = false;

  for (const url of urlsToTest) {
    const result = await checkUrl(url);
    if (result.statusCode >= 400) {
      console.error(`❌ ERROR: ${url} returned status ${result.statusCode}`);
      hasErrors = true;
    } else {
      console.log(`✅ OK: ${url} (${result.statusCode})`);
    }
  }

  if (hasErrors) {
    console.error('\nAudit Failed: Zombie pages found (4xx/5xx).');
    process.exit(1);
  } else {
    console.log('\nAudit Passed: All tested URLs returned 200 OK.');
    process.exit(0);
  }
}

auditZombies();
