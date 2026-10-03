/**
 * Post-Publishing workflows: Ping IndexNow
 */

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'd8b5c90d34b14d2ba7710321ed3e4c4d';
const HOST = 'lunacycle.alfo.online';
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

async function pingIndexNow() {
  const url = `https://api.indexnow.org/indexnow?url=${SITEMAP_URL}&key=${INDEXNOW_KEY}`;
  console.log(`Pinging IndexNow API...`);
  try {
    const res = await fetch(url);
    if (res.ok) {
      console.log('Successfully pinged IndexNow.');
    } else {
      console.log(`Failed to ping IndexNow: ${res.status}`);
    }
  } catch (err) {
    console.error('Error pinging IndexNow:', err);
  }
}

pingIndexNow();
