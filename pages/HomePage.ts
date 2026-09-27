import { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly loginLink: Locator;
  readonly logoutLink: Locator;
  readonly registerLink: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly cartLink: Locator;
  readonly accountEmail: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.getByRole('link', { name: 'Log in' });
    this.logoutLink = page.getByRole('link', { name: 'Log out' });
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.searchInput = page.locator('#small-searchterms');
    this.searchButton = page.locator('input[value="Search"]');
    this.cartLink = page.locator('#topcartlink a');
    this.accountEmail = page.locator('.header-links a.account');
  }

  async goto() {
    await this.page.goto('/');
  }

  async goToLogin() {
    await this.loginLink.click();
  }

  async goToRegister() {
    await this.registerLink.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async search(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async openCategory(name: string) {
    await this.page.getByRole('link', { name, exact: true }).first().click();
  }
}
