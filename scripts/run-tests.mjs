import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const playwrightCli = fileURLToPath(new URL('../node_modules/playwright/cli.js', import.meta.url));
const allureBin = fileURLToPath(
  new URL(
    `../node_modules/allure-commandline/dist/bin/allure${process.platform === 'win32' ? '.bat' : ''}`,
    import.meta.url
  )
);

const testRun = spawnSync(process.execPath, [playwrightCli, 'test', ...args], {
  stdio: 'inherit',
  shell: false
});

// Playwright's HTML reporter is generated automatically during the test run.
// Generate the Allure HTML report after every execution as required by the assignment.
const allureCommand = `call "${allureBin}" generate allure-results --clean -o allure-report`;
const allureRun = process.platform === 'win32'
  ? spawnSync(allureCommand, {
    stdio: 'inherit',
    shell: true
  })
  : spawnSync(allureBin, ['generate', 'allure-results', '--clean', '-o', 'allure-report'], {
  stdio: 'inherit',
  shell: false
  });

if (allureRun.status !== 0) {
  console.error('\nAllure report generation failed. Check the error output above.');
}

process.exit(testRun.status ?? 1);
