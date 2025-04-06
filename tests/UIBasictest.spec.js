const {test, expect} = require('playwright/test');

test('Browser Context-Validating Error login', async ({browser})=> { 
    
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

test('Page Playwright test', async ({page})=> { 
    
    await page.goto("https://google.com");
    //get title - assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
    // expect(await page.title()).toBe("Google");
});