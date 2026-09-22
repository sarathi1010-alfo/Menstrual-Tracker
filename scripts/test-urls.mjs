import http from 'http';

const urlsToTest = [
  '/',
  '/blog',
  '/features',
  '/blog/menstrual-cycle-101-beginners-guide',
  '/what-is-menstrual-cycle',
  '/use-cases/cycle-tracking-teens-guide',
  '/conditions/pcos-and-cycle-tracking-guide',
];

const checkUrl = (path) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'GET',
    };

    const req = http.request(options, (res) => {
      if (res.statusCode === 200) {
        console.log(`✅ [200] ${path}`);
        resolve();
      } else {
        console.error(`❌ [${res.statusCode}] ${path}`);
        reject(new Error(`Status Code: ${res.statusCode} for ${path}`));
      }
    });

    req.on('error', (error) => {
      console.error(`❌ [ERROR] ${path} : ${error.message}`);
      reject(error);
    });

    req.end();
  });
};

async function runTests() {
  let hasError = false;

  // Wait a moment for server to fully initialize
  console.log("Waiting 3 seconds for server to initialize...");
  await new Promise(r => setTimeout(r, 3000));

  console.log('Running URL Tests...');
  for (const path of urlsToTest) {
    try {
      await checkUrl(path);
    } catch (e) {
      hasError = true;
    }
  }

  if (hasError) {
    console.error('Some tests failed.');
    process.exit(1);
  } else {
    console.log('All tests passed!');
  }
}

runTests();
