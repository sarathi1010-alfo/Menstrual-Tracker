import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the NEXT_PUBLIC_SITE_URL is defined, fallback for local testing
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

async function fetchSitemapUrls(sitemapUrl) {
  return new Promise((resolve, reject) => {
    https.get(sitemapUrl, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 400) {
          console.warn(`Sitemap not found or inaccessible at ${sitemapUrl} (Status: ${res.statusCode})`);
          resolve([]);
          return;
        }

        // Simple regex to extract URLs from XML
        const urls = [];
        const regex = /<loc>(.*?)<\/loc>/g;
        let match;
        while ((match = regex.exec(data)) !== null) {
          urls.push(match[1]);
        }
        resolve(urls);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ url, status: 'ERROR', error: err.message });
    });
  });
}

async function runAudit() {
  console.log(`Starting 4xx Zombie Audit for ${SITE_URL}`);

  try {
    const sitemapUrl = `${SITE_URL}/sitemap.xml`;
    console.log(`Fetching URLs from ${sitemapUrl}...`);

    const urls = await fetchSitemapUrls(sitemapUrl);

    if (urls.length === 0) {
      console.log('No URLs found to audit. Ensure the server is running and sitemap.xml is accessible.');
      return;
    }

    console.log(`Found ${urls.length} URLs. Checking statuses...`);

    const results = [];
    const zombies = [];

    // Batch processing to avoid overwhelming the server
    const batchSize = 10;
    for (let i = 0; i < urls.length; i += batchSize) {
      const batch = urls.slice(i, i + batchSize);
      const batchResults = await Promise.all(batch.map(checkUrl));

      results.push(...batchResults);

      batchResults.forEach(result => {
        if (result.status >= 400 || result.status === 'ERROR') {
          zombies.push(result);
          console.error(`🚨 ZOMBIE DETECTED: ${result.url} - Status: ${result.status}`);
        } else {
          console.log(`✅ OK: ${result.url} - Status: ${result.status}`);
        }
      });

      // Small delay between batches
      await new Promise(r => setTimeout(r, 500));
    }

    console.log('\n--- AUDIT COMPLETE ---');
    console.log(`Total URLs checked: ${urls.length}`);
    console.log(`Total Zombies (4xx/5xx/Errors): ${zombies.length}`);

    if (zombies.length > 0) {
      console.log('\nAction Required: The following URLs need attention:');
      zombies.forEach(z => console.log(`- ${z.url} (Status: ${z.status})`));
      process.exit(1);
    } else {
      console.log('All URLs are healthy! 🎉');
      process.exit(0);
    }

  } catch (error) {
    console.error('Audit failed:', error);
    process.exit(1);
  }
}

runAudit();
