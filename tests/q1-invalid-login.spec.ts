import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

test.describe('Q1 - Invalid Login', () => {
  test('invalid credentials show an error and user remains logged out', async ({ page }, testInfo) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);

    await home.goto();
    await home.goToLogin();

    await login.login('invalid.user@example.com', 'WrongPassword123!');

    await expect(login.errorMessage).toBeVisible();
    await expect(login.errorMessage).toContainText('Login was unsuccessful');
    await expect(home.loginLink).toBeVisible();
    await expect(home.logoutLink).toHaveCount(0);

    await testInfo.attach('Q1-invalid-login', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png'
    });
  });
});
