import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Wait a moment for the dev server to be fully ready
  await new Promise(r => setTimeout(r, 2000));

  console.log("Taking screenshot of Blog Landing (/blog)...");
  await page.goto('http://localhost:3000/blog');
  await page.screenshot({ path: 'blog-landing.png', fullPage: true });

  console.log("Taking screenshot of Cluster Article (/blog/menstrual-cycle-101-beginners-guide)...");
  await page.goto('http://localhost:3000/blog/menstrual-cycle-101-beginners-guide');
  await page.screenshot({ path: 'cluster-article.png', fullPage: true });

  console.log("Taking screenshot of Micro-Answer (/what-is-menstrual-cycle)...");
  await page.goto('http://localhost:3000/what-is-menstrual-cycle');
  await page.screenshot({ path: 'micro-answer.png', fullPage: true });

  console.log("Taking screenshot of Condition Deep-Dive (/conditions/pcos-and-cycle-tracking-guide)...");
  await page.goto('http://localhost:3000/conditions/pcos-and-cycle-tracking-guide');
  await page.screenshot({ path: 'condition.png', fullPage: true });

  await browser.close();
  console.log("Done.");
})();
