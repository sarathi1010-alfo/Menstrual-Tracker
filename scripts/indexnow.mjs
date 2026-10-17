import https from 'https';

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'd8b5c90d34b14d2ba7710321ed3e4c4d';
const host = 'lunacycle.alfo.online';

console.log('Pinging IndexNow API...');
const url = `https://api.indexnow.org/indexnow?url=https://${host}/&key=${INDEXNOW_KEY}`;

https.get(url, (res) => {
  console.log(`IndexNow ping status: ${res.statusCode}`);
}).on('error', (e) => {
  console.error(`Error pinging IndexNow: ${e.message}`);
});
