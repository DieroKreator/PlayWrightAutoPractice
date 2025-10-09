const playwright = require('@playwright/test');
const { POManager } = require('../../pageObjects/POManager');
const { Before, After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');

Before({ tags: "@foo" }, async function () {
    // Launch browser before each scenario
    this.browser = await playwright.chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    // Initialize your Page Object Manager
    this.poManager = new POManager(this.page);
});

BeforeStep(async function () {
    // console.log("BeforeStep hook");
});

AfterStep(async function ({ result }) {
    // console.log("AfterStep hook");
    if (result.status === Status.FAILED) {

        /* TODO: fix screenshot date issue */
        await this.page.screenshot({ path: `screenshot-${Date.now()}.png` });
    }
});

After(async function () {

    // console.log("After hook");
    console.log("Closing browser after scenario...");

    // if (this.browser) {
    //     await this.close();
    // }
});