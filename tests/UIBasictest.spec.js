const { test, expect } = require('playwright/test');

test('Browser Context-Validating Error login', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //css
    await username.fill("rahulshetty");
    await page.locator("[type='password']").fill("learning");
    await signIn.click();
    //webdriverwait
    console.log(await page.locator("[style*='block']").textContent());
    //assertion
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    //type - fill
    await username.fill("");
    await username.fill("rahulshettyacademy");
    await signIn.click();
    // console.log(await cardTitles.first().textContent());
    // console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});

test('Page Playwright test', async ({ page }) => {

    await page.goto("https://google.com");
    //get title - assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
    // expect(await page.title()).toBe("Google");
});

test.only('UI Controls', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const documentLink = page.locator("a[href*='documents-request']");
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect (page.locator("#terms")).toBeChecked();
    await page.locator("terms").uncheck();
    expect (await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
});

test('Child windows hadl', async ({ browser }) => {
    
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator("#username");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("a[href*='documents-request']");
    
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), //listen for any new page pending,rejected, fulfilled
        documentLink.click(), // new page is opened
    ])
    text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(text);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").textContent());
});
