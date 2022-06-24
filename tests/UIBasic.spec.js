const { test, expect } = require('@playwright/test');

test.only('Client App login', async({ page }) => {

    const productName = 'Zara Coat 3';
    const products = page.locator(".card-body");
    await page.goto('http://rahulshettyacademy.com/client');
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").type("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        products.nth(i)
    }
    //Zara Coat 3


})


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

test('UI controls Test', async({ page }) => {
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

test('Child windows handle Test', async({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');

    await page.goto('http://rahulshettyacademy.com/loginpagePractise/');
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ])
    const text = await newPage.locator(".red").textContent();
    //console.log(text);
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    //console.log(domain);
    await page.locator("#username").type(domain);
    console.log(await page.locator("#username").textContent());


});