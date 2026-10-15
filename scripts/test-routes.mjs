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
  '/conditions/pcos-and-cycle-tracking-guide',
  '/blog',
  '/sitemap.xml'
];

async function checkRoute(route) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${route}`, (res) => {
      if (res.statusCode !== 200) {
        console.error(`❌ ${route} returned status ${res.statusCode}`);
        resolve(false);
      } else {
        console.log(`✅ ${route} returned 200 OK`);
        resolve(true);
      }
    }).on('error', (err) => {
      console.error(`❌ ${route} failed with error: ${err.message}`);
      resolve(false);
    });
  });
}

async function main() {
  console.log('Testing routes...');
  let allPassed = true;
  for (const route of routes) {
    const passed = await checkRoute(route);
    if (!passed) allPassed = false;
  }
  if (allPassed) {
    console.log('🎉 All routes passed!');
    process.exit(0);
  } else {
    console.error('💥 Some routes failed!');
    process.exit(1);
  }
}

main();
