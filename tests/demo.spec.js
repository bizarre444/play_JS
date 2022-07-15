const { expect } = require('@playwright/test');
const { test } = require('./my-test');
const { POManager } = require('../pageobjects/POManager');
const dataset = JSON.parse(JSON.stringify(require("./utils/data.json")));

test.beforeAll(() => {
    console.log("i am the first");
    // mydata = await JSON.parse(JSON.stringify(require("./utils/data.json")));
})

for (const data of dataset) {

    test(`testing with ${data.email}`, async({ page, person }) => {

        const poManager = new POManager(page);

        const username = "qa.parent2021@gmail.com";
        const password = "123456QA!q";
        const productName = 'zara coat 3';
        const products = page.locator(".card-body");
        const loginPage = poManager.getLoginPage();
        await loginPage.goTO();
        await loginPage.validLogin(data.email, data.password);
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(data.productName);
        await dashboardPage.navigateToCart();

        const cartPage = poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(data.productName);
        await cartPage.Checkout();
    })
}


// const base = require('@playwright/test');

// exports.test = base.test.extend({
//   // Define an option and provide a default value.
//   // We can later override it in the config.
//   person: [{email : "qa.parent2021@gmail.com", password:"123456QA!q"},
//   {email : "qa.parent22@gmail.com", password:"Iamking@00"}],
// });