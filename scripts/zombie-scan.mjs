import https from 'https';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://lunacycle.alfo.online';

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => {
      resolve({ url, status: 500, error: e.message });
    });
  });
}

async function runScan() {
  console.log(`Starting 4xx Zombie Scan for ${SITE_URL}...`);
  const routesToTest = [
    '/',
    '/about',
    '/faq',
    '/privacy',
    '/blog',
    '/blog/the-ultimate-guide-to-menstrual-cycle-tracking-in-2026',
    '/blog/what-is-a-menstrual-cycle'
  ];

  const results = [];
  for (const route of routesToTest) {
    const fullUrl = `${SITE_URL}${route}`;
    const result = await checkUrl(fullUrl);
    results.push(result);
    console.log(`[${result.status}] ${result.url}`);
    if (result.status >= 400 && result.status < 500) {
      console.warn(`WARNING: 4xx Zombie Link Detected: ${result.url}`);
    }
  }

  const zombies = results.filter(r => r.status >= 400 && r.status < 500);
  if (zombies.length > 0) {
    console.error(`Scan complete. Found ${zombies.length} 4xx links.`);
  } else {
    console.log('Scan complete. No 4xx zombie links found.');
  }
}

runScan();
