import { test, expect, Page } from '@playwright/test';
import { RahulShettyLoginPage } from '../pageObjects_ts/RahulShettyLoginPage';
import { ShopPage } from '../pageObjects_ts/ShopPage';

test('Rahul Shetty login and verify iPhone X', async ({ page }) => {
    const loginPage = new RahulShettyLoginPage(page);
    await loginPage.goto();
    await loginPage.login('rahulshettyacademy', 'learning');

    // Wait for navigation to shop page
    await page.waitForURL('**/angularpractise/shop', { timeout: 10000 });

    const shopPage = new ShopPage(page);
    const isIphonePresent = await shopPage.isProductPresent('iphone X');
    expect(isIphonePresent).toBeTruthy();
});
