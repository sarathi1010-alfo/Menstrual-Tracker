import https from 'https';

const DOMAIN = 'https://lunacycle.alfo.online';

const URLS_TO_TEST = [
  `${DOMAIN}/`,
  `${DOMAIN}/blog`,
  `${DOMAIN}/features`,
  `${DOMAIN}/about`,
  `${DOMAIN}/faq`,
  `${DOMAIN}/blog/ultimate-guide-to-menstrual-cycle-tracking-in-2026`,
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => {
      resolve({ url, status: `Error: ${e.message}` });
    });
  });
}

async function main() {
  console.log('Starting 4xx Zombie Audit...');
  let hasErrors = false;

  for (const url of URLS_TO_TEST) {
    const result = await checkUrl(url);
    if (result.status >= 400 && result.status < 500) {
       console.error(`[ZOMBIE 4xx DETECTED] ${result.url} - Status: ${result.status}`);
       hasErrors = true;
    } else {
       console.log(`[OK] ${result.url} - Status: ${result.status}`);
    }
  }

  if (hasErrors) {
     console.error('Audit failed: 4xx errors found.');
     process.exit(1);
  } else {
     console.log('Audit passed: No 4xx zombie pages detected.');
  }
}

main();
