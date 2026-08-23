import https from 'https';

const domain = 'lunacycle.alfo.online';
const indexNowKey = process.env.INDEXNOW_KEY || 'fake-key-for-testing';

const newUrls = [
  'https://lunacycle.alfo.online/blog/menstrual-cycle-101-beginners-guide',
  'https://lunacycle.alfo.online/blog/cycle-phases-explained-follicular-ovulation-luteal',
  'https://lunacycle.alfo.online/blog/hormones-and-your-cycle-explained',
  'https://lunacycle.alfo.online/blog/how-to-track-your-cycle-step-by-step',
  'https://lunacycle.alfo.online/blog/understanding-your-period-normal-vs-not-normal',
  'https://lunacycle.alfo.online/what-is-menstrual-cycle',
  'https://lunacycle.alfo.online/what-is-ovulation',
  'https://lunacycle.alfo.online/what-is-fertile-window',
  'https://lunacycle.alfo.online/what-is-luteal-phase',
  'https://lunacycle.alfo.online/what-is-follicular-phase',
  'https://lunacycle.alfo.online/use-cases/cycle-tracking-teens-guide',
  'https://lunacycle.alfo.online/conditions/pcos-and-cycle-tracking-guide',
];

async function checkUrl(url) {
  // In a real environment, we'd ping the actual live site.
  // Since we are running this post-build before deploy, we'll just log it.
  console.log(`[Dry Run] Would verify HTTP 200 OK for: ${url}`);
  return true;
}

async function pingGoogle() {
  const sitemapUrl = `https://${domain}/sitemap.xml`;
  const pingUrl = `https://www.google.com/ping?sitemap=${sitemapUrl}`;
  console.log(`[Dry Run] Would ping Google: ${pingUrl}`);
}

async function triggerIndexNow() {
  const payload = JSON.stringify({
    host: domain,
    key: indexNowKey,
    keyLocation: `https://${domain}/${indexNowKey}.txt`,
    urlList: newUrls
  });

  console.log(`[Dry Run] Would send IndexNow POST request to api.indexnow.org for ${newUrls.length} URLs`);
}

async function run() {
  console.log('Starting Post-Publishing Protocol...');

  let allOk = true;
  for (const url of newUrls) {
    const ok = await checkUrl(url);
    if (!ok) allOk = false;
  }

  if (allOk) {
    console.log('All URLs verified successfully (Dry Run). Proceeding to index.');
    await pingGoogle();
    await triggerIndexNow();
    console.log('Post-Publishing Protocol Complete.');
  } else {
    console.error('URL Verification failed for one or more URLs. Aborting indexing.');
  }
}

run().catch(console.error);
