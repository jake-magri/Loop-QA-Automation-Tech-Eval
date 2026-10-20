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

  // Locate the To Do column by its dynamic heading.
  const todoHeading = page.getByRole('heading', {
    name: /^To Do \(\d+\)$/
  });

  // Fail early if the To Do heading is not visible.
  await expect(
    todoHeading,
    'Expected the To Do column heading to be visible after login.'
  ).toBeVisible();

  // Find the column container containing the heading and task cards.
  const todoColumn = todoHeading.locator('..');

  // Locate task heading within the To Do column.
  const taskHeading = todoColumn.getByRole('heading', {
    name: 'Implement user authentication',
    exact: true
  });

  // Fail if the task card is not found in the To Do column.
  await expect(
    taskHeading,
    'Expected "Implement user authentication" to appear in the To Do column.'
  ).toBeVisible();

  // Locate task card through DOM traversal. 
  // (tradeoff analyzed: codegen fragile identifiers vs DOM traversal and strong semantic identifiers)
  const taskCard = taskHeading.locator('..');

  // removed, determined redundant
  // await expect(
  //   taskCard,
  //   'Expected the task card for "Implement user authentication" to be visible.'
  // ).toBeVisible();


  // TODO: Extract task titles and required tags into test data
  // so the same verification logic can be reused across all six cases.

  // Fail if 'Feature' tag is not visible inside the To Do task card
  await expect(
    taskCard.getByText('Feature', { exact: true }),
    'Expected the task to have the Feature tag.'
  ).toBeVisible();

  // Fail if 'High Priority' tag is not visible inside the To Do task card
  await expect(
    taskCard.getByText('High Priority', { exact: true }),
    'Expected the task to have the High Priority tag.'
  ).toBeVisible();

})