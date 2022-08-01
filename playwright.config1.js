// @ts-check
const { devices } = require('@playwright/test');

const config = {
    testDir: './tests',
    /* Maximum time one test can run for. */
    timeout: 30 * 1000,
    expect: {
        timeout: 5000
    },

    reporter: 'html',
    projects: [{
            name: 'safari',
            use: {
                browserName: 'webkit',
                headless: false,
                screenshot: 'on',
                trace: 'retain-on-failure', //off, on
                ...devices['iPhone 11']
            },
        }, {
            name: 'chrome',
            use: {
                browserName: 'chromium',
                headless: false,
                screenshot: 'on',
                video: 'retain-on-failure',
                ignoreHttpsErrors: true, //without sertificate
                permissions: ['geolocation'],
                trace: 'on', //off, on
                //...devices['Nokia N9']
                viewport: { width: 720, height: 720 }
            },
        }

    ]
};

module.exports = config;