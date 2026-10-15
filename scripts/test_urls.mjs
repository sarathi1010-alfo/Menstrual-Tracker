import http from 'http';

const urls = [
  'http://localhost:3000/blog/menstrual-cycle-101-beginners-guide',
  'http://localhost:3000/blog/cycle-phases-explained-follicular-ovulation-luteal',
  'http://localhost:3000/blog/hormones-and-your-cycle-explained',
  'http://localhost:3000/blog/how-to-track-your-cycle-step-by-step',
  'http://localhost:3000/blog/understanding-your-period-normal-vs-not-normal',
  'http://localhost:3000/what-is-menstrual-cycle',
  'http://localhost:3000/what-is-ovulation',
  'http://localhost:3000/what-is-fertile-window',
  'http://localhost:3000/what-is-luteal-phase',
  'http://localhost:3000/what-is-follicular-phase',
  'http://localhost:3000/use-cases/cycle-tracking-teens-guide',
  'http://localhost:3000/conditions/pcos-and-cycle-tracking-guide',
  'http://localhost:3000/blog',
  'http://localhost:3000/faq',
  'http://localhost:3000/sitemap.xml',
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ url, status: 'Error: ' + err.message });
    });
  });
}

async function testAll() {
  console.log('Testing URLs...');
  let hasErrors = false;

  for (const url of urls) {
    const result = await checkUrl(url);
    if (result.status === 200) {
      console.log(`✅ 200 OK: ${result.url}`);
    } else {
      console.error(`❌ ${result.status}: ${result.url}`);
      hasErrors = true;
    }
  }

  if (hasErrors) {
    process.exit(1);
  } else {
    console.log('All URLs returned 200 OK!');
    process.exit(0);
  }
}

// Give server time to start up before checking
setTimeout(testAll, 1000);
