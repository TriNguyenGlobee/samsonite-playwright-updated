import { expect, test } from "../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { createHomePage } from "../../../src/factories/home.factory";
import { delay, PageUtils, t } from "../../../utils/helpers/helpers";
import { tests } from "../../../utils/helpers/localeTest";
import { steps } from "../../../utils/helpers/localeStep";
import { BrandLandingPage } from "../../../src/pages/delivery/productlistingpage/brandlandingpage/brandlanding.page";
import { createCartPage } from "../../../src/factories/cart.factory";
import { createMinicartPage } from "../../../src/factories/minicart.factory";
import { PDPPage } from "../../../src/pages/delivery/pdp/pdp.page";
import { AmericanTouristerPage } from "../../../src/pages/delivery/productlistingpage/americantourister/americantourister.page";
import { loadTestData } from "../../../utils/data"

const testData = loadTestData();

test.describe("Samsonite Brand Landing Page", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        await PageUtils.waitForPageLoad(basicAuthPage)
        await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('label')}->${t.lv2MenuItem('brand-samsonite')}`,
            "Go to Brand -> Samnonite")
    })

    tests(["jp", "sg", "tw", "my", "id"],
        `1. Center Banner is displayed
        2. Navigate to correct URL when clicking on a banner
        3. Sub-menu (jp = Hardcase, softcase ||sg = Luggage, Backpacks, Bags) are displayed
        4. Verify URL when clicking on the sub-menu
        5. The Brand Information section is shown
        `, async ({ basicAuthPage }) => {
        const brandlandingpage = new BrandLandingPage(basicAuthPage)
        const { subMenuDataSamsonite, brandInfoSamsonite } = testData;

        await steps(["jp"], "Verify center banner is displayed", async () => {
            await brandlandingpage.assertCenterBannerDisplayed(basicAuthPage, "Assert the number of banners, href, image")
        })

        await steps(["jp"], "Verify URL when clicking on a banner", async () => {
            const activeBannerURL = await brandlandingpage.getLocatorURL(brandlandingpage.activeBanner)
            await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.activeBanner, activeBannerURL!,
                "Assert the URL after clicking on active banner"
            )
        })

        await steps(["jp"], "Verify sub-mnenu (Hardcase, softcase) are displayed", async () => {
            await brandlandingpage.ssn_hardcaseMenu.scrollIntoViewIfNeeded()

            await brandlandingpage.assertLocatorInside(brandlandingpage.ssn_hardcaseMenu, subMenuDataSamsonite[0])
            await brandlandingpage.assertLocatorInside(brandlandingpage.ssn_softcaseMenu, subMenuDataSamsonite[1])
        })

        await steps(["sg", "tw", "my", "id"], "Verify sub-mnenu (Luggage, Backpacks, Bags) are displayed", async () => {
            await brandlandingpage.ssn_luggageMenu.scrollIntoViewIfNeeded()

            await brandlandingpage.assertLocatorInside(brandlandingpage.ssn_luggageMenu, subMenuDataSamsonite[0])
            await brandlandingpage.assertLocatorInside(brandlandingpage.ssn_backpacksMenu, subMenuDataSamsonite[1])
            await brandlandingpage.assertLocatorInside(brandlandingpage.ssn_bagsMenu, subMenuDataSamsonite[2])
        })

        await steps(["jp"], "Verify URL when clicking on the sub-menu (Hardcase, softcase)", async () => {
            await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.ssn_hardcaseMenu, subMenuDataSamsonite[0].href,
                "Verify URL after clicking on Hardcase menu"
            )
            await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.ssn_softcaseMenu, subMenuDataSamsonite[1].href,
                "Verify URL after clicking on Softcase menu"
            )
        })

        await steps(["sg", "tw", "my", "id"], "Verify URL when clicking on the sub-menu (Luggage, Backpacks, Bags)", async () => {
            await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.ssn_luggageMenu, subMenuDataSamsonite[0].href,
                "Verify URL after clicking on Luggage menu"
            )
            await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.ssn_backpacksMenu, subMenuDataSamsonite[1].href,
                "Verify URL after clicking on Backpacks menu"
            )
            await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.ssn_bagsMenu, subMenuDataSamsonite[2].href,
                "Verify URL after clicking on Bags menu"
            )
        })

        await steps(["jp"], "Verify brand information section is shown correctly", async () => {
            await brandlandingpage.brandInforSection.scrollIntoViewIfNeeded()

            await brandlandingpage.assertText(brandlandingpage.brInforToptitle, brandInfoSamsonite.toptile,
                "Assert brand information top title"
            )

            await brandlandingpage.assertText(brandlandingpage.brInforTitle, brandInfoSamsonite.title,
                "Assert brand information title"
            )

            await brandlandingpage.assertText(brandlandingpage.brInforContent, brandInfoSamsonite.content,
                "Assert brand information content"
            )

            await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.brInforButton, brandInfoSamsonite.href,
                "Verify URL after clicking on Brand Information section button"
            )
        })
    });

    tests(["jp", "sg", "tw", "ph", "my", "id"],`
        6. Products list table is displayed
        7. User can add product to cart
        8. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const brandlandingpage = new BrandLandingPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)

        const amount = 1

        await step("Verify products list table is shown", async () => {
            await brandlandingpage.productTableShow.scrollIntoViewIfNeeded()
            await PageUtils.waitForDomAvailable(basicAuthPage)
            await brandlandingpage.assertVisible(brandlandingpage.productTableShow,
                "Assert the products list table is shown"
            )
        })

        await step("Verify user can add product to cart", async () => {
            await delay(500)
            await Promise.all([
                cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                //expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
            ]);
        })

        await step("Verify user can go to PDP", async () => {
            await brandlandingpage.selectProdByIndex(1, "Select the first product")
            expect(await pdppage.isPDPPageDisplayed()).toBe(true)
        })
    })
});

test.describe("Samsonite Black Brand Landing Page", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        await PageUtils.waitForPageLoad(basicAuthPage)
        await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('label')}->${t.lv2MenuItem('brand-samsoniteBlack')}`, "Go to Brand -> Samnonite Black")
    })

    tests(["jp", "tw", "my", "id"],
        `1. Center Banner is displayed
        2. Navigate to correct URL when clicking on a banner
        3. Sub-menu (jp = Briefcase, Luggage, Backpacks || tw = Luggage, Backpacks, Bags) are displayed
        4. Verify URL when clicking on the sub-menu
        5. The Brand Information section is shown
        `, async ({ basicAuthPage }) => {
        const brandlandingpage = new BrandLandingPage(basicAuthPage)
        const { subMenuDataSamsoniteBlack, brandInfoSamsoniteBlack } = testData;

        await steps(["jp"], "Verify center banner is displayed", async () => {
            await brandlandingpage.assertCenterBannerDisplayed(basicAuthPage, "Assert the number of banners, href, image")
        })

        await steps(["jp"], "Verify URL when clicking on a banner", async () => {
            const activeBannerURL = await brandlandingpage.getLocatorURL(brandlandingpage.activeBanner)
            await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.activeBanner, activeBannerURL!,
                "Assert the URL after clicking on active banner"
            )
        })

        await steps(["jp", "my"], "Verify sub-mnenu are displayed", async () => {
            await brandlandingpage.ssn_bl_briefcaseMenu.scrollIntoViewIfNeeded()

            await brandlandingpage.assertLocatorInside(brandlandingpage.ssn_bl_briefcaseMenu, subMenuDataSamsoniteBlack[0])
            await brandlandingpage.assertLocatorInside(brandlandingpage.ssn_bl_luggageMenu, subMenuDataSamsoniteBlack[1])
            await brandlandingpage.assertLocatorInside(brandlandingpage.ssn_bl_backpacksMenu, subMenuDataSamsoniteBlack[2])
        })

        await steps(["tw"], "Verify sub-mnenu are displayed", async () => {
            await brandlandingpage.ssn_bl_luggageMenu.scrollIntoViewIfNeeded()

            await brandlandingpage.assertLocatorInside(brandlandingpage.ssn_bl_luggageMenu, subMenuDataSamsoniteBlack[0])
            await brandlandingpage.assertLocatorInside(brandlandingpage.ssn_bl_backpacksMenu, subMenuDataSamsoniteBlack[1])
            await brandlandingpage.assertLocatorInside(brandlandingpage.ssn_bl_bagsMenu, subMenuDataSamsoniteBlack[2])
        })

        await steps(["jp", "my", "id"], "Verify URL when clicking on the sub-menu", async () => {
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

        await steps(["tw"], "Verify URL when clicking on the sub-menu", async () => {
            await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.ssn_bl_luggageMenu, subMenuDataSamsoniteBlack[0].href,
                "Verify URL after clicking on Briefcase menu"
            )
            await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.ssn_bl_backpacksMenu, subMenuDataSamsoniteBlack[1].href,
                "Verify URL after clicking on Luggage menu"
            )
            await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.ssn_bl_bagsMenu, subMenuDataSamsoniteBlack[2].href,
                "Verify URL after clicking on Backpacks menu"
            )
        })

        await steps(["jp"], "Verify brand information section is shown correctly", async () => {
            await brandlandingpage.brandInforSection.scrollIntoViewIfNeeded()

            await brandlandingpage.assertText(brandlandingpage.brInforToptitle, brandInfoSamsoniteBlack.toptile,
                "Assert brand information top title"
            )

            await brandlandingpage.assertText(brandlandingpage.brInforTitle, brandInfoSamsoniteBlack.title,
                "Assert brand information title"
            )

            await brandlandingpage.assertText(brandlandingpage.brInforContent, brandInfoSamsoniteBlack.content,
                "Assert brand information content"
            )

            await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.brInforButton, brandInfoSamsoniteBlack.href,
                "Verify URL after clicking on Brand Information section button"
            )
        })
    });

    tests(["jp", "sg", "tw", "ph", "my", "id"],`
        6. Products list table is displayed
        7. User can add product to cart
        8. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const brandlandingpage = new BrandLandingPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)

        const amount = 1

        await step("Verify products list table is shown", async () => {
            await brandlandingpage.productTableShow.scrollIntoViewIfNeeded()
            await brandlandingpage.assertVisible(brandlandingpage.productTableShow,
                "Assert the products list table is shown"
            )
        })

        await step("Verify user can add product to cart", async () => {
            await brandlandingpage.productTableShow.scrollIntoViewIfNeeded()
            await delay(500)
            await Promise.all([
                cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                //expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
            ]);
        })

        await step("Verify user can go to PDP", async () => {
            await brandlandingpage.selectProdByIndex(1, "Select the first product")
            expect(await pdppage.isPDPPageDisplayed()).toBe(true)
        })
    })
});

test.describe("Samsonite Red Brand Landing Page", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        await PageUtils.waitForPageLoad(basicAuthPage)
        await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('label')}->${t.lv2MenuItem('brand-samsoniteRed')}`, "Go to Brand -> Samnonite Red")
    })

    tests(["jp", "sg", "tw", "my", "id"],
        `1. Center Banner is displayed
        2. Navigate to correct URL when clicking on a banner
        3. Sub-menu (Luggage, Backpacks, Bags) are displayed
        4. Verify URL when clicking on the sub-menu
        5. The Brand Information section is shown
        `, async ({ basicAuthPage }) => {
        const brandlandingpage = new BrandLandingPage(basicAuthPage)
        const { subMenuDataSamsoniteRed, brandInfoSamsoniteRed } = testData

        await steps(["jp"], "Verify center banner is displayed", async () => {
            await brandlandingpage.assertCenterBannerDisplayed(basicAuthPage, "Assert the number of banners, href, image")
        })

        await steps(["jp"], "Verify URL when clicking on a banner", async () => {
            const activeBannerURL = await brandlandingpage.getLocatorURL(brandlandingpage.activeBanner)
            await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.activeBanner, activeBannerURL!,
                "Assert the URL after clicking on active banner"
            )
        })

        await steps(["sg", "tw", "my", "id"], "Verify sub-mnenu are displayed", async () => {
            await brandlandingpage.ssn_bl_luggageMenu.scrollIntoViewIfNeeded()

            await brandlandingpage.assertLocatorInside(brandlandingpage.ssn_bl_luggageMenu, subMenuDataSamsoniteRed[0])
            await brandlandingpage.assertLocatorInside(brandlandingpage.ssn_bl_backpacksMenu, subMenuDataSamsoniteRed[1])
            await brandlandingpage.assertLocatorInside(brandlandingpage.ssn_red_bagsMenu, subMenuDataSamsoniteRed[2])
        })

        await steps(["sg", "tw", "my", "id"], "Verify URL when clicking on the sub-menu", async () => {
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

        await steps(["jp"], "Verify brand information section is shown correctly", async () => {
            await brandlandingpage.brandInforSection.scrollIntoViewIfNeeded()

            await brandlandingpage.assertText(brandlandingpage.brInforToptitle, brandInfoSamsoniteRed.toptile,
                "Assert brand information top title"
            )

            await brandlandingpage.assertText(brandlandingpage.brInforTitle, brandInfoSamsoniteRed.title,
                "Assert brand information title"
            )

            await brandlandingpage.assertText(brandlandingpage.brInforContent, brandInfoSamsoniteRed.content,
                "Assert brand information content"
            )

            await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.brInforButton, brandInfoSamsoniteRed.href,
                "Verify URL after clicking on Brand Information section button"
            )
        })
    });

    tests(["jp", "sg", "tw", "ph", "my", "id"], `
        6. Products list table is displayed
        7. User can add product to cart
        8. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const brandlandingpage = new BrandLandingPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)

        const amount = 1

        await step("Verify products list table is shown", async () => {
            await brandlandingpage.productTableShow.scrollIntoViewIfNeeded()
            await PageUtils.waitForDomAvailable(basicAuthPage)
            await brandlandingpage.assertVisible(brandlandingpage.productTableShow,
                "Assert the products list table is shown"
            )
        })

        await step("Verify user can add product to cart", async () => {
            await delay(500)
            await Promise.all([
                cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                //expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
            ]);
        })

        await step("Verify user can go to PDP", async () => {
            await brandlandingpage.selectProdByIndex(1, "Select the first product")
            expect(await pdppage.isPDPPageDisplayed()).toBe(true)
        })
    })
});

test.describe("Hartmann Brand Landing Page", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        await PageUtils.waitForPageLoad(basicAuthPage)
        await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('label')}->${t.lv2MenuItem('brand-hartmann')}`, "Go to Brand -> Hartmann")
    })

    tests(["jp"],
        `1. Center Banner is displayed
        2. Navigate to correct URL when clicking on a banner
        3. Sub-menu (Travel, Backpack, Bag, Accessory) are displayed
        4. Verify URL when clicking on the sub-menu
        5. The Brand Information section is shown
        `, async ({ basicAuthPage }) => {
        const brandlandingpage = new BrandLandingPage(basicAuthPage)
        const { subMenuDataHartmann } = testData

        await step("Verify center banner is displayed", async () => {
            await brandlandingpage.assertCenterBannerDisplayed(basicAuthPage, "Assert the number of banners, href, image")
        })

        await step("Verify URL when clicking on a banner", async () => {
            const activeBannerURL = await brandlandingpage.getLocatorURL(brandlandingpage.activeBanner)
            await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.activeBanner, activeBannerURL!,
                "Assert the URL after clicking on active banner"
            )
        })

        await step("Verify sub-mnenu are displayed", async () => {
            await brandlandingpage.travelHartmannMenu.scrollIntoViewIfNeeded()

            await brandlandingpage.assertLocatorInside(brandlandingpage.travelHartmannMenu, subMenuDataHartmann[0])
            await brandlandingpage.assertLocatorInside(brandlandingpage.backpackHartmannMenu, subMenuDataHartmann[1])
            await brandlandingpage.assertLocatorInside(brandlandingpage.bagHartmannMenu, subMenuDataHartmann[2])
            await brandlandingpage.assertLocatorInside(brandlandingpage.accessoryHartmannMenu, subMenuDataHartmann[3])
        })

        await step("Verify URL when clicking on the sub-menu", async () => {
            await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.travelHartmannMenu, subMenuDataHartmann[0].href,
                "Verify URL after clicking on Travel menu"
            )
            await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.backpackHartmannMenu, subMenuDataHartmann[1].href,
                "Verify URL after clicking on Backpacks menu"
            )
            await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.bagHartmannMenu, subMenuDataHartmann[2].href,
                "Verify URL after clicking on Bags menu"
            )
            await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.accessoryHartmannMenu, subMenuDataHartmann[3].href,
                "Verify URL after clicking on Accessory menu"
            )
        })
    });

    tests(["jp"],
        `6. Products list table is displayed
        7. User can add product to cart
        8. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const brandlandingpage = new BrandLandingPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)

        const amount = 1

        await step("Verify products list table is shown", async () => {
            await brandlandingpage.productTableShow.scrollIntoViewIfNeeded()
            await PageUtils.waitForDomAvailable(basicAuthPage)
            await brandlandingpage.assertVisible(brandlandingpage.productTableShow,
                "Assert the products list table is shown"
            )
        })

        await step("Verify user can add product to cart", async () => {
            await delay(500)
            await Promise.all([
                cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
            ]);
        })

        await step("Verify user can go to PDP", async () => {
            await brandlandingpage.selectProdByIndex(1, "Select the first product")
            expect(await pdppage.isPDPPageDisplayed()).toBe(true)
        })
    })
});

test.describe("American tourister Page", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        await PageUtils.waitForPageLoad(basicAuthPage)
        await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('label')}->${t.lv2MenuItem('brand-americantourister')}`, "Go to Brand -> American Tourister")
    })

    tests(["jp"],
        `1. Verify American Tourister page is displayed
        `, async ({ basicAuthPage }) => {
        const americantouristerpage = new AmericanTouristerPage(basicAuthPage)

        await step("Verify American Tourister page is displayed", async () => {
            await americantouristerpage.assertUrl("https://www.americantourister.jp/",
                "Assert URL of American Tourister page"
            )
        })
    });
});