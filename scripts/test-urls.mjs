import http from 'http';

const urls = [
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

async function checkUrl(path) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      resolve({ path, status: res.statusCode });
    }).on('error', (e) => {
      resolve({ path, status: e.message });
    });
  });
}

async function run() {
  console.log('Waiting for dev server to boot...');
  await new Promise(r => setTimeout(r, 3000));

  let allGood = true;
  for (const url of urls) {
    const { path, status } = await checkUrl(url);
    if (status !== 200) {
      console.error(`❌ ${path} returned ${status}`);
      allGood = false;
    } else {
      console.log(`✅ ${path} returned 200 OK`);
    }
  }

  if (allGood) {
    console.log('All URLs checked and returned 200 OK.');
    process.exit(0);
  } else {
    process.exit(1);
  }
}

run();
