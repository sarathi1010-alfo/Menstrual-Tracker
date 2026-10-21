import { test, expect } from '@playwright/test';

const urls = [
  '/blog',
  '/blog/menstrual-cycle-101-beginners-guide',
  '/what-is-menstrual-cycle',
  '/use-cases/cycle-tracking-teens-guide',
  '/conditions/pcos-and-cycle-tracking-guide',
  '/faq'
];

test.describe('Check new pages for 200 OK', () => {
  for (const url of urls) {
    test(`Page ${url} should load successfully`, async ({ page }) => {
      const response = await page.goto(`http://localhost:3000${url}`);
      expect(response?.status()).toBe(200);
    });
  }
});
