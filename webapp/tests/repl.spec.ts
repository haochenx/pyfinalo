import { test, expect, Page } from '@playwright/test';

async function injectCode(page: Page, code: string, selector?: string) {
  await page.evaluate(({selector, code}) => {
    const view = (document.querySelector(selector) as any).cmView.view;
    view.dispatch({changes: {
        from: 0,
        to: view.state.doc.length,
        insert: code
      }});
  }, { selector: selector ?? '.cm-editor .cm-content', code })
}

function waitMs(millis: number) {
  return new Promise(res => {
    setTimeout(res, millis);
  });
}

test.describe('REPL functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.afterEach(async ({ page }, testInfo) => {
    // Take screenshot after each test
    await page.screenshot({
      path: `test-results/screenshots/${testInfo.title.replace(/[^a-z0-9]/gi, '_')}-${testInfo.status}.png`,
      fullPage: true
    });
  });

  test('JavaScript REPL should evaluate basic expressions', async ({ page }, testInfo) => {
    // Switch to JavaScript runtime
    await page.selectOption('select', 'javascript');

    // Wait for the JavaScript REPL to be visible
    await page.waitForSelector('[data-testid="js-repl"]', { timeout: 10000 });

    // Find the CodeMirror editor for JavaScript
    const jsEditor = page.locator('[data-testid="js-repl"] .cm-editor');
    await expect(jsEditor).toBeVisible();

    // Click on the editor to focus it
    await jsEditor.click();

    // Clear existing content and type a simple expression
    await injectCode(page, 'add(int(2), int(2))');
    await jsEditor.click();

    // Take screenshot after typing
    await testInfo.attach('after-typing', {
      body: await page.screenshot(),
      contentType: 'image/png'
    });

    // Click the Run button
    await page.click('button:has-text("Run Code")');

    // Wait for output and check it contains the result
    const jsOutput = page.locator('[data-testid="js-repl-output"]');
    await expect(jsOutput).toContainText('4 : int');

    // Take screenshot after execution
    await testInfo.attach('after-execution', {
      body: await page.screenshot(),
      contentType: 'image/png'
    });
  });

  test('Python REPL should evaluate basic expressions', async ({ page }, testInfo) => {
    // Python is the default runtime, but let's ensure it's selected
    await page.selectOption('select', 'python');

    // Wait for the Python REPL to be visible
    await page.waitForSelector('[data-testid="python-repl"]', { timeout: 30000 });

    // Find the CodeMirror editor for Python
    const pythonEditor = page.locator('[data-testid="python-repl"] .cm-editor');
    await expect(pythonEditor).toBeVisible();

    // Click on the editor to focus it
    await pythonEditor.click();

    // Clear existing content and type a simple expression
    await injectCode(page, 'show(add(int(2), int(2)))');
    await pythonEditor.click();

    // Take screenshot after typing
    await testInfo.attach('python-after-typing', {
      body: await page.screenshot(),
      contentType: 'image/png'
    });

    // Click the Run button
    await page.click('button:has-text("Run Code")');

    // Wait for output and check it contains the result
    const pythonOutput = page.locator('[data-testid="python-repl-output"]');
    await expect(pythonOutput).toContainText('4 : int', { timeout: 30000 });

    // Take screenshot after execution
    await testInfo.attach('python-after-execution', {
      body: await page.screenshot(),
      contentType: 'image/png'
    });
  });

  test('JavaScript REPL should handle pyfinalo functions', async ({ page }) => {
    // Switch to JavaScript runtime
    await page.selectOption('select', 'javascript');
    await page.waitForSelector('[data-testid="js-repl"]', { timeout: 10000 });

    const jsEditor = page.locator('[data-testid="js-repl"] .cm-editor');
    await jsEditor.click();

    // Clear and test pyfinalo str function
    await injectCode(page, 'show(str("hello"))');
    await jsEditor.click();

    // Click the Run button
    await page.click('button:has-text("Run Code")');

    const jsOutput = page.locator('[data-testid="js-repl-output"]');
    await expect(jsOutput).toContainText('"hello" : string');
  });

  test('Python REPL should handle pyfinalo functions', async ({ page }) => {
    // Python is default, but ensure it's selected
    await page.selectOption('select', 'python');
    await page.waitForSelector('[data-testid="python-repl"]', { timeout: 30000 });

    const pythonEditor = page.locator('[data-testid="python-repl"] .cm-editor');
    await pythonEditor.click();

    // Clear and test pyfinalo str function
    await injectCode(page, 'show(str("hello"))');
    await pythonEditor.click();

    // Click the Run button
    await page.click('button:has-text("Run Code")');

    const pythonOutput = page.locator('[data-testid="python-repl-output"]');
    await expect(pythonOutput).toContainText('"hello" : string', { timeout: 30000 });
  });

  test('Both REPLs should handle errors gracefully', async ({ page }) => {
    // Test JavaScript error handling
    await page.selectOption('select', 'javascript');
    await page.waitForSelector('[data-testid="js-repl"]', { timeout: 10000 });

    const jsEditor = page.locator('[data-testid="js-repl"] .cm-editor');
    await jsEditor.click();

    await injectCode(page, 'undefined_function()');
    await jsEditor.click();

    await page.click('button:has-text("Run Code")');

    const jsOutput = page.locator('[data-testid="js-repl-output"]');
    await expect(jsOutput).toContainText('Error');

    // Test Python error handling
    await page.selectOption('select', 'python');
    await page.waitForSelector('[data-testid="python-repl"]', { timeout: 30000 });

    const pythonEditor = page.locator('[data-testid="python-repl"] .cm-editor');
    await pythonEditor.click();

    await injectCode(page, 'undefined_function()');
    await pythonEditor.click();
    await page.click('button:has-text("Run Code")');

    const pythonOutput = page.locator('[data-testid="python-repl-output"]');
    await expect(pythonOutput).toContainText('Error', { timeout: 30000 });
  });
});
