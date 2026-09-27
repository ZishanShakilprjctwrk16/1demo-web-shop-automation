import { Locator, Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly notification: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = page.locator('.product-name h1');
    this.quantityInput = page.locator('.qty-input');
    this.addToCartButton = page.locator('input[value="Add to cart"]');
    this.notification = page.locator('#bar-notification');
  }

  async setQuantity(quantity: number) {
    await this.quantityInput.fill(String(quantity));
  }

  async addToCart() {
    await this.addToCartButton.click();
    await this.notification.waitFor({ state: 'visible' });
  }
}
