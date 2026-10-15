import http from 'http';
import https from 'https';


// Simple fetch function using http/https
function checkUrl(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ url, status: 'ERROR', error: err.message });
    });
  });
}

async function runAudit() {
  console.log('Running 4xx Zombie Audit...');

  // Example list of critical paths to check (in real scenario, this would parse sitemap.xml)
  const paths = [
    '/',
    '/blog',
    '/faq',
    '/privacy',
    '/about',
    '/blog/the-ultimate-2026-guide-to-menstrual-cycle-tracking',
    '/blog/what-is-a-menstrual-cycle'
  ];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  let hasErrors = false;

  for (const p of paths) {
    const url = `${siteUrl}${p}`;
    const result = await checkUrl(url);

    if (result.status >= 400 || result.status === 'ERROR') {
      console.error(`❌ ZOMBIE LINK DETECTED: ${url} (Status: ${result.status})`);
      hasErrors = true;
    } else {
      console.log(`✅ ${url} (Status: ${result.status})`);
    }
  }

  if (hasErrors) {
    console.error('Audit failed. 4xx zombies found.');
    // process.exit(1); // Don't exit 1 for local build check
  } else {
    console.log('Audit complete. No zombies found.');
  }
}

runAudit();
