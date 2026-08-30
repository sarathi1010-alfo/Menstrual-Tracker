import http from 'http';
import https from 'https';

const TARGET_HOST = 'lunacycle.alfo.online';
const LOCAL_PORT = 3000;
const SITEMAP_URL = `https://${TARGET_HOST}/sitemap.xml`;
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'dummy_key';

const newlyGeneratedUrls = [
  '/blog/menstrual-cycle-101-beginners-guide',
  '/blog/cycle-phases-explained-follicular-ovulation-luteal',
  '/blog/hormones-and-your-cycle-explained',
  '/blog/how-to-track-your-cycle-step-by-step',
  '/blog/understanding-your-period-normal-vs-not-normal',
  '/what-is-menstrual-cycle',
  '/what-is-ovulation',
  '/what-is-fertile-window',
  '/what-is-luteal-phase',
  '/what-is-follicular-phase',
  '/use-cases/cycle-tracking-teens-guide',
  '/conditions/pcos-and-cycle-tracking-guide',
];

async function pingGoogle() {
  return new Promise((resolve, reject) => {
    https.get(`https://www.google.com/ping?sitemap=${SITEMAP_URL}`, (res) => {
      console.log(`Google Ping Status: ${res.statusCode}`);
      resolve(res.statusCode);
    }).on('error', (err) => {
      console.error(`Google Ping Error: ${err.message}`);
      reject(err);
    });
  });
}

async function triggerIndexNow(urls) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      host: TARGET_HOST,
      key: INDEXNOW_KEY,
      urlList: urls.map(url => `https://${TARGET_HOST}${url}`)
    });

    const req = https.request({
      hostname: 'api.indexnow.org',
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    }, (res) => {
      console.log(`IndexNow Trigger Status: ${res.statusCode}`);
      resolve(res.statusCode);
    });

    req.on('error', (error) => {
      console.error(`IndexNow Trigger Error: ${error.message}`);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

async function testLocalUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:${LOCAL_PORT}${url}`, (res) => {
      resolve(res.statusCode);
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function main() {
  console.log('Starting post-publish checks...');

  // 1. Ping Google
  try {
    await pingGoogle();
  } catch (e) {
    console.error('Failed to ping Google:', e);
  }

  // 2. Trigger IndexNow
  try {
    await triggerIndexNow(newlyGeneratedUrls);
  } catch (e) {
    console.error('Failed to trigger IndexNow:', e);
  }

  // 3. Test pages locally if server is running
  let allPassed = true;
  for (const url of newlyGeneratedUrls) {
    try {
      const status = await testLocalUrl(url);
      if (status === 200) {
        console.log(`✓ ${url} returned 200 OK`);
      } else {
        console.error(`✗ ${url} returned ${status}`);
        allPassed = false;
      }
    } catch (e) {
      console.error(`✗ Could not reach ${url}. Is the server running?`);
      allPassed = false;
      break; // Exit loop if server is down
    }
  }

  if (allPassed) {
    console.log('All local URLs returned 200 OK.');
  } else {
    console.warn('Some tests failed or server is not running.');
  }
}

main();
