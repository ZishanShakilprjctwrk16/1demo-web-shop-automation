import { Locator, Page } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly genderMale: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly registerButton: Locator;
  readonly successMessage: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.genderMale = page.locator('#gender-male');
    this.firstName = page.locator('#FirstName');
    this.lastName = page.locator('#LastName');
    this.email = page.locator('#Email');
    this.password = page.locator('#Password');
    this.confirmPassword = page.locator('#ConfirmPassword');
    this.registerButton = page.locator('#register-button');
    this.successMessage = page.locator('.result');
    this.continueButton = page.locator('input[value="Continue"]');
  }

  async register(firstName: string, lastName: string, email: string, password: string) {
    await this.genderMale.check();
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.password.fill(password);
    await this.confirmPassword.fill(password);
    await this.registerButton.click();
  }

  async continueAfterRegistration() {
    await this.continueButton.click();
  }
}
