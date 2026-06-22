// @ts-check
import { test, expect } from '@playwright/test';

  // Click the get started link.
  test('get started link', async ({ page }) => {
  await page.goto('/');

  // Login to the application
  await page.locator('//input[@id="user-name"]').fill('standard_user');
  await page.locator('//input[@id="password"]').fill('secret_sauce');
  await page.locator('//input[@id="login-button"]').click();

  // Assertion for products page
  await expect(page.locator('//span[@class="title"]')).toHaveText('Products');

  // Add to cart Product
  await page.locator('//button[@id="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('//button[@id="add-to-cart-sauce-labs-onesie"]').click();
  await page.locator('//button[@id="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();

  // Assertion for cart badge
  await expect(page.locator('//span[@class="shopping_cart_badge"]')).toHaveText('3');

  // Click on cart icon
  await page.locator('//a[@class="shopping_cart_link"]').click();

  // Assertion for cart page products name
  await expect(page.locator('(//div[@class="inventory_item_name"])[1]')).toHaveText('Sauce Labs Bolt T-Shirt');
  await expect(page.locator('(//div[@class="inventory_item_name"])[2]')).toHaveText('Sauce Labs Onesie');
  await expect(page.locator('(//div[@class="inventory_item_name"])[3]')).toHaveText('Test.allTheThings() T-Shirt (Red)');

  // Assertion for cart page products price
  await expect(page.locator('(//div[@class="inventory_item_price"])[1]')).toHaveText('$15.99');
  await expect(page.locator('(//div[@class="inventory_item_price"])[2]')).toHaveText('$7.99');
  await expect(page.locator('(//div[@class="inventory_item_price"])[3]')).toHaveText('$15.99');

  // Click on checkout button
  await page.locator('//button[@id="checkout"]').click();

  // Fill the checkout information
  await page.locator('//input[@id="first-name"]').fill('Dharmi');
  await page.locator('//input[@id="last-name"]').fill('Zack');
  await page.locator('//input[@id="postal-code"]').fill('12345');

  // Click on continue button
  await page.locator('//input[@id="continue"]').click();

  // Checkout overview page assertion (Item Total)
  const itemTotal = await page.locator("//div[@class='summary_subtotal_label']").allInnerTexts();
  console.log('1Item Total:', itemTotal);
  expect(await page.locator('//div[@class="summary_subtotal_label"]').allInnerTexts()).toContain('Item total: $39.97');

  expect(await page.locator('//div[@class="summary_tax_label"]').allInnerTexts()).toContain('Tax: $3.20');
  expect(await page.locator('//div[@class="summary_total_label"]').allInnerTexts()).toContain('Total: $43.17');

  const a = await page.locator('(//div[@class="inventory_item_price"])[1]').allInnerTexts();
  console.log('15.99', a[0].replace('$', ''));
  const b = await page.locator('(//div[@class="inventory_item_price"])[2]').allInnerTexts();
  console.log('7.99', b[0].replace('$', ''));
  const c = await page.locator('(//div[@class="inventory_item_price"])[3]').allInnerTexts();
  console.log('15.99', c[0].replace('$', ''));

  var d=parseFloat(a[0].replace('$', '')) + parseFloat(b[0].replace('$', '')) + parseFloat(c[0].replace('$', ''));
  console.log('Total Price:', d);

  // Click on finish button
  await page.locator('//button[@id="finish"]').click();
 
  // Back to Home page
  await page.locator('//button[@id="back-to-products"]').click();

  // Assertion for products page
  await expect(page.locator('//span[@class="title"]')).toHaveText('Products');
  
});