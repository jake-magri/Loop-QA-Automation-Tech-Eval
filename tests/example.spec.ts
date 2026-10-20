import { test, expect } from '@playwright/test';

const username = process.env.DEMO_USERNAME;
const password = process.env.DEMO_PASSWORD;

if (!username || !password) {
  throw new Error(
    'Missing DEMO_USERNAME or DEMO_PASSWORD. Check your .env file.'
  );
}

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

test('implement user auth', async ({ page }) => {
  await page.goto('https://create-asana-like-pr-39y5.bolt.host/');

  await expect(
    page.getByRole('button', { name: 'Sign in' })
  ).toBeVisible();

  await page.getByRole('textbox', { name: 'Username' }).fill(username);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);

  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(
    page.getByRole('banner').getByRole('heading', {
      name: 'Web Application'
    })
  ).toBeVisible();


})