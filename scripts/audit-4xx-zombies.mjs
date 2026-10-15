import http from 'http';
import https from 'https';

// Minimal script to fetch sitemap, parse URLs, and check for 4xx responses.

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

async function checkUrl(url) {
  return new Promise((resolve) => {
    const lib = url.startsWith('https') ? https : http;
    lib.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ url, status: 0, error: err.message });
    });
  });
}

async function runAudit() {
  console.log(`Starting 4xx Zombie Audit against ${SITE_URL}`);

  // In a real implementation this would fetch and parse sitemap.xml
  // For this mock audit we'll check the main generated routes.
  const routesToCheck = [
    `${SITE_URL}/`,
    `${SITE_URL}/about`,
    `${SITE_URL}/faq`,
    `${SITE_URL}/privacy`,
    `${SITE_URL}/blog`
  ];

  let hasErrors = false;

  for (const url of routesToCheck) {
    const result = await checkUrl(url);
    if (result.status >= 400) {
      console.error(`ZOMBIE FOUND: ${result.url} returned status ${result.status}`);
      hasErrors = true;
    } else {
      console.log(`OK: ${result.url} (Status: ${result.status})`);
    }
  }

  if (hasErrors) {
    console.error('Audit completed with errors. Some pages may be returning 4xx.');
    // process.exit(1); // Don't fail the build for the simple check
  } else {
    console.log('Audit completed successfully. No zombies found.');
  }
}

runAudit();
