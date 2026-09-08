import http from 'http';

const sitemapUrls = [
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

async function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${url}`, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ url, status: err.message });
    });
  });
}

async function run() {
  console.log('Testing URLs...');
  let allPass = true;
  for (const url of sitemapUrls) {
    const result = await checkUrl(url);
    console.log(`${result.url} - ${result.status}`);
    if (result.status !== 200) {
      allPass = false;
    }
  }

  if (allPass) {
    console.log('All URLs returned 200 OK.');
  } else {
    console.error('Some URLs failed.');
    process.exit(1);
  }
}

run();
