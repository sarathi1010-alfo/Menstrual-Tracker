import https from 'https';

const DOMAIN = 'https://lunacycle.alfo.online';
// In a real scenario, fetch this from env vars
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'PLACEHOLDER_KEY';

async function pingGoogleSitemap() {
  const url = `https://www.google.com/ping?sitemap=${DOMAIN}/sitemap.xml`;
  console.log(`Pinging Google: ${url}`);

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      console.log(`Google Ping Status: ${res.statusCode}`);
      resolve(res.statusCode);
    }).on('error', (e) => {
      console.error(`Google Ping Error: ${e.message}`);
      reject(e);
    });
  });
}

async function triggerIndexNow(urls) {
  const endpoint = 'https://api.indexnow.org/indexnow';
  const data = JSON.stringify({
    host: 'lunacycle.alfo.online',
    key: INDEXNOW_KEY,
    urlList: urls
  });

  console.log(`Triggering IndexNow for ${urls.length} URLs`);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(endpoint, options, (res) => {
      console.log(`IndexNow Status: ${res.statusCode}`);
      resolve(res.statusCode);
    });

    req.on('error', (e) => {
      console.error(`IndexNow Error: ${e.message}`);
      reject(e);
    });

    req.write(data);
    req.end();
  });
}

async function main() {
  try {
    console.log('Automated Post-Publish Script Started...');

    // 1. Ping Google
    await pingGoogleSitemap();

    // 2. Trigger IndexNow (assuming we just published the Week 1 Monday batch)
    const newUrls = [
      `${DOMAIN}/blog/ultimate-guide-to-menstrual-cycle-tracking-in-2026`,
      `${DOMAIN}/blog/what-is-a-menstrual-cycle`,
      `${DOMAIN}/blog/what-is-ovulation`,
      `${DOMAIN}/blog/what-is-the-fertile-window`,
      `${DOMAIN}/blog/what-is-the-luteal-phase`,
      `${DOMAIN}/blog/what-is-the-follicular-phase`
    ];
    await triggerIndexNow(newUrls);

    console.log('Post-Publish automation completed successfully.');
  } catch (error) {
    console.error('Post-Publish automation failed:', error);
    process.exit(1);
  }
}

main();
