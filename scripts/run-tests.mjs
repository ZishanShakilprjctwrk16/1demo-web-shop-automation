import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';

const testRun = spawnSync(npx, ['playwright', 'test', ...args], {
  stdio: 'inherit',
  shell: false
});

// Playwright's HTML reporter is generated automatically during the test run.
// Generate the Allure HTML report after every execution as required by the assignment.
const allureRun = spawnSync(npx, ['allure', 'generate', 'allure-results', '--clean', '-o', 'allure-report'], {
  stdio: 'inherit',
  shell: false
});

if (allureRun.status !== 0) {
  console.error('\nAllure generation failed. Ensure Java is installed and available on PATH.');
}

process.exit(testRun.status ?? 1);
