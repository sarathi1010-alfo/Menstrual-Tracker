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
  '/faq'
];

async function checkRoute(route) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${route}`, (res) => {
      if (res.statusCode === 200) {
        console.log(`✅ [200] ${route}`);
        resolve();
      } else {
        console.error(`❌ [${res.statusCode}] ${route}`);
        reject(new Error(`Failed with status ${res.statusCode}`));
      }
    }).on('error', (e) => {
      console.error(`❌ [ERROR] ${route} : ${e.message}`);
      reject(e);
    });
  });
}

async function runTests() {
  let allPassed = true;
  for (const route of routes) {
    try {
      await checkRoute(route);
    } catch (e) {
      allPassed = false;
    }
  }
  if (!allPassed) {
    process.exit(1);
  } else {
    console.log("All routes returned 200 OK.");
  }
}

runTests();
