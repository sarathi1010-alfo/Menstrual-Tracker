import http from 'http';

const routes = [
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

async function checkRoute(route) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${route}`, (res) => {
      if (res.statusCode === 200) {
        console.log(`✅ OK: ${route}`);
        resolve();
      } else {
        console.error(`❌ Failed: ${route} (Status: ${res.statusCode})`);
        reject(new Error(`Failed: ${route}`));
      }
    }).on('error', (err) => {
      console.error(`❌ Error on ${route}:`, err.message);
      reject(err);
    });
  });
}

async function run() {
  console.log("Checking 12 new routes...");
  for (const route of routes) {
    await checkRoute(route);
  }
  console.log("All routes verified successfully.");
}

run().catch(() => process.exit(1));
