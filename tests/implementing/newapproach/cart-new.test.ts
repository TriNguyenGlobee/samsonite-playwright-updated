import { test, expect } from "../../../src/fixtures/test-fixture";
import { createMinicartPage } from '../../../src/factories/minicart.factory'
import { createCartPage } from '../../../src/factories/cart.factory'
import { Config } from "../../../config/env.config";
import { step } from "allure-js-commons";
import { t, clickUntil, delay, screenshotAndAttach, PageUtils } from "../../../utils/helpers/helpers";
import { createHomePage } from "../../../src/factories/home.factory"

test.describe("Cartpage-empty", () => {

    test(`
        1. Minicart empty as default and CTA navigation is correct
        2. Minicart is closes when clicking on Start Shopping Now button
        3. Click first Category Button under Explore by Category section in minicart to navigate to correct URL
        4. Verify that Cart page empty as default
    `, async ({ basicAuthPage }) => {
        const homePage = createHomePage(basicAuthPage);
        const minicartPage = createMinicartPage(basicAuthPage)
        const amountOfFooterCategoryItem = await minicartPage.getAmountFooterCategoryItems()
        const cartpage = createCartPage(basicAuthPage)
        /*
        await step("[STEP] Click on Cart icon to show minicart", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage);
            await homePage.click(homePage.cartIcon);
            await homePage.hoverByMouse(minicartPage.minicartRender);
        });

        await step("[STEP] Verify - 1. Minicart is displayed - minicart is empty", async () => {
            await step("[ChSTEP] Minicart should be shown", async () => {
                await minicartPage.assertEqual(await minicartPage.isMinicartShown(), true, "Minicart should be shown");
            });

            await step("[ChSTEP] Verify empty cart message text", async () => {
                await minicartPage.assertText(minicartPage.emptyCartMsg, t.minicart('emptymsg'), "Verify empty cart message text")
            });

            await step("[ChSTEP] Verify Start Shopping button is visible", async () => {
                await minicartPage.assertVisible(minicartPage.startShoppingButton, "Verify Start Shopping button is visible")
            });

            await step("[ChSTEP] Verify Explore by Category text is visible", async () => {
                await minicartPage.assertVisible(minicartPage.exploreByCategoryText, "Verify Explore by Category text is visible")
            });

            await step("[ChSTEP] Verify amount of footer category items", async () => {
                await minicartPage.assertEqual(await minicartPage.footerCategoryItem.count(), amountOfFooterCategoryItem, "Verify amount of footer category items")
            });

            await step("[ChSTEP] Minicart-empty-cart", async () => {
                await expect(minicartPage.minicartModal).toBeVisible({ timeout: 2000 });
            });

            await screenshotAndAttach(basicAuthPage, './screenshots/Cartpage-empty', '01 - Minicart-empty-cart');

            await delay(2000)
        })

        await step("[STEP] Click on Cart icon to show minicart", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage);
            await homePage.click(homePage.cartIcon);
            await homePage.hoverByMouse(minicartPage.minicartRender);
        })

        await step("[STEP] Click Start Shopping Now button on minicart to close minicart", async () => {
            await step("[ChSTEP] Click Start Shopping Now button to close minicart", async () => {
                await minicartPage.click(minicartPage.startShoppingButton)
            })
            await delay(500)
        })

        await step("[STEP] Verify - 2. Verify Minicart in closed", async () => {
            await minicartPage.assertEqual(await minicartPage.isMinicartShown(), false, "Minicart should be closed")
            await screenshotAndAttach(basicAuthPage, './screenshots/Cartpage-empty', '02 - Minicart-closed');
            await delay(3000)
        })

        await step("[STEP] Click on Cart icon to show minicart again", async () => {
            await clickUntil(basicAuthPage, homePage.cartIcon, minicartPage.minicartRender, 'visible', {
                delayMs: 500,
                maxTries: 3,
                timeoutMs: 3000
            })
        })

        await step("[STEP] Verify - 3. Click on first cateogry item in minicart footer and check URL navigation", async () => {
            const expectedURL = await homePage.getLocatorURL(minicartPage.footerCategoryItem.nth(0))
            await minicartPage.assertNavigatedURLByClickLocator(basicAuthPage, minicartPage.footerCategoryItem.nth(0), expectedURL!)
            await screenshotAndAttach(basicAuthPage, './screenshots/Cartpage-empty', '03 - URL navigation');
        })*/

        await step("[STEP] Go to Cart page by URL", async () => {
            await basicAuthPage.goto(`${Config.baseURL}cart`)
        })

        await step("[STEP] Verify - 4. Verify Cart page is displayed - Empty cart", async () => {
            await step("[ChSTEP] Cart page should be displayed", async () => {
                await cartpage.assertEqual(await cartpage.isCartPageDisplayed(), true, "Cart page should be displayed")
            })
            await step("[ChSTEP] Verify Cart page title text", async () => {
                await cartpage.assertText(cartpage.pageTitle, t.cartpage('pageTitle'), "Verify Cart page title text")
            })
            await step("[ChSTEP] Verify Cart empty message text", async () => {
                await cartpage.assertText(cartpage.emptymsg, t.cartpage('emptymsg'), "Verify Cart empty message text")
            })
            await screenshotAndAttach(basicAuthPage, './screenshots/Cartpage-empty', '04 - Cart page empty');
        })
    })

    test.afterEach(async ({ basicAuthPage }) => {
        await step('[STEP] [FINAL STATE]', async () => {
            await screenshotAndAttach(basicAuthPage, './screenshots/Cartpage-empty', 'Final State');
        });
    });
});