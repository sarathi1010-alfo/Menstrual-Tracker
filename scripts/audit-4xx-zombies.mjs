import http from 'http';
import https from 'https';

async function checkUrl(url) {
  const client = url.startsWith('https') ? https : http;
  return new Promise((resolve) => {
    client.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ url, error: err.message });
    });
  });
}

async function audit() {
  const urls = [
    'http://localhost:3000/blog',
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
    'http://localhost:3000/faq'
  ];

  console.log('Starting 4xx Zombie Audit...');
  let hasErrors = false;

  for (const url of urls) {
    const result = await checkUrl(url);
    if (result.status >= 400 || result.error) {
      console.error(`ERROR: ${url} returned ${result.status || result.error}`);
      hasErrors = true;
    } else {
      console.log(`OK: ${url} (${result.status})`);
    }
  }

  if (hasErrors) {
    console.error('Audit failed: One or more URLs returned an error.');
    process.exit(1);
  } else {
    console.log('Audit completed successfully. All pages are returning 2xx/3xx.');
  }
}

audit();
