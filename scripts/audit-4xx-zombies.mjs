import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';

const SITE_URL = 'http://localhost:3000'; // Target local server for testing

async function checkUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ url, status: 0, error: err.message });
    });
  });
}

async function audit() {
  console.log(`Starting 4xx Zombie Audit for ${SITE_URL}`);

  try {
    // 1. Fetch Sitemap
    const sitemapRes = await fetch(`${SITE_URL}/sitemap.xml`);
    if (!sitemapRes.ok) {
      console.error(`Failed to fetch sitemap: ${sitemapRes.status}`);
      process.exit(1);
    }
    const sitemapText = await sitemapRes.text();

    // 2. Extract URLs
    const urls = [];
    const regex = /<loc>(.*?)<\/loc>/g;
    let match;
    while ((match = regex.exec(sitemapText)) !== null) {
      let u = match[1];
      // Map absolute production URLs to local for testing
      if (u.startsWith('https://lunacycle.alfo.online')) {
          u = u.replace('https://lunacycle.alfo.online', SITE_URL);
      }
      urls.push(u);
    }

    console.log(`Found ${urls.length} URLs to check.`);

    // 3. Check each URL
    const results = [];
    for (let i = 0; i < urls.length; i++) {
        // Sleep slightly to avoid hammering
        await new Promise(r => setTimeout(r, 50));
        const res = await checkUrl(urls[i]);
        results.push(res);
        if (res.status >= 400) {
           console.log(`❌ [${res.status}] ${res.url}`);
        } else {
           process.stdout.write('.');
        }
    }
    console.log('\n');

    // 4. Report
    const zombies = results.filter(r => r.status >= 400 || r.status === 0);
    console.log(`\nAudit Complete. Found ${zombies.length} zombies.`);

    if (zombies.length > 0) {
      console.error('Zombie URLs detected:');
      zombies.forEach(z => console.error(`- ${z.url} (${z.status})`));
      process.exit(1);
    }

  } catch (error) {
    console.error('Audit failed:', error);
    process.exit(1);
  }
}

audit();
