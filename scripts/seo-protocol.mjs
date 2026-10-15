import https from 'https';

const domain = 'https://lunacycle.alfo.online';
const sitemapUrl = `${domain}/sitemap.xml`;

const newUrls = [
  '/blog/menstrual-cycle-101-beginners-guide',
  '/blog/cycle-phases-explained-follicular-ovulation-luteal',
  '/blog/hormones-and-your-cycle-explained',
  '/blog/how-to-track-your-cycle-step-by-step',
  '/blog/understanding-your-period-normal-vs-not-normal',
  '/blog/what-is-menstrual-cycle',
  '/blog/what-is-ovulation',
  '/blog/what-is-fertile-window',
  '/blog/what-is-luteal-phase',
  '/blog/what-is-follicular-phase',
  '/blog/cycle-tracking-teens-guide',
  '/blog/pcos-and-cycle-tracking-guide',
].map(path => `${domain}${path}`);

// Ping Google
https.get(`https://www.google.com/ping?sitemap=${sitemapUrl}`, (res) => {
  console.log(`Google Ping Status: ${res.statusCode}`);
}).on('error', (e) => {
  console.error(`Error pinging Google: ${e.message}`);
});

// Mock IndexNow
console.log('IndexNow ping skipped in execution context, mocking success.');
console.log(`Mocking POST to IndexNow with URLs: ${newUrls.join(', ')}`);
