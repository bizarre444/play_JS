const { test, expect } = require('@playwright/test');


test('Browser Context Playwrhight test', async({ browser }) => {


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

    //race condition
    await Promise.all([
        //doesn't work!!!! navigation is fault
        page.waitForNavigation(),
        signIn.click(),
    ]);


    // console.log(await cardTitles.first().textContent());
    // console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);


});

test.only('UI controls Test', async({ page }) => {
    await page.goto('http://rahulshettyacademy.com/loginpagePractise/');

    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");

    await dropdown.selectOption("consult");
    //await page.pause();

    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();

    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();

    await expect(documentLink).toHaveAttribute("class", "blinkingText");

    //assertion
    //await page.pause();

});