import http from 'http';

const urls = [
  '/blog',
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

const checkUrl = (url) => {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${url}`, (res) => {
      if (res.statusCode === 200) {
        console.log(`[OK] 200 - ${url}`);
        resolve();
      } else {
        console.error(`[FAIL] ${res.statusCode} - ${url}`);
        reject(new Error(`Status ${res.statusCode}`));
      }
    }).on('error', (err) => {
      console.error(`[ERROR] ${err.message} - ${url}`);
      reject(err);
    });
  });
};

async function testAll() {
  console.log('Waiting a bit for server to be fully ready...');
  await new Promise(resolve => setTimeout(resolve, 2000));

  let allPass = true;
  for (const url of urls) {
    try {
      await checkUrl(url);
    } catch (e) {
      allPass = false;
    }
  }

  if (allPass) {
    console.log('All URLs returned 200 OK!');
    process.exit(0);
  } else {
    console.error('Some URLs failed!');
    process.exit(1);
  }
}

testAll();
