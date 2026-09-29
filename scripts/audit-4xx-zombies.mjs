import http from 'http';
import https from 'https';

const HOST = 'lunacycle.alfo.online';
const mockNewUrls = [
  `https://${HOST}/blog/ultimate-guide-menstrual-cycle-tracking-2026`,
  `https://${HOST}/what-is-a-menstrual-cycle`,
  `https://${HOST}/what-is-ovulation`,
  `https://${HOST}/what-is-the-fertile-window`,
  `https://${HOST}/what-is-the-luteal-phase`,
  `https://${HOST}/what-is-the-follicular-phase`,
];

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => {
      resolve({ url, status: 'Error', message: e.message });
    });
  });
}

async function runAudit() {
  console.log("Running Week 4 Zombie Audit...");
  const results = await Promise.all(mockNewUrls.map(checkUrl));
  let hasErrors = false;

  results.forEach(res => {
    if (res.status >= 400 || res.status === 'Error') {
      console.error(`❌ ZOMBIE FOUND: ${res.url} returned status ${res.status}`);
      hasErrors = true;
    } else {
      console.log(`✅ OK: ${res.url} returned status ${res.status}`);
    }
  });

  if (hasErrors) {
    console.error("Audit failed. 4xx zombies detected.");
    // process.exit(1);
  } else {
    console.log("Audit passed. No 4xx zombies found.");
  }
}

runAudit();
