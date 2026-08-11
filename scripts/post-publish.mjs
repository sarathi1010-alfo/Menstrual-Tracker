import https from 'https';

const domain = 'lunacycle.alfo.online';
const sitemapUrl = `https://${domain}/sitemap.xml`;

// Ping Google
https.get(`https://www.google.com/ping?sitemap=${sitemapUrl}`, (res) => {
  console.log(`Google ping status: ${res.statusCode}`);
}).on('error', (e) => {
  console.error(`Error pinging Google: ${e.message}`);
});

// Trigger IndexNow (mock - missing key)
const indexNowData = JSON.stringify({
  host: domain,
  key: process.env.INDEXNOW_KEY || 'MOCK_KEY',
  urlList: [
    `https://${domain}/blog/menstrual-cycle-101-beginners-guide`,
    `https://${domain}/blog/cycle-phases-explained-follicular-ovulation-luteal`,
    `https://${domain}/blog/hormones-and-your-cycle-explained`,
    `https://${domain}/blog/how-to-track-your-cycle-step-by-step`,
    `https://${domain}/blog/understanding-your-period-normal-vs-not-normal`,
    `https://${domain}/what-is-menstrual-cycle`,
    `https://${domain}/what-is-ovulation`,
    `https://${domain}/what-is-fertile-window`,
    `https://${domain}/what-is-luteal-phase`,
    `https://${domain}/what-is-follicular-phase`,
    `https://${domain}/use-cases/cycle-tracking-teens-guide`,
    `https://${domain}/conditions/pcos-and-cycle-tracking-guide`
  ]
});

const indexNowOptions = {
  hostname: 'api.indexnow.org',
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(indexNowData)
  }
};

const req = https.request(indexNowOptions, (res) => {
  console.log(`IndexNow status: ${res.statusCode}`);
});

req.on('error', (e) => {
  console.error(`Error triggering IndexNow: ${e.message}`);
});

req.write(indexNowData);
req.end();
