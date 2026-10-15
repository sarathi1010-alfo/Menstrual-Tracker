import http from 'http';

function checkUrl(path) {
  return new Promise((resolve) => {
    http.get('http://localhost:3000' + path, (res) => {
      resolve({ path, status: res.statusCode });
    }).on('error', (e) => {
      resolve({ path, status: 'error', message: e.message });
    });
  });
}

async function run() {
  const paths = [
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

  for (const path of paths) {
    const result = await checkUrl(path);
    console.log(result);
  }
}

run();
