import {test, expect} from '@playwright/test';
import {loginPage} from '../pageObjects/loginPage';
import {productPage} from '../pageObjects/productPage';
const logger = require('../logger');

test('Verify user can add multiple products to cart and cart badge count updates correctly',async({page}) => {

    const product=new productPage(page);
    const login=new loginPage(page);
    await page.goto('https://www.saucedemo.com/inventory.html');
    await login.login('standard_user','secret_sauce');

    logger.info("Adding Sauce Labs Backpack to the cart");
    await product.clickOnAddToCartButton("Sauce Labs Backpack");
    console.log(await product.getCartBadgeCount());
    expect(await product.getCartBadgeCount(),"Badge Count is not 1").toBe('1');
    expect(await product.isRemoveButtonVisible("Sauce Labs Backpack"),"Remove button is not visible").toBe(true);
    
    logger.info("Adding Sauce Labs Bike Light to the cart");
    await product.clickOnAddToCartButton("Sauce Labs Bike Light");
    expect(await product.getCartBadgeCount(),"Badge Count is not 2").toBe('2');
    expect(await product.isRemoveButtonVisible("Sauce Labs Bike Light"),"Remove button is not visible").toBe(true);
    
    logger.info("Clicking on cart icon");
    await product.clickOncartIcon();
    expect(await product.getCartBadgeCount(),"Badge Count is not 2").toBe('2');
    expect(await product.isRemoveButtonVisible("Sauce Labs Bike Light"),"Remove button is not visible").toBe(true);

});

test ('Verify user can remove a product from the shopping cart successfully',async({page}) => {

    const product=new productPage(page);
    const login=new loginPage(page);
    await page.goto('https://www.saucedemo.com/inventory.html');
    await login.login('standard_user','secret_sauce');

    await product.clickOnAddToCartButton("Sauce Labs Backpack");
    await product.clickOnAddToCartButton("Sauce Labs Bike Light");
    await product.clickOncartIcon();

    //Logger.log("Removing Item from cart");
    await product.clickOnRemoveButton('Sauce Labs Backpack');
    expect(await product.ItemVisibleInCart("Sauce Labs Backpack"),"Item is still visible in cart").toBe(false);
    expect(await product.getCartBadgeCount(),"Badge Count is not 1").toBe('1');
                                                                                                                                                                                                                        
});

test ('Verify user can proceed from cart page to checkout information page',async({page}) =>{

    const product=new productPage(page);
    const login=new loginPage(page);
    await page.goto('https://www.saucedemo.com/inventory.html');
    await login.login('standard_user','secret_sauce');

    await product.clickOnAddToCartButton("Sauce Labs Backpack");
    await product.clickOnAddToCartButton("Sauce Labs Bike Light");
    await product.clickOncartIcon();

    await product.clickOnCheckoutButton();  
    expect (await product.isCheckoutInfoPageHeaderVisible(),"Checkout info page header is not visible").toBe(true);                                                                                                                                                                                                                       
});

test ('Verify user can enter checkout information and navigate to checkout overview page',async({page}) => {

    const product=new productPage(page);
    const login=new loginPage(page);
    await page.goto('https://www.saucedemo.com/inventory.html');
    await login.login('standard_user','secret_sauce');

    await product.clickOnAddToCartButton("Sauce Labs Backpack");
    await product.clickOnAddToCartButton("Sauce Labs Bike Light");
    await product.clickOncartIcon();

    await product.clickOnCheckoutButton();

    await product.enterCheckoutInformation('Nidhi','Darji','380015');
    await product.clickOnContinueButton();
    expect (await product.isCheckoutOverviewPageHeaderVisible(),"Checkout overview page header is not visible").toBe(true);

});

test ('Verify all menu options are displayed when user clicks the menu icon',async({page}) =>{

    const product=new productPage(page);
    const login=new loginPage(page);
    await page.goto('https://www.saucedemo.com/inventory.html');
    await login.login('standard_user','secret_sauce');

    await product.clickOnMenuButton();
    expect (await product.isMenuItemsVisible("All Items"),"All Menu items options are not visble").toBe(true);
    expect (await product.isMenuItemsVisible("About"),"All Menu items options are not visble").toBe(true);
    expect (await product.isMenuItemsVisible("Logout"),"All Menu items options are not visble").toBe(true);
    expect (await product.isMenuItemsVisible("Reset App State"),"All Menu items options are not visble").toBe(true);

});

test('Verify All Items and About menu options navigate to their respective pages', async ({page}) =>{
    const product=new productPage(page);
    const login=new loginPage(page);
    await page.goto('https://www.saucedemo.com/inventory.html');
    await login.login('standard_user','secret_sauce');

    await product.clickOnMenuButton();

    await product.isallMenuItemspageVisible("All Items");
    expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
    await product.isaboutMenuItemspageVisible("About");
    expect(page.url()).toBe('https://saucelabs.com/');

});

test ('Verify user can logout successfully from the application ', async ({page}) => {
    const product=new productPage(page);
    const login=new loginPage(page);
    await page.goto('https://www.saucedemo.com/inventory.html');
    await login.login('standard_user','secret_sauce');

    await product.clickOnMenuButton();
    await product.clickOnLogout();
    expect(await login.isLogoutSuccessfully(), "Logout was not successful").toBe(true);

});

test ('Verify products can be filtered by Price (high to low)' , async ({page}) => {

    const product=new productPage(page);
    const login=new loginPage(page);
    await page.goto('https://www.saucedemo.com/inventory.html');
    await login.login('standard_user','secret_sauce');

    await product.selectFilterOption('Price (high to low)');
    var xyz = await product.getFirstProductPrice();
   // xyz = xyz.replace('$', '');
   console.log( xyz);
   // xyz = parseFloat(xyz);
    //console.log(typeof xyz);
    for (var i=xyz.length; i>=0;i--){
        var x=xyz[i];
        console.log(typeof(x));
                       break
        // x = xyz[i].repl('$', '');
        // console.log(x);
    } 
}
);


