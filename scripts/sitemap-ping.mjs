import https from 'https';
import http from 'http';
import crypto from 'crypto';

function pingGoogle() {
  const url = 'https://www.google.com/ping?sitemap=https://lunacycle.alfo.online/sitemap.xml';
  https.get(url, (res) => {
    console.log(`Google Ping Status: ${res.statusCode}`);
  }).on('error', (e) => {
    console.error(`Google Ping Error: ${e.message}`);
  });
}

function pingIndexNow(urls) {
  const indexNowKey = crypto.createHash('md5').update('lunacycle.alfo.online' + Date.now()).digest('hex');
  const data = JSON.stringify({
    host: 'lunacycle.alfo.online',
    key: indexNowKey,
    urlList: urls.map(url => `https://lunacycle.alfo.online${url}`)
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

  const req = https.request(options, (res) => {
    console.log(`IndexNow Status: ${res.statusCode}`);
  });

  req.on('error', (error) => {
    console.error(`IndexNow Error: ${error.message}`);
  });

  req.write(data);
  req.end();
}

function verifyUrls(urls) {
  urls.forEach(urlPath => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: urlPath,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      console.log(`Verify ${urlPath}: ${res.statusCode}`);
    });

    req.on('error', (error) => {
      console.error(`Verify Error ${urlPath}: ${error.message}`);
    });

    req.end();
  });
}

const newUrls = [
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
  '/conditions/pcos-and-cycle-tracking-guide'
];

pingGoogle();
pingIndexNow(newUrls);

setTimeout(() => verifyUrls(newUrls), 1000);
