import http from 'http';

// Checking against localhost to verify new dynamic routes actually resolve
// to 200 OK before a real deployment to catch 4xx "zombies".

const HOST = 'localhost';
const PORT = 3000;

const urlsToCheck = [
  '/blog',
  '/features',
  '/blog/ultimate-guide-menstrual-cycle-tracking',
  '/what-is-a-menstrual-cycle',
  '/what-is-ovulation',
  '/what-is-the-fertile-window',
  '/what-is-the-luteal-phase',
  '/what-is-the-follicular-phase'
];

async function checkUrl(path) {
  const options = {
    hostname: HOST,
    port: PORT,
    path: path,
    method: 'GET'
  };

  return new Promise((resolve) => {
    const req = http.request(options, (res) => {
      resolve({ path, statusCode: res.statusCode });
    });

    req.on('error', (e) => {
      resolve({ path, statusCode: 'ERROR', error: e.message });
    });

    req.end();
  });
}

async function runAudit() {
  console.log('--- Starting 4xx Zombie Audit ---');
  let hasErrors = false;

  for (const path of urlsToCheck) {
    const result = await checkUrl(path);
    if (result.statusCode !== 200) {
      console.error(`[FAIL] ${result.path} returned ${result.statusCode} ${result.error ? `(${result.error})` : ''}`);
      hasErrors = true;
    } else {
      console.log(`[PASS] ${result.path} - 200 OK`);
    }
  }

  if (hasErrors) {
    console.error('--- Audit Completed with Errors: Found 4xx/5xx responses ---');
    process.exit(1);
  } else {
    console.log('--- Audit Completed Successfully: All URLs 200 OK ---');
  }
}

runAudit();
