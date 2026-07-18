const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3000/blog');
  await page.screenshot({ path: 'blog.png', fullPage: true });

  await page.goto('http://localhost:3000/blog/menstrual-cycle-101-beginners-guide');
  await page.screenshot({ path: 'blog_post.png', fullPage: true });

  await browser.close();
})();
