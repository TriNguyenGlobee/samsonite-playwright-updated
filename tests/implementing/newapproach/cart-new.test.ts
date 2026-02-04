import { test, expect } from "../../../src/fixtures/test-fixture";
import { createMinicartPage } from '../../../src/factories/minicart.factory'
import { createCartPage } from '../../../src/factories/cart.factory'
import { Config } from "../../../config/env.config";
import { step } from "allure-js-commons";
import { t, clickUntil, delay, screenshotAndAttach } from "../../../utils/helpers/helpers";
import { createHomePage } from "../../../src/factories/home.factory"

test.describe("Cartpage-empty", () => {
    test(`
        1. Minicart is displayed - Empty cart
        2. Minicart can be closed by Start Shopping button - Minicart closed
        3. Minicart Explore by category URL navigation
        4. Cart page is displayed - Empty cart
        `, async ({ basicAuthPage }) => {
        const homePage = createHomePage(basicAuthPage);
        const minicartPage = createMinicartPage(basicAuthPage)
        const amountOfFooterCategoryItem = await minicartPage.getAmountFooterCategoryItems()

        await step("Click on Cart icon", async () => {
            await homePage.click(homePage.cartIcon)
        })

        await step("Verify - 1. Minicart is displayed - Empty cart", async () => {
            await minicartPage.assertEqual(await minicartPage.isMinicartShown(), true, "Minicart should be shown")
            await minicartPage.assertText(minicartPage.emptyCartMsg, t.minicart('emptymsg'), "Verify empty cart message text")
            await minicartPage.assertVisible(minicartPage.startShoppingButton, "Verify Start Shopping button is visible")
            await minicartPage.assertVisible(minicartPage.exploreByCategoryText, "Verify Explore by Category text is visible")
            await minicartPage.assertEqual(await minicartPage.footerCategoryItem.count(), amountOfFooterCategoryItem, "Verify amount of footer category items")
            await expect(minicartPage.minicartModal).toBeVisible({ timeout: 2000 });

            await screenshotAndAttach(basicAuthPage, './screenshots/Cartpage-empty', '01 - Minicart-empty-cart');
            await delay(1500)
        })

        await step("Click Shopping Cart button", async () => {
            await clickUntil(basicAuthPage, homePage.cartIcon, minicartPage.minicartRender, 'visible', {
                delayMs: 500,
                maxTries: 3,
                timeoutMs: 3000
            })
            await minicartPage.click(minicartPage.startShoppingButton)
            await delay(500)
        })

        await step("Verify - 2. Minicart can be closed by Start Shopping button - Minicart closed", async () => {
            await minicartPage.assertEqual(await minicartPage.isMinicartShown(), false, "Minicart should be closed")
            await screenshotAndAttach(basicAuthPage, './screenshots/Cartpage-empty', '02 - Minicart-closed');
            await delay(3000)
        })

        await step("Verify - 3. Minicart Explore by category URL navigation", async () => {
            await clickUntil(basicAuthPage, homePage.cartIcon, minicartPage.minicartRender, 'visible', {
                delayMs: 500,
                maxTries: 3,
                timeoutMs: 3000
            })
            await delay(500)
            const expectedURL = await homePage.getLocatorURL(minicartPage.footerCategoryItem.nth(1))
            await minicartPage.assertNavigatedURLByClickLocator(basicAuthPage, minicartPage.footerCategoryItem.nth(1), expectedURL!)
        })
    })

    test(`4. Cart page is displayed - Empty cart`, async ({ basicAuthPage }) => {
        const cartpage = createCartPage(basicAuthPage)

        await step('Go to Cart page by URL', async () => {
            await basicAuthPage.goto(`${Config.baseURL}cart`)
        })

        await step('Verify - 4. Cart page is displayed - Empty cart', async () => {
            await cartpage.assertEqual(await cartpage.isCartPageDisplayed(), true, "Cart page should be displayed")
            await cartpage.assertText(cartpage.pageTitle, t.cartpage('pageTitle'), "Verify Cart page title text")
            await cartpage.assertText(cartpage.emptymsg, t.cartpage('emptymsg'), "Verify Cart empty message text")
        })
    })
});