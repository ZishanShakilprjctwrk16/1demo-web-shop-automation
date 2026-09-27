# Demo Web Shop Automation

This repo has my test automation for Demo Web Shop (https://demowebshop.tricentis.com) — UI tests with Playwright (Part A) and API tests with Postman/Newman (Part C).

Stack: Playwright + TypeScript (POM), Allure for reporting, Newman for the API collection.

## Before you run anything

You'll need:
- Node.js + npm
- Java installed (Allure won't generate reports without it)
- an internet connection, since the tests hit the real demowebshop.tricentis.com site, not a local copy

## Getting set up

```bash
git clone https://github.com/ZishanShakilprjctwrk16/1demo-web-shop-automation.git
cd 1demo-web-shop-automation
npm install
npx playwright install
```

The last command downloads the browser binaries Playwright needs — don't skip it, first run will fail without it.

## What's in here

```
api-tests/    -> Postman collection for the API suite (Part C)
pages/        -> page objects for the UI suite
scripts/      -> run-tests.mjs, the custom runner npm test uses
tests/        -> the actual Playwright specs (Part A)
utils/        -> helper functions shared across tests
```

## Running the UI tests

Each scenario can be run on its own:

```bash
npm run test:q1   # invalid login
npm run test:q2   # register + add to cart
npm run test:q3   # full checkout flow
```

Or run all three back to back:

```bash
npm test
```

I set `workers: 1` and `fullyParallel: false` in the config on purpose, so these run one after another instead of at the same time — easier to debug when something breaks.

If you want to actually watch the browser instead of running headless:

```bash
npm run test:headed
```

or open Playwright's own UI runner:

```bash
npm run test:ui
```

## Checking the reports

Two reports get generated on every run.

**Playwright's own HTML report**
```bash
npm run report:html
```

**Allure report** (needs Java, mentioned above)
```bash
npm run allure:generate
npm run allure:open
```
First command builds it from `allure-results/`, second one serves it and pops it open in your browser.

## API tests (Part C)

The Postman collection is in `api-tests/DemoWebShop_API.postman_collection.json`, run through Newman:

```bash
npm run api:test
```

Results (pass/fail per request, assertions etc.) print straight to the terminal — no separate report step needed for this one.

## Running the whole thing top to bottom

Basically what's in `SUBMISSION_CHECKLIST.md`, if you want to go through everything in order:

```bash
npm run test:q1
npm run test:q2
npm run test:q3
npm test
npm run report:html
npm run allure:generate
npm run allure:open
npm run api:test
```

## A couple of things worth knowing

- Video recording is off (`video: 'off'`) — I turned it off since it needs a separate ffmpeg download and wasn't worth the setup for this. Screenshots are still taken every run, and traces get saved on failures.
- Everything runs against the live site, so if demowebshop.tricentis.com is down or slow, tests will fail for reasons that have nothing to do with the code.
