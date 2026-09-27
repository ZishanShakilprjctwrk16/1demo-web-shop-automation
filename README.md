# Demo Web Shop Automation & API Testing

This repository contains the complete automation project for the Demo Web Shop assignment.

## Assignment Coverage

### Part A — UI Automation

Website: `https://demowebshop.tricentis.com/`

- **Q1 Invalid Login** — invalid email/password, verify error message, verify user is not logged in.
- **Q2 Register + Add Product to Cart** — register a fresh customer, explicitly log out and log back in, open a product category, select a product, set quantity, add to cart, and verify product + quantity.
- **Q3 E2E Checkout** — search product, verify search result, open product, increase quantity, add to cart, agree to terms, checkout, confirm order, and open order details.

The UI suite uses **Playwright + TypeScript + Page Object Model (POM)**.

### Part B — GitHub Workflow

The included local Git repository contains separate branches and incremental history for:

- `q1-invalid-login`
- `q2-register-cart`
- `q3-e2e-checkout`
- `api-automation`
- `main`

You still need to create your own **public GitHub repository** and push these branches before submission.

### Part C — API Automation

API: `https://jsonplaceholder.typicode.com/users`

The Postman collection:

1. Sends `GET /users`.
2. Validates HTTP 200.
3. Validates a non-empty array.
4. Validates every user has `id`, `name`, and `email`.
5. Saves one user's ID and original object.
6. Generates dynamic values for `name`, `email`, and `company.name`.
7. Sends `PUT /users/{id}` using the saved ID.
8. Preserves all other original fields so `phone` remains available.
9. Validates returned ID, non-empty phone, updated name, updated email, and updated company name.

The collection is located at:

```text
api-tests/DemoWebShop_API.postman_collection.json
```

---

## Tech Stack

- Node.js
- TypeScript
- Playwright
- Page Object Model (POM)
- Playwright HTML Reporter
- Allure Playwright
- Postman
- Newman
- Git / GitHub

---

## Project Structure

```text
demo-web-shop-automation/
├── pages/
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   ├── ProductPage.ts
│   └── RegisterPage.ts
├── tests/
│   ├── q1-invalid-login.spec.ts
│   ├── q2-register-cart.spec.ts
│   └── q3-e2e-checkout.spec.ts
├── utils/
│   └── testData.ts
├── api-tests/
│   └── DemoWebShop_API.postman_collection.json
├── scripts/
│   └── run-tests.mjs
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

---

## Prerequisites

Install:

1. **Node.js 18+**
2. **Java** (required by Allure Commandline)
3. **Git**
4. **Postman** (optional for visually opening the collection)

Verify:

```bash
node --version
npm --version
git --version
java -version
```

---

## Setup

From the project directory:

```bash
npm install
npx playwright install
```

---

## Run UI Tests

### All three scenarios sequentially

```bash
npm test
```

The Playwright configuration uses one worker and `fullyParallel: false`, so the tests run sequentially.

### Q1 only

```bash
npm run test:q1
```

### Q2 only

```bash
npm run test:q2
```

### Q3 only

```bash
npm run test:q3
```

### Headed mode

```bash
npm run test:headed
```

Each normal test command runs the Playwright suite and then generates the Allure HTML report. The Playwright HTML reporter is generated automatically by Playwright during the same execution.

---

## Reports

### Playwright HTML report

```bash
npm run report:html
```

Output folder:

```text
playwright-report/
```

### Allure report

The normal `npm test` / `npm run test:q1` / `npm run test:q2` / `npm run test:q3` scripts automatically generate:

```text
allure-results/
allure-report/
```

To regenerate manually:

```bash
npm run allure:generate
```

To open:

```bash
npm run allure:open
```

Screenshots are configured for every Playwright test and important verification screenshots are also attached explicitly to the test result, so they appear in the report artifacts.

---

## Run API Automation with Newman

```bash
npm run api:test
```

Equivalent command:

```bash
npx newman run api-tests/DemoWebShop_API.postman_collection.json
```

The requests are ordered so the GET request creates the variables needed by the PUT request.

---

## GitHub Workflow

The ZIP includes a local Git history with separate branches. After creating an empty **public** GitHub repository, run:

```bash
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
git push origin q1-invalid-login
git push origin q2-register-cart
git push origin q3-e2e-checkout
git push origin api-automation
```

If `origin` already exists:

```bash
git remote set-url origin YOUR_GITHUB_REPOSITORY_URL
```

Check branches:

```bash
git branch -a
```

Check meaningful history:

```bash
git log --oneline --graph --all --decorate
```

---

## Notes

- Registration emails are generated dynamically so each test can run independently.
- Q2 explicitly logs out after registration and then logs back in to satisfy the stated `register → log in` sequence.
- Q3 creates its own fresh account so it does not depend on Q2.
- The API PUT payload starts with the selected GET user and changes only `name`, `email`, and `company.name`. This preserves `phone`, allowing the required `phone should not be empty` assertion to be tested.
- If the live demo website changes its markup, a locator may need a small update before final submission.
