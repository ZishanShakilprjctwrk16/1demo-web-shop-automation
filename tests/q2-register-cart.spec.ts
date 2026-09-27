import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { generateUser } from '../utils/testData';

test.describe('Q2 - Register + Login + Add Product to Cart', () => {
  test('registers a new user, logs in, adds a product, and verifies cart product and quantity', async ({ page }, testInfo) => {
    const user = generateUser();
    const productName = 'Computing and Internet';
    const expectedQuantity = '2';

    const home = new HomePage(page);
    const login = new LoginPage(page);
    const register = new RegisterPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);

    await home.goto();
    await home.goToRegister();

    await register.register(user.firstName, user.lastName, user.email, user.password);
    await expect(register.successMessage).toContainText('Your registration completed');
    await register.continueAfterRegistration();

    // Demo Web Shop logs a user in immediately after registration.
    // The assignment explicitly asks for Register -> log in, so log out and log in again.
    await expect(home.logoutLink).toBeVisible();
    await home.logout();
    await home.goToLogin();
    await login.login(user.email, user.password);
    await expect(home.accountEmail).toHaveText(user.email);

    await home.openCategory('Books');
    await page.getByRole('link', { name: productName, exact: true }).first().click();

    await product.setQuantity(Number(expectedQuantity));
    await product.addToCart();
    await home.goToCart();

    await expect(cart.productNames).toContainText(productName);
    await expect(cart.quantities.first()).toHaveValue(expectedQuantity);

    await testInfo.attach('Q2-cart-verification', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png'
    });
  });
});
