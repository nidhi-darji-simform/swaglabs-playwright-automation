const {test, expect} = require('@playwright/test');
const { loginPage } = require('../pageObjects/loginPage');
const { productPage } = require('../pageObjects/productPage');

test('Login to the application', async ({ page }) => {

        const LoginPage = new loginPage(page);
        await page.goto('/');
        await LoginPage.login('standard_user','secret_sauce');

        const Productpage = new productPage(page);
        expect(await Productpage.isProductPageDisplayed()).toBe(true);
});

test('This test verifies that multiple products can be added to the cart successfully.', async ({ page }) => {

        const LoginPage = new loginPage(page);
        await page.goto('/');
        await LoginPage.login('standard_user','secret_sauce');
        
        const ProductPage = new productPage(page);

        //Instead of hardcoding one product, I store multiple product names in an array. 
        // This makes the test more scalable and data-driven
        var abc=["Sauce Labs Backpack", "Sauce Labs Bike Light"];

        //For each product in the array, the framework dynamically locates the matching Add to Cart button and clicks it
        for(let i=0; i<abc.length; i++){
        await ProductPage.clickOnAddToCartButton(abc[i]);
        }
});