const { test, expect } = require('@playwright/test');


test.only('Browser Context Playwrhight test', async({ browser }) => {


    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");

    await page.goto('http://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    //css, x path
    await userName.type("rahulshettyacademy1");
    await page.locator("[type='password']").type("learning");
    await signIn.click();
    //wait until this locator shown up page
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    //type - fill
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();

    // console.log(await cardTitles.first().textContent());
    // console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);


});

test('Page Playwright Test', async({ page }) => {
    await page.goto('http://google.com');
    //get title - assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
    //
});