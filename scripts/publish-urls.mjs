import https from 'https';

const sitemapUrl = 'https://lunacycle.alfo.online/sitemap.xml';
const indexNowKey = 'd8b5c90d34b14d2ba7710321ed3e4c4d'; // Standard 32-char MD5 format
const host = 'lunacycle.alfo.online';

const urlsToSubmit = [
  'https://lunacycle.alfo.online/blog/menstrual-cycle-101-beginners-guide',
  'https://lunacycle.alfo.online/blog/cycle-phases-explained-follicular-ovulation-luteal',
  'https://lunacycle.alfo.online/blog/hormones-and-your-cycle-explained',
  'https://lunacycle.alfo.online/blog/how-to-track-your-cycle-step-by-step',
  'https://lunacycle.alfo.online/blog/understanding-your-period-normal-vs-not-normal',
  'https://lunacycle.alfo.online/what-is-menstrual-cycle',
  'https://lunacycle.alfo.online/what-is-ovulation',
  'https://lunacycle.alfo.online/what-is-fertile-window',
  'https://lunacycle.alfo.online/what-is-luteal-phase',
  'https://lunacycle.alfo.online/what-is-follicular-phase',
  'https://lunacycle.alfo.online/use-cases/cycle-tracking-teens-guide',
  'https://lunacycle.alfo.online/conditions/pcos-and-cycle-tracking-guide',
  'https://lunacycle.alfo.online/blog',
  'https://lunacycle.alfo.online/faq'
];

async function pingGoogle() {
  console.log('Pinging Google Sitemap...');
  return new Promise((resolve) => {
    https.get(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`, (res) => {
      console.log(`Google Ping Status: ${res.statusCode}`);
      resolve(res.statusCode);
    }).on('error', (e) => {
      console.error(`Google Ping Error: ${e.message}`);
      resolve(null);
    });
  });
}

async function triggerIndexNow() {
  console.log('Triggering IndexNow...');

  const payload = JSON.stringify({
    host,
    key: indexNowKey,
    keyLocation: `https://${host}/${indexNowKey}.txt`,
    urlList: urlsToSubmit
  });

  const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  return new Promise((resolve) => {
    const req = https.request(options, (res) => {
      console.log(`IndexNow Status: ${res.statusCode}`);
      res.on('data', (d) => {
        process.stdout.write(d);
      });
      res.on('end', () => resolve(res.statusCode));
    });

    req.on('error', (e) => {
      console.error(`IndexNow Error: ${e.message}`);
      resolve(null);
    });

    req.write(payload);
    req.end();
  });
}

async function run() {
  await pingGoogle();
  await triggerIndexNow();
  console.log('\nPost-publishing scripts completed.');
}

run();
