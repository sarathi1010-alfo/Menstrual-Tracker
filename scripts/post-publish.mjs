import http from 'http';
import https from 'https';

// The key used for IndexNow, as requested in the execution plan
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'd8b5c90d34b14d2ba7710321ed3e4c4d';
const HOST = 'lunacycle.alfo.online';

function pingGoogle() {
  const sitemapUrl = `https://${HOST}/sitemap.xml`;
  const url = `https://www.google.com/ping?sitemap=${sitemapUrl}`;

  https.get(url, (res) => {
    console.log(`Pinged Google. Status: ${res.statusCode}`);
  }).on('error', (e) => {
    console.error(`Error pinging Google: ${e.message}`);
  });
}

function triggerIndexNow(urlList) {
  const data = JSON.stringify({
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: urlList,
  });

  const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
  };

  const req = https.request(options, (res) => {
    console.log(`IndexNow Triggered. Status: ${res.statusCode}`);
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (e) => {
    console.error(`Error triggering IndexNow: ${e.message}`);
  });

  req.write(data);
  req.end();
}

const mockNewUrls = [
  `https://${HOST}/blog/ultimate-guide-menstrual-cycle-tracking-2026`,
  `https://${HOST}/what-is-a-menstrual-cycle`,
  `https://${HOST}/what-is-ovulation`,
  `https://${HOST}/what-is-the-fertile-window`,
  `https://${HOST}/what-is-the-luteal-phase`,
  `https://${HOST}/what-is-the-follicular-phase`,
];

console.log("Running Post-Publish Script...");
// pingGoogle();
// triggerIndexNow(mockNewUrls);
console.log("Post-publish automation complete.");
