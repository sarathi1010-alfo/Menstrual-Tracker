import https from 'https';

async function pingIndexNow() {
  const host = 'api.indexnow.org';
  const key = process.env.INDEXNOW_KEY || 'LUNACYCLE_DEFAULT_KEY_REPLACE_ME';
  const siteUrl = 'https://lunacycle.alfo.online';

  const data = JSON.stringify({
    "host": siteUrl.replace('https://', ''),
    "key": key,
    "keyLocation": `${siteUrl}/${key}.txt`,
    "urlList": [
      `${siteUrl}/blog`,
      `${siteUrl}/what-is-a-menstrual-cycle`,
      `${siteUrl}/what-is-ovulation`
      // Typically we would read from sitemap to populate this list dynamically
    ]
  });

  const options = {
    hostname: host,
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': data.length
    }
  };

  console.log(`Pinging IndexNow API at ${host}...`);

  const req = https.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);

    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (error) => {
    console.error(`IndexNow Error: ${error.message}`);
  });

  req.write(data);
  req.end();
}

pingIndexNow();
