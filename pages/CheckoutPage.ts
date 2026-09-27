import { expect, Locator, Page } from '@playwright/test';
import type { TestUser } from '../utils/testData';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  private async chooseFirstUsableOption(select: Locator) {
    const options = select.locator('option');
    const count = await options.count();

    for (let i = 0; i < count; i++) {
      const value = await options.nth(i).getAttribute('value');
      if (value && value !== '0') {
        await select.selectOption(value);
        return;
      }
    }
  }

  async completeBillingAddress(user: TestUser) {
    const country = this.page.locator('#BillingNewAddress_CountryId');

    if (await country.isVisible()) {
      try {
        await country.selectOption({ label: user.country });
      } catch {
        await this.chooseFirstUsableOption(country);
      }

      const state = this.page.locator('#BillingNewAddress_StateProvinceId');
      if (await state.isVisible()) {
        await this.chooseFirstUsableOption(state).catch(() => undefined);
      }

      await this.page.locator('#BillingNewAddress_City').fill(user.city);
      await this.page.locator('#BillingNewAddress_Address1').fill(user.address1);
      await this.page.locator('#BillingNewAddress_ZipPostalCode').fill(user.zip);
      await this.page.locator('#BillingNewAddress_PhoneNumber').fill(user.phone);
    }

    const continueButton = this.page.locator('#billing-buttons-container input[value="Continue"]');
    await expect(continueButton).toBeVisible();
    await continueButton.click();
  }

  async continueShippingAddress() {
    const button = this.page.locator('#shipping-buttons-container input[value="Continue"]');
    await expect(button).toBeVisible();
    await button.click();
  }

  async continueShippingMethod() {
    const shippingOptions = this.page.locator('input[name="shippingoption"]');
    await expect(shippingOptions.first()).toBeVisible();
    await shippingOptions.first().check();

    const button = this.page.locator('#shipping-method-buttons-container input[value="Continue"]');
    await button.click();
  }

  async choosePaymentMethod() {
    const paymentMethods = this.page.locator('input[name="paymentmethod"]');
    await expect(paymentMethods.first()).toBeVisible();
    await paymentMethods.first().check();

    const button = this.page.locator('#payment-method-buttons-container input[value="Continue"]');
    await button.click();
  }

  async continuePaymentInformation() {
    const button = this.page.locator('#payment-info-buttons-container input[value="Continue"]');
    await expect(button).toBeVisible();
    await button.click();
  }

  async confirmOrder() {
    const button = this.page.locator('#confirm-order-buttons-container input[value="Confirm"]');
    await expect(button).toBeVisible();
    await button.click();
  }

  orderCompletedBox() {
    return this.page.locator('.order-completed');
  }

  orderDetailsLink() {
    return this.page.getByRole('link', { name: /order details/i });
  }
}
