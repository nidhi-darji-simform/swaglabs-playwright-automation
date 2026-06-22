const { test, expect } = require('@playwright/test');
const { loginPage } = require('../pageObjects/loginPage');
const { productPage } = require('../pageObjects/productPage');

test.only('E2E - Complete Purchase Flow', async ({ page }) => {

    const LoginPage = new loginPage(page);
    const ProductPage = new productPage(page);

    // Step 1: Navigate to application
    await page.goto('/');

    // Step 2: Login
    await LoginPage.login('standard_user', 'secret_sauce');
    expect(await ProductPage.isProductPageDisplayed()).toBe(true);

    // Step 3: Add products to cart
    await ProductPage.clickOnAddToCartButton('Sauce Labs Backpack');
    await ProductPage.clickOnAddToCartButton('Sauce Labs Bike Light');

    // Verify cart count
    expect(await ProductPage.getCartBadgeCount()).toBe('2');

    // Step 4: Open Cart
    await ProductPage.clickOncartIcon();

    // Verify products present in cart
    expect(await ProductPage.ItemVisibleInCart('Sauce Labs Backpack')).toBe(true);
    expect(await ProductPage.ItemVisibleInCart('Sauce Labs Bike Light')).toBe(true);

    // Step 5: Checkout
    await ProductPage.clickOnCheckoutButton();
    expect(await ProductPage.isCheckoutInfoPageHeaderVisible()).toBe(true);

    // Step 6: Enter Checkout Information
    await ProductPage.enterCheckoutInformation(
        'Nidhi',
        'Darji',
        '390001'
    );

    await ProductPage.clickOnContinueButton();

    // Verify Checkout Overview Page
    expect(await ProductPage.isCheckoutOverviewPageHeaderVisible()).toBe(true);

    // Step 7: Verify Order Summary
    expect(await ProductPage.ItemVisibleInCart('Sauce Labs Backpack')).toBe(true);
    expect(await ProductPage.ItemVisibleInCart('Sauce Labs Bike Light')).toBe(true);

    // Step 8: Finish Order
    await ProductPage.clickOnFinishButton();

    // Step 9: Verify Order Success
    expect(await ProductPage.isOrderConfirmationVisible()).toBe(true);

    // Optional verification
    expect(await ProductPage.getOrderConfirmationText())
        .toContain('Thank you for your order!');
});