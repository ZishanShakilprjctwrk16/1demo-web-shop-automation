import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { generateUser } from '../utils/testData';

test.describe('Q3 - Product Search to Order Details E2E', () => {
  test('searches, verifies, adds quantity, checks out, confirms order, and opens order details', async ({ page }, testInfo) => {
    const user = generateUser();
    const productName = 'Computing and Internet';
    const expectedQuantity = '2';

    const home = new HomePage(page);
    const register = new RegisterPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    // A fresh registered user is used so the test can run independently.
    await home.goto();
    await home.goToRegister();
    await register.register(user.firstName, user.lastName, user.email, user.password);
    await expect(register.successMessage).toContainText('Your registration completed');
    await register.continueAfterRegistration();

    // Search and verify the expected product appears in results.
    await home.search(productName);
    const searchResult = page.getByRole('link', { name: productName, exact: true }).first();
    await expect(searchResult).toBeVisible();

    // Open product, increase quantity, and add it to cart.
    await searchResult.click();
    await expect(product.productTitle).toContainText(productName);
    await product.setQuantity(Number(expectedQuantity));
    await product.addToCart();

    // Verify cart and start checkout.
    await home.goToCart();
    await expect(cart.productNames).toContainText(productName);
    await expect(cart.quantities.first()).toHaveValue(expectedQuantity);
    await cart.agreeTerms();
    await cart.checkout();

    // Complete checkout steps.
    await checkout.completeBillingAddress(user);
    await checkout.continueShippingAddress();
    await checkout.continueShippingMethod();
    await checkout.choosePaymentMethod();
    await checkout.continuePaymentInformation();
    await checkout.confirmOrder();

    // Verify order confirmation.
    await expect(checkout.orderCompletedBox()).toContainText('Your order has been successfully processed');

    await testInfo.attach('Q3-order-confirmation', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png'
    });

    // Open and verify order details.
    const details = checkout.orderDetailsLink();
    await expect(details).toBeVisible();
    await details.click();
    await expect(page).toHaveURL(/orderdetails/i);
    await expect(page.locator('body')).toContainText(/Order/i);

    await testInfo.attach('Q3-order-details', {
      body: await page.screenshot({ fullPage: true }),
      contentType: 'image/png'
    });
  });
});
