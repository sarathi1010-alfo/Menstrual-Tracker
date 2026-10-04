import https from 'https';
import fs from 'fs';
import path from 'path';

// Get the slugs generated today (assuming they are standard)
const articleSlugs = [
  'blog/menstrual-cycle-101-beginners-guide',
  'blog/cycle-phases-explained-follicular-ovulation-luteal',
  'blog/hormones-and-your-cycle-explained',
  'blog/how-to-track-your-cycle-step-by-step',
  'blog/understanding-your-period-normal-vs-not-normal',
  'what-is-menstrual-cycle',
  'what-is-ovulation',
  'what-is-fertile-window',
  'what-is-luteal-phase',
  'what-is-follicular-phase',
  'use-cases/cycle-tracking-teens-guide',
  'conditions/pcos-and-cycle-tracking-guide',
];

const fullUrls = articleSlugs.map(slug => `https://lunacycle.alfo.online/${slug}`);

function pingGoogle() {
  const sitemapUrl = 'https://lunacycle.alfo.online/sitemap.xml';
  const url = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;

  https.get(url, (res) => {
    console.log(`Google Ping Response Status: ${res.statusCode}`);
  }).on('error', (e) => {
    console.error(`Error pinging Google: ${e.message}`);
  });
}

function triggerIndexNow() {
  const indexNowKey = process.env.INDEXNOW_KEY || 'd8b5c90d34b14d2ba7710321ed3e4c4d'; // default mock key if none provided
  const host = 'lunacycle.alfo.online';

  const data = JSON.stringify({
    host: host,
    key: indexNowKey,
    keyLocation: `https://${host}/${indexNowKey}.txt`,
    urlList: fullUrls
  });

  const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': data.length
    }
  };

  const req = https.request(options, (res) => {
    console.log(`IndexNow Response Status: ${res.statusCode}`);
    res.on('data', d => {
        // process.stdout.write(d);
    });
  });

  req.on('error', (error) => {
    console.error(`Error triggering IndexNow: ${error.message}`);
  });

  req.write(data);
  req.end();
}

console.log('Initiating Indexing & Crawl Protocol...');
pingGoogle();
triggerIndexNow();
