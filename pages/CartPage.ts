import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly productNames: Locator;
  readonly quantities: Locator;
  readonly termsCheckbox: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productNames = page.locator('.cart .product-name');
    this.quantities = page.locator('.cart .qty-input');
    this.termsCheckbox = page.locator('#termsofservice');
    this.checkoutButton = page.locator('#checkout');
  }

  async agreeTerms() {
    await this.termsCheckbox.check();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
