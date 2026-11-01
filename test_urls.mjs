import http from 'http';

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
  'http://localhost:3000/conditions/pcos-and-cycle-tracking-guide'
];

async function checkUrls() {
  let hasError = false;
  for (const url of urls) {
    await new Promise((resolve) => {
      http.get(url, (res) => {
        if (res.statusCode !== 200) {
          console.error(`Error: ${url} returned ${res.statusCode}`);
          hasError = true;
        } else {
          console.log(`Success: ${url} returned 200 OK`);
        }
        res.resume(); // consume response data to free up memory
        resolve(null);
      }).on('error', (err) => {
        console.error(`Error fetching ${url}:`, err.message);
        hasError = true;
        resolve(null);
      });
    });
  }

  if (hasError) {
    process.exit(1);
  } else {
    console.log('All URLs returned 200 OK');
  }
}

checkUrls();
