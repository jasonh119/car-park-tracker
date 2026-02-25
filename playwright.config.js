// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    timeout: 15000,
    expect: { timeout: 5000 },
    fullyParallel: false,
    reporter: 'list',

    use: {
        baseURL: 'http://localhost:8788',
        trace: 'on-first-retry',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],

    // Spin up a static server before tests, shut it down after
    webServer: {
        command: 'npx serve . --listen 8788 --no-clipboard',
        url: 'http://localhost:8788',
        reuseExistingServer: false,
        timeout: 10000,
    },
});
