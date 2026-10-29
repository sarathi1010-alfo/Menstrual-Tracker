import https from 'https';

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'd8b5c90d34b14d2ba7710321ed3e4c4d';
const HOST = 'lunacycle.alfo.online';
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

// Newly published URLs to ping
const urlList = [
  `https://${HOST}/blog/ultimate-guide-menstrual-cycle-tracking`,
  `https://${HOST}/what-is-a-menstrual-cycle`,
  `https://${HOST}/what-is-ovulation`,
  `https://${HOST}/what-is-the-fertile-window`,
  `https://${HOST}/what-is-the-luteal-phase`,
  `https://${HOST}/what-is-the-follicular-phase`
];

async function triggerIndexNow() {
  const payload = JSON.stringify({
    host: HOST,
    key: INDEXNOW_KEY,
    urlList: urlList
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
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        console.log(`IndexNow Response: ${res.statusCode} - ${data}`);
        resolve({ statusCode: res.statusCode, data });
      });
    });

    req.on('error', (e) => {
      console.error(`IndexNow Request Error: ${e.message}`);
      reject(e);
    });

    req.write(payload);
    req.end();
  });
}

async function pingGoogle() {
  const options = {
    hostname: 'www.google.com',
    path: `/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    method: 'GET'
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      console.log(`Google Ping Response: ${res.statusCode}`);
      resolve(res.statusCode);
    });

    req.on('error', (e) => {
      console.error(`Google Ping Error: ${e.message}`);
      reject(e);
    });

    req.end();
  });
}

async function run() {
  console.log('--- Starting Post-Publishing Protocol ---');
  try {
    await pingGoogle();
    await triggerIndexNow();
    console.log('--- Post-Publishing Protocol Complete ---');
  } catch (error) {
    console.error('Failed to complete post-publishing protocol:', error);
  }
}

run();
