const { test, expect } = require('@playwright/test');
const { assert } = require('console');


test('Client App login', async ({ page }) => {
    const email = "pepe1010@gmail.com";
    const productName = "ZARA COAT 3";
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder('email@example.com').fill(email);
    await page.getByPlaceholder('enter your passsword').fill("Iamking@000");
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

    await page.locator(".card-body").filter({ hasText:"ZARA COAT 3" })
              .getByRole('button', { name: 'Add To Cart' }).click();

    await page.getByRole('listitem').getByRole('button', { name: 'Cart' }).click();

    page.locator("ul.cartWrap li.items").first().waitFor();
    await page.getByText('ZARA COAT 3').isVisible();

    await page.getByRole('button', { name: 'Checkout' }).click();

    await page.locator("input[placeholder*='Select Country']").pressSequentially('ind', { delay: 150 });

    await page.getByRole("button",{name :"India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();

    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
})