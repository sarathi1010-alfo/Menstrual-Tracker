import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';

// Function to perform an HTTP/HTTPS GET request using built-in Node modules
function fetchUrlStatus(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, (res) => {
      // In a real audit, we might follow redirects or just log statuses
      resolve({ url, status: res.statusCode });
    });

    req.on('error', (err) => {
      resolve({ url, status: 'ERROR', message: err.message });
    });

    req.end();
  });
}

async function runAudit() {
  console.log('Starting 4xx Zombie Audit...');

  // Here we would typically read from sitemap.xml
  // For demonstration/script purposes, we'll check a few core URLs against the local dev server or production.

  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

  const testUrls = [
    `${baseUrl}/`,
    `${baseUrl}/blog`,
    `${baseUrl}/faq`,
    `${baseUrl}/privacy`,
    `${baseUrl}/what-is-a-menstrual-cycle`,
    `${baseUrl}/non-existent-page-test-404`
  ];

  const results = [];

  for (const url of testUrls) {
    try {
      const result = await fetchUrlStatus(url);
      results.push(result);
      console.log(`[${result.status}] ${result.url}`);
    } catch (e) {
      console.error(`Error fetching ${url}: ${e}`);
    }
  }

  const failed = results.filter(r => r.status >= 400 || r.status === 'ERROR');

  if (failed.length > 0) {
    console.log('\n--- AUDIT FAILED: Zombies Found ---');
    console.log(failed);
    // In CI/CD, we might exit(1) to fail the build
    // process.exit(1);
  } else {
    console.log('\n--- AUDIT PASSED: No Zombies Found ---');
  }
}

runAudit();
