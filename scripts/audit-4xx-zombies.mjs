import https from 'https';

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => {
      resolve({ url, status: 'error', message: e.message });
    });
  });
}

async function runAudit() {
  const urls = [
    "https://lunacycle.alfo.online/blog/menstrual-cycle-101-beginners-guide",
    "https://lunacycle.alfo.online/blog/cycle-phases-explained-follicular-ovulation-luteal",
    "https://lunacycle.alfo.online/blog/hormones-and-your-cycle-explained",
    "https://lunacycle.alfo.online/blog/how-to-track-your-cycle-step-by-step",
    "https://lunacycle.alfo.online/blog/understanding-your-period-normal-vs-not-normal",
    "https://lunacycle.alfo.online/what-is-menstrual-cycle",
    "https://lunacycle.alfo.online/what-is-ovulation",
    "https://lunacycle.alfo.online/what-is-fertile-window",
    "https://lunacycle.alfo.online/what-is-luteal-phase",
    "https://lunacycle.alfo.online/what-is-follicular-phase",
    "https://lunacycle.alfo.online/use-cases/cycle-tracking-teens-guide",
    "https://lunacycle.alfo.online/conditions/pcos-and-cycle-tracking-guide"
  ];

  console.log('Auditing URLs...');
  for (const url of urls) {
     const result = await checkUrl(url);
     console.log(`[${result.status}] ${result.url}`);
  }
}

runAudit();
