/* eslint-disable @typescript-eslint/no-require-imports */
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const https = require('https');
require('dotenv').config();

// Configuration
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://lunacycle.alfo.online';
const CREDENTIALS_PATH = path.join(process.cwd(), 'gsc-service-account.json');
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'YOUR_INDEXNOW_KEY';

const sitemaps = [
  `${SITE_URL}/sitemap.xml`, // Index
];

async function pingIndexNow(url) {
  const indexNowUrl = `https://api.indexnow.org/indexnow?url=${encodeURIComponent(url)}&key=${INDEXNOW_KEY}`;
  return new Promise((resolve) => {
    https.get(indexNowUrl, (res) => {
      if (res.statusCode === 200 || res.statusCode === 202) {
        console.log(`✅ IndexNow pinged successfully for ${url}`);
        resolve();
      } else {
        console.error(`❌ IndexNow ping failed for ${url} with status ${res.statusCode}`);
        resolve();
      }
    }).on('error', (e) => {
      console.error(`❌ IndexNow ping error for ${url}: ${e.message}`);
      resolve();
    });
  });
}

async function submitSitemaps() {
  console.log(`🚀 Starting Sitemap Submission for ${SITE_URL}`);

  // Pinging IndexNow and Google
  for (const feedpath of sitemaps) {
    console.log(`Pinging search engines for: ${feedpath}...`);

    // Ping Google
    const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(feedpath)}`;
    https.get(googlePingUrl, (res) => {
      if (res.statusCode === 200) {
        console.log(`✅ Google pinged successfully for ${feedpath}`);
      } else {
        console.log(`⚠️ Google ping returned status ${res.statusCode}`);
      }
    });

    // IndexNow
    await pingIndexNow(feedpath);
  }

  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.log(`⚠️ Credentials not found at ${CREDENTIALS_PATH}. Skipping Google Webmasters API submission.`);
    console.log('🎉 Sitemap pinging complete.');
    return;
  }

  try {
    // Authenticate
    const auth = new google.auth.GoogleAuth({
      keyFile: CREDENTIALS_PATH,
      scopes: ['https://www.googleapis.com/auth/webmasters'],
    });

    const webmasters = google.webmasters({ version: 'v3', auth });

    // Submit each sitemap
    for (const feedpath of sitemaps) {
      console.log(`Submitting via Webmasters API: ${feedpath}...`);
      try {
        await webmasters.sitemaps.submit({
          siteUrl: SITE_URL,
          feedpath: feedpath,
        });
        console.log(`✅ Successfully submitted: ${feedpath}`);
      } catch (error) {
        console.error(`❌ Failed to submit: ${feedpath}`);
        console.error(`Error details: ${error.message}`);
      }

      // Delay to respect API rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('🎉 Sitemap submission complete.');
  } catch (error) {
    console.error('❌ Critical failure during authentication or API setup.');
    console.error(error);
    process.exit(1);
  }
}

submitSitemaps();
