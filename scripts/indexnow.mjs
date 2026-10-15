import https from 'https';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://lunacycle.alfo.online';
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'LUNACYCLE_INDEXNOW_KEY_12345';
const HOST = new URL(SITE_URL).host;

async function pingIndexNow() {
  const urlList = [
    `${SITE_URL}/`,
    `${SITE_URL}/blog`,
    `${SITE_URL}/blog/the-ultimate-guide-to-menstrual-cycle-tracking-in-2026`,
    `${SITE_URL}/blog/what-is-a-menstrual-cycle`,
    `${SITE_URL}/blog/what-is-ovulation`,
    `${SITE_URL}/blog/what-is-the-fertile-window`,
    `${SITE_URL}/blog/what-is-the-luteal-phase`,
    `${SITE_URL}/blog/what-is-the-follicular-phase`
  ];

  const data = JSON.stringify({
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urlList
  });

  const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  console.log(`Pinging IndexNow for ${HOST} with ${urlList.length} URLs...`);

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      console.log(`IndexNow Response Status: ${res.statusCode}`);
      resolve(res.statusCode);
    });

    req.on('error', (error) => {
      console.error('Error pinging IndexNow:', error);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

pingIndexNow().catch(console.error);
