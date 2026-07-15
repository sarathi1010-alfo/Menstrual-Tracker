/* eslint-disable @typescript-eslint/no-require-imports */
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configuration
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cyclehub.com';
const CREDENTIALS_PATH = path.join(process.cwd(), 'gsc-service-account.json');

const sitemaps = [
  `${SITE_URL}/sitemap.xml`, // Index
  `${SITE_URL}/sitemap/core/sitemap.xml`,
  `${SITE_URL}/sitemap/blog/sitemap.xml`,
  `${SITE_URL}/sitemap/tools/sitemap.xml`
];

async function submitSitemaps() {
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error(`❌ Credentials not found at ${CREDENTIALS_PATH}`);
    console.error('Please create a service account in Google Cloud, download the JSON key, and place it here.');
    process.exit(1);
  }

  console.log(`🚀 Starting Sitemap Submission for ${SITE_URL}`);

  try {
    // Authenticate
    const auth = new google.auth.GoogleAuth({
      keyFile: CREDENTIALS_PATH,
      scopes: ['https://www.googleapis.com/auth/webmasters'],
    });

    const webmasters = google.webmasters({ version: 'v3', auth });

    // Submit each sitemap
    for (const feedpath of sitemaps) {
      console.log(`Submitting: ${feedpath}...`);
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