import { expect, test } from "../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { createHomePage } from "../../../src/factories/home.factory";
import { delay, PageUtils, t, screenshotAndAttach, scrollToBottom, clickUntil } from "../../../utils/helpers/helpers";
import { BrandLandingPage } from "../../../src/pages/delivery/productlistingpage/brandlandingpage/brandlanding.page";
import { createCartPage } from "../../../src/factories/cart.factory";
import { createMinicartPage } from "../../../src/factories/minicart.factory";
import { PDPPage } from "../../../src/pages/delivery/pdp/pdp.page";
import { loadTestData } from "../../../utils/data"

const testData = loadTestData();

test.describe("Brand Landing Page - Samsonite Brand", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        await PageUtils.waitForPageLoad(basicAuthPage)
        await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('label')}->${t.lv2MenuItem('brand-samsonite')}`,
            "Go to Brand -> Samnonite")
    })
    
        test(`
            1. Click highlight category to navigate to correct URL - Correct page is displayed
            `, async ({ basicAuthPage }) => {
            const brandlandingpage = new BrandLandingPage(basicAuthPage)
            const { subMenuDataSamsonite } = testData;
    
            await step("Verify - 1. Click highlight category to navigate to correct URL - Correct page is displayed", async () => {
                await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.ssn_luggageMenu, subMenuDataSamsonite[0].href,
                    "Verify URL after clicking on Luggage menu"
                )
                await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.ssn_backpacksMenu, subMenuDataSamsonite[1].href,
                    "Verify URL after clicking on Backpacks menu"
                )
                await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.ssn_bagsMenu, subMenuDataSamsonite[2].href,
                    "Verify URL after clicking on Bags menu"
                )
    
                await screenshotAndAttach(basicAuthPage, './screenshots/Brand-landing-page-Samsonite', '01 - Highlight category');
            })
        });
    
    test(`
        2. Products list table is displayed - Products section shown correctly
        3. User can add product to cart - Minicart is shown after adding product
        4. Clicking on a product navigates to PDP - PDP page is displayed
        `, async ({ basicAuthPage }) => {
        const brandlandingpage = new BrandLandingPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const homepage = createHomePage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)

        const amount = 1

        await step("Verify - 2. Products list table is displayed - Products section shown correctly", async () => {
            await scrollToBottom(basicAuthPage)
            await brandlandingpage.viewAllProducts.scrollIntoViewIfNeeded()
            await brandlandingpage.click(brandlandingpage.viewAllProducts, "Click on View All Products button to see the products list")
            await brandlandingpage.assertLocatorInViewport(brandlandingpage.productTableShow)
            await screenshotAndAttach(basicAuthPage, './screenshots/Brand-landing-page-Samsonite', '02 - Products list table');
        })

        await step("Verify - 3. User can add product to cart - Minicart is shown after adding product", async () => {
            await delay(500)
            await Promise.all([
                cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                //expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
            ]);
            await clickUntil(basicAuthPage, homepage.cartIcon, minicartpage.minicartRender, 'visible', {
                delayMs: 500,
                maxTries: 3,
                timeoutMs: 3000
            })
            await screenshotAndAttach(basicAuthPage, './screenshots/Brand-landing-page-Samsonite', '03 - Minicart');
        })

        await step("Verify - 4. Clicking on a product navigates to PDP - PDP page is displayed", async () => {
            await brandlandingpage.selectProdByIndex(1, "Select the first product")
            await pdppage.assertEqual(await pdppage.isPDPPageDisplayed(), true, "Assert that PDP page is displayed")
            await screenshotAndAttach(basicAuthPage, './screenshots/Brand-landing-page-Samsonite', '04 - PDP page');
        })
    })
});

test.describe("Brand Landing Page - Samsonite Black Brand", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        await PageUtils.waitForPageLoad(basicAuthPage)
        await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('label')}->${t.lv2MenuItem('brand-samsoniteBlack')}`, "Go to Brand -> Samnonite Black")
    })

    test(`1. Click highlight category to navigate to correct URL - Correct page is displayed`, async ({ basicAuthPage }) => {
        const brandlandingpage = new BrandLandingPage(basicAuthPage)
        const { subMenuDataSamsoniteBlack } = testData;

        await step("Verify URL when clicking on the sub-menu", async () => {
            await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.ssn_bl_briefcaseMenu, subMenuDataSamsoniteBlack[0].href,
                "Verify URL after clicking on Briefcase menu"
            )
            await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.ssn_bl_luggageMenu, subMenuDataSamsoniteBlack[1].href,
                "Verify URL after clicking on Luggage menu"
            )
            await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.ssn_bl_backpacksMenu, subMenuDataSamsoniteBlack[2].href,
                "Verify URL after clicking on Backpacks menu"
            )
        })

        await screenshotAndAttach(basicAuthPage, './screenshots/Brand-landing-page-Samsonite-black', '01 - Highlight category');
    });

    test(`
        2. Products list table is displayed - Products section shown correctly
        3. User can add product to cart - Minicart is shown after adding product
        4. Clicking on a product navigates to PDP - PDP page is displayed
        `, async ({ basicAuthPage }) => {
        const brandlandingpage = new BrandLandingPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const homepage = createHomePage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)

        const amount = 1

        await step("Verify - 2. Products list table is displayed - Products section shown correctly", async () => {
            await scrollToBottom(basicAuthPage)
            await brandlandingpage.viewAllProducts.scrollIntoViewIfNeeded()
            await brandlandingpage.click(brandlandingpage.viewAllProducts, "Click on View All Products button to see the products list")
            await brandlandingpage.assertLocatorInViewport(brandlandingpage.productTableShow)
            await screenshotAndAttach(basicAuthPage, './screenshots/Brand-landing-page-Samsonite-black', '02 - Products list table');
        })

        await step("Verify - 3. User can add product to cart - Minicart is shown after adding product", async () => {
            await delay(500)
            await Promise.all([
                cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                //expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
            ]);
            await clickUntil(basicAuthPage, homepage.cartIcon, minicartpage.minicartRender, 'visible', {
                delayMs: 500,
                maxTries: 3,
                timeoutMs: 3000
            })
            await screenshotAndAttach(basicAuthPage, './screenshots/Brand-landing-page-Samsonite-black', '03 - Minicart');
        })

        await step("Verify - 4. Clicking on a product navigates to PDP - PDP page is displayed", async () => {
            await brandlandingpage.selectProdByIndex(1, "Select the first product")
            await pdppage.assertEqual(await pdppage.isPDPPageDisplayed(), true, "Assert that PDP page is displayed")
            await screenshotAndAttach(basicAuthPage, './screenshots/Brand-landing-page-Samsonite-black', '04 - PDP page');
        })
    })
});

test.describe("Brand Landing Page - Samsonite Red Brand", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        await PageUtils.waitForPageLoad(basicAuthPage)
        await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('label')}->${t.lv2MenuItem('brand-samsoniteRed')}`, "Go to Brand -> Samnonite Red")
    })

    test(`1. Click highlight category to navigate to correct URL - Correct page is displayed`, async ({ basicAuthPage }) => {
        const brandlandingpage = new BrandLandingPage(basicAuthPage)
        const { subMenuDataSamsoniteRed, brandInfoSamsoniteRed } = testData

        await step("Verify URL when clicking on the sub-menu", async () => {
            await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.ssn_bl_luggageMenu, subMenuDataSamsoniteRed[0].href,
                "Verify URL after clicking on Luggage menu"
            )
            await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.ssn_bl_backpacksMenu, subMenuDataSamsoniteRed[1].href,
                "Verify URL after clicking on Backpacks menu"
            )
            await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.ssn_red_bagsMenu, subMenuDataSamsoniteRed[2].href,
                "Verify URL after clicking on Bags menu"
            )
        })

        await screenshotAndAttach(basicAuthPage, './screenshots/Brand-landing-page-Samsonite-red', '01 - Highlight category');
    });

    test(`
        2. Products list table is displayed - Products section shown correctly
        3. User can add product to cart - Minicart is shown after adding product
        4. Clicking on a product navigates to PDP - PDP page is displayed
        `, async ({ basicAuthPage }) => {
        const brandlandingpage = new BrandLandingPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const homepage = createHomePage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)

        const amount = 1

        await step("Verify - 2. Products list table is displayed - Products section shown correctly", async () => {
            await scrollToBottom(basicAuthPage)
            await brandlandingpage.viewAllProducts.scrollIntoViewIfNeeded()
            await brandlandingpage.click(brandlandingpage.viewAllProducts, "Click on View All Products button to see the products list")
            await brandlandingpage.assertLocatorInViewport(brandlandingpage.productTableShow)
            await screenshotAndAttach(basicAuthPage, './screenshots/Brand-landing-page-Samsonite-red', '02 - Products list table');
        })

        await step("Verify - 3. User can add product to cart - Minicart is shown after adding product", async () => {
            await delay(500)
            await Promise.all([
                cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                //expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
            ]);
            await clickUntil(basicAuthPage, homepage.cartIcon, minicartpage.minicartRender, 'visible', {
                delayMs: 500,
                maxTries: 3,
                timeoutMs: 3000
            })
            await screenshotAndAttach(basicAuthPage, './screenshots/Brand-landing-page-Samsonite-red', '03 - Minicart');
        })

        await step("Verify - 4. Clicking on a product navigates to PDP - PDP page is displayed", async () => {
            await brandlandingpage.selectProdByIndex(1, "Select the first product")
            await pdppage.assertEqual(await pdppage.isPDPPageDisplayed(), true, "Assert that PDP page is displayed")
            await screenshotAndAttach(basicAuthPage, './screenshots/Brand-landing-page-Samsonite-red', '04 - PDP page');
        })
    })
});