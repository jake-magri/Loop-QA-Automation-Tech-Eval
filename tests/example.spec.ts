import { test, expect } from '@playwright/test';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const tasks = require('../test-data/tasks.json') as {
  application: string;
  title: string;
  status: string;
  tags: string[];
}[];

const username = process.env.DEMO_USERNAME;
const password = process.env.DEMO_PASSWORD;

if (!username || !password) {
  throw new Error(
    'Missing DEMO_USERNAME or DEMO_PASSWORD. Check your .env file.'
  );
}

for (const task of tasks) {
  test(`verify "${task.title}" in ${task.status}`, async ({ page }) => {
    await page.goto('https://create-asana-like-pr-39y5.bolt.host/');

    await expect(
      page.getByRole('button', { name: 'Sign in' })
    ).toBeVisible();

    await page.getByRole('textbox', { name: 'Username' }).fill(username);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);

    await page.getByRole('button', { name: 'Sign in' }).click();

    // Tradeoff: Codegen exposed "Mobile Application Native"; use the more stable
    // "Mobile Application" name to avoid coupling to the subheading, assuming uniqueness.
    if (task.application === 'Mobile Application') {
      await page.getByRole('button', {
        name: 'Mobile Application'
      }).click();
    }

    await expect(
      page.getByRole('banner').getByRole('heading', {
        name: task.application,
        exact: true
      })
    ).toBeVisible();

    // Match the status from JSON while allowing the task count to change.
    // Tradeoff: regex handles dynamic counts more robustly than hardcoding
    // a heading such as "To Do (2)", which could change as tasks are added.

    // Improvement to Consider: if status names ever contain regex-special characters, 
    // interpolating them directly could cause unintended matching
    const statusHeading = page.getByRole('heading', {
      name: new RegExp(`^${task.status} \\(\\d+\\)$`)
    });

    await expect(
      statusHeading,
      `Expected the "${task.status}" column to be visible.`
    ).toBeVisible();

    
    const statusColumn = statusHeading.locator('..');

    const taskHeading = statusColumn.getByRole('heading', {
      name: task.title,
      exact: true
    });

    await expect(
      taskHeading,
      `Expected "${task.title}" to appear in the "${task.status}" column.`
    ).toBeVisible();

    // Tradeoff: prefer semantic role/name locators over brittle generated selectors;
    // use parent traversal to scope tag assertions to the task card.
    const taskCard = taskHeading.locator('..');

    // Data-driven assertions: iterate over the expected tags instead of
    // duplicating an assertion for each tag; supports any number of tags per task.
    for (const tag of task.tags) {
      await expect(
        taskCard.getByText(tag, { exact: true }),
        `Expected "${task.title}" to have the "${tag}" tag.`
      ).toBeVisible();
    }
  });
}