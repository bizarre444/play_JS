const { test, expect, request } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');

test.only('Client App login', async({ page }) => {
    //js file - Login js, DashboardPage
    const poManager = new POManager(page);
    const productName = 'zara coat 3';
    const products = page.locator(".card-body");
    const username = "qa.parent2021@gmail.com";
    const password = "123456QA!q";

    const loginPage = await poManager.getLoginPage();
    await loginPage.goTO();
    await loginPage.validLogin(username, password);
    const dashboardPage = await poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();

    // await page.locator("div li").first().waitFor();

    // const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
    // expect(bool).toBeTruthy();

    // await page.locator("text=Checkout").click();
    // await page.locator("[placeholder*='Country']").type("ind", { delay: 600 });
    // const dropdown = page.locator(".ta-results");
    // await dropdown.waitFor();
    // const optionsCount = await dropdown.locator("button").count();
    // for (let i = 0; i < optionsCount; i++) {
    //     const text = await dropdown.locator("button").nth(i).textContent();
    //     if (text === " India") {
    //         await dropdown.locator("button").nth(i).click();
    //         break;
    //     }
    // }

    // await expect(page.locator(".user__name [type='text']").first()).toHaveText(username);
    // await page.locator(".action__submit").click();
    // await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    // const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    // console.log(orderId);

    // await page.locator("button[routerlink*='myorders']").click();
    // await page.locator("tbody").waitFor();

    // const rows = await page.locator("tbody tr");


    // for (let i = 0; i < await rows.count(); ++i) {
    //     const rowOrderId = await rows.nth(i).locator("th").textContent();
    //     if (orderId.includes(rowOrderId)) {
    //         await rows.nth(i).locator("button").first().click();
    //         break;
    //     }
    // }

    // const orderIdDetails = await page.locator(".col-text").textContent();
    // expect(orderId.includes(orderIdDetails)).toBeTruthy();

    //await page.pause();
    //Zara Coat 3


})


test('Browser Context Playwrhight test', async({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    //abort css code - for image - {jpg,png,jpeg}
    await page.route('**/*.css', route => route.abort());
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");

    //listener
    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));
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