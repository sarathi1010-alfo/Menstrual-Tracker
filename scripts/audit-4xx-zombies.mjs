/**
 * 4xx Zombie Audit Script
 * Scheduled for Week 4 to perform headless checks for orphaned or broken pages
 * and prevent Google Search Console coverage degradation.
 */

const SITEMAP_URL = 'http://localhost:3000/sitemap.xml';

async function audit() {
  console.log(`Starting 4xx Zombie Audit based on sitemap: ${SITEMAP_URL}`);
  console.log('Ensure dev server is running on localhost:3000');

  try {
    const res = await fetch(SITEMAP_URL);
    if (!res.ok) {
      console.log('Sitemap not found or server not running.');
      return;
    }
    const text = await res.text();

    const urls = [];
    const regex = /<loc>(.*?)<\/loc>/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
      urls.push(match[1]);
    }

    console.log(`Found ${urls.length} URLs in sitemap.`);
    let errors = 0;

    for (const url of urls) {
      try {
        const urlRes = await fetch(url);
        if (!urlRes.ok) {
          console.error(`[4xx ZOMBIE DETECTED] ${url} returned status ${urlRes.status}`);
          errors++;
        }
      } catch (err) {
        console.error(`[ERROR] Failed to fetch ${url}: ${err.message}`);
        errors++;
      }
    }

    if (errors === 0) {
      console.log('Audit complete: No 4xx zombies found.');
    } else {
      console.log(`Audit complete: Found ${errors} potential zombie(s).`);
    }
  } catch (err) {
    console.error('Audit failed:', err);
  }
}

audit();
