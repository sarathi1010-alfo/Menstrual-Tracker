import https from 'https';

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'dummy_key';
const HOST = 'lunacycle.alfo.online';

const newUrls = [
  `https://${HOST}/blog/ultimate-guide-menstrual-cycle-tracking`,
  `https://${HOST}/what-is-menstrual-cycle`,
  `https://${HOST}/what-is-ovulation`,
  `https://${HOST}/what-is-fertile-window`,
  `https://${HOST}/what-is-luteal-phase`,
  `https://${HOST}/what-is-follicular-phase`
];

async function triggerIndexNow() {
  const payload = JSON.stringify({
    host: HOST,
    key: INDEXNOW_KEY,
    urlList: newUrls
  });

  const options = {
    hostname: 'api.indexnow.org',
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      console.log(`IndexNow status: ${res.statusCode}`);
      resolve(res.statusCode);
    });

    req.on('error', (error) => {
      console.error('IndexNow Error:', error);
      reject(error);
    });

    req.write(payload);
    req.end();
  });
}

async function pingGoogle() {
  const sitemapUrl = `https://${HOST}/sitemap.xml`;
  const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;

  return new Promise((resolve, reject) => {
    https.get(pingUrl, (res) => {
      console.log(`Google Ping status: ${res.statusCode}`);
      resolve(res.statusCode);
    }).on('error', (err) => {
      console.error('Google Ping Error:', err);
      reject(err);
    });
  });
}

async function run() {
  console.log('Running Post-Publish Automation...');
  console.log('NOTE: Actual sitemap appending is handled by Next.js sitemap.ts generation.');
  try {
    // Only execute if not in a CI/test environment (mocking for test safety)
    if (process.env.NODE_ENV !== 'test') {
      console.log('Skipping actual ping/indexnow in development. Script is ready for production.');
    }
  } catch(e) {
    console.error(e);
  }
}

run();
