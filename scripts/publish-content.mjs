import https from 'https';

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'd8b5c90d34b14d2ba7710321ed3e4c4d';
const HOST = 'lunacycle.alfo.online';

const urls = [
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
  'https://lunacycle.alfo.online/conditions/pcos-and-cycle-tracking',
  'https://lunacycle.alfo.online/faq',
  'https://lunacycle.alfo.online/blog'
];

async function pingIndexNow() {
  const payload = JSON.stringify({
    host: HOST,
    key: INDEXNOW_KEY,
    urlList: urls
  });

  const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': payload.length
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('✅ IndexNow ping successful:', res.statusCode);
          resolve(data);
        } else {
          console.error(`❌ IndexNow ping failed with status ${res.statusCode}:`, data);
          reject(new Error(`IndexNow failed: ${res.statusCode}`));
        }
      });
    });

    req.on('error', (e) => {
      console.error('❌ Error sending IndexNow request:', e);
      reject(e);
    });

    req.write(payload);
    req.end();
  });
}

async function run() {
  try {
    await pingIndexNow();
    console.log('Post-publishing indexing protocol complete.');
  } catch (error) {
    console.error('Publishing script failed:', error);
  }
}

run();
