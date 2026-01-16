import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 120000,
    fullyParallel: false,
    workers: 1,
    projects: [
        {
            name: "chromium",
            use: {
                ...devices["Desktop Chrome"],
                viewport: { width: 1920, height: 1080 },
                launchOptions: {
                    channel: 'chrome',
                    args: [
                        //'--start-maximized',
                        "--start-fullscreen",
                    ]
                }
            },
        },
        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] },
        },
        {
            name: "webkit",
            use: { ...devices["Desktop Safari"] },
        },
    ],
    reporter: [
        ['list'],
        ['allure-playwright', {
            resultsDir: process.env.ALLURE_RESULTS_DIR || 'allure-results',
            stdout: true,
            stderr: false
        }],
    ],
    use: {
        headless: false,
        launchOptions: {
            args: [
                //"--start-fullscreen",
                "--start-maximized",
                //"--window-size=1920,1080",
                //'--force-device-scale-factor=1',
            ],
            channel: 'chrome',
        },
        viewport: null,
        screenshot: {
            mode: 'on',
            fullPage: true,
        },
        video: 'retain-on-failure',
        trace: 'on-first-retry'
    }
});
