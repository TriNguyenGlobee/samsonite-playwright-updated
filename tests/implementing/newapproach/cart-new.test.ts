import { test, expect } from "../../../src/fixtures/test-fixture";
import { createMinicartPage } from '../../../src/factories/minicart.factory'
import { createCartPage } from '../../../src/factories/cart.factory'
import { Config } from "../../../config/env.config";
import { step } from "allure-js-commons";
import { t, clickUntil, delay, screenshotAndAttach } from "../../../utils/helpers/helpers";
import { createHomePage } from "../../../src/factories/home.factory"

test.describe("Cartpage-empty", () => {

    test(`Minicart - Verify that minicart empty as default and CTA navigation is correct`, async ({ basicAuthPage }) => {
        const homePage = createHomePage(basicAuthPage);
        const minicartPage = createMinicartPage(basicAuthPage)
        const amountOfFooterCategoryItem = await minicartPage.getAmountFooterCategoryItems()

        await step("[STEP] Click on Cart icon to show minicart", async () => {
            await homePage.click(homePage.cartIcon)
        })

        await step("[STEP] Verify - 1. Minicart is displayed - Minicart is empty", async () => {
            await minicartPage.assertEqual(await minicartPage.isMinicartShown(), true, "Minicart should be shown")
            await minicartPage.assertText(minicartPage.emptyCartMsg, t.minicart('emptymsg'), "Verify empty cart message text")
            await minicartPage.assertVisible(minicartPage.startShoppingButton, "Verify Start Shopping button is visible")
            await minicartPage.assertVisible(minicartPage.exploreByCategoryText, "Verify Explore by Category text is visible")
            await minicartPage.assertEqual(await minicartPage.footerCategoryItem.count(), amountOfFooterCategoryItem, "Verify amount of footer category items")
            await expect(minicartPage.minicartModal).toBeVisible({ timeout: 2000 });

            await screenshotAndAttach(basicAuthPage, './screenshots/Cartpage-empty', '01 - Minicart-empty-cart');
            await delay(1500)
        })

        await step("[STEP] Click Start Shopping Now button on minicart to close minicart", async () => {
            await step("[ChSTEP] Click on Cart icon to show minicart", async () => {
                await clickUntil(basicAuthPage, homePage.cartIcon, minicartPage.minicartRender, 'visible', {
                    delayMs: 500,
                    maxTries: 3,
                    timeoutMs: 3000
                })
            })
            await step("[ChSTEP] Click Start Shopping Now button to close minicart", async () => {
                await minicartPage.click(minicartPage.startShoppingButton)
            })
            await delay(500)
        })

        await step("[STEP] Verify - 2. Minicart is closed", async () => {
            await minicartPage.assertEqual(await minicartPage.isMinicartShown(), false, "Minicart should be closed")
            await screenshotAndAttach(basicAuthPage, './screenshots/Cartpage-empty', '02 - Minicart-closed');
            await delay(3000)
        })

        await step("[STEP] Verify - 3. Minicart Explore By Category URL navigation is correct", async () => {
            await step("[ChSTEP] Click on Cart icon to show minicart", async () => {
                await clickUntil(basicAuthPage, homePage.cartIcon, minicartPage.minicartRender, 'visible', {
                    delayMs: 500,
                    maxTries: 3,
                    timeoutMs: 3000
                })
            })
            await delay(500)

            const expectedURL = await homePage.getLocatorURL(minicartPage.footerCategoryItem.nth(1))

            await step("[ChSTEP] Click on first category item in minicart footer and check URL navigation", async () => {
                await minicartPage.assertNavigatedURLByClickLocator(basicAuthPage, minicartPage.footerCategoryItem.nth(1), expectedURL!)
                await screenshotAndAttach(basicAuthPage, './screenshots/Cartpage-empty', '03 - URL navigation');
            })
        })
    })

    test(`Cart page - Verify that Cart page empty as default`, async ({ basicAuthPage }) => {
        const cartpage = createCartPage(basicAuthPage)

        await step("[STEP] Go to Cart page by URL", async () => {
            await basicAuthPage.goto(`${Config.baseURL}cart`)
        })

        await step("[STEP] Verify - 4. Cart page is displayed - Empty cart", async () => {
            await cartpage.assertEqual(await cartpage.isCartPageDisplayed(), true, "Cart page should be displayed")
            await cartpage.assertText(cartpage.pageTitle, t.cartpage('pageTitle'), "Verify Cart page title text")
            await cartpage.assertText(cartpage.emptymsg, t.cartpage('emptymsg'), "Verify Cart empty message text")
            await screenshotAndAttach(basicAuthPage, './screenshots/Cartpage-empty', '04 - Cart page empty');
        })
    })

    test.afterEach(async ({ basicAuthPage }) => {
        await step('[STEP] [FINAL STATE]', async () => {
            await screenshotAndAttach(basicAuthPage, './screenshots/Cartpage-empty', 'Final State');
        });
    });
});