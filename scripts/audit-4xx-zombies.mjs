import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';

console.log('Running 4xx Zombie Audit...');

async function checkUrl(urlStr) {
  return new Promise((resolve) => {
    const url = new URL(urlStr);
    const client = url.protocol === 'https:' ? https : http;
    const req = client.get(urlStr, (res) => {
      resolve({ url: urlStr, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ url: urlStr, status: 'Error: ' + err.message });
    });
    req.end();
  });
}

async function runAudit() {
  const testUrls = [
    'http://localhost:3000/blog',
    'http://localhost:3000/blog/menstrual-cycle-101-beginners-guide',
    'http://localhost:3000/what-is-menstrual-cycle'
  ];
  const results = await Promise.all(testUrls.map(checkUrl));
  console.log('Zombie Audit Results:', results);
}

runAudit().catch(console.error);
