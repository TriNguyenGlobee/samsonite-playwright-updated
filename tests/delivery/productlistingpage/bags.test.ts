import { expect, test } from "../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { createHomePage } from "../../../src/factories/home.factory";
import { lazyLoad, PageUtils, t, delay } from "../../../utils/helpers/helpers";
import { tests } from "../../../utils/helpers/localeTest";
import { createMinicartPage } from "../../../src/factories/minicart.factory";
import { createCartPage } from "../../../src/factories/cart.factory";
import { PDPPage } from "../../../src/pages/delivery/pdp/pdp.page";
import { createBagsPage } from "../../../src/factories/productlistingpage/bags.factory";

test.describe("Bags Page", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        await PageUtils.waitForPageLoad(basicAuthPage)
        await homepage.clickMenuItem('bags', "Go to Bags page")
    })

    test(`
        1. Assert that the Bags page is displayed
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1
        const expectedURL = t.bagspage('url')

        await step("Verity Bags page URL", async () => {
            await bagsPage.assertUrl(expectedURL.toString(), "Assert Bags page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await bagsPage.productTableShow.isVisible()) {
                await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })
        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Bags page");
        }
    })
});

test.describe("Bags Type", async () => {
    test(`
        1. Go to Briefcase Bags Type
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Briefcase Bags type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('briefcasebags')}`,
                "Go to Bags -> Type -> Briefcase Bags"
            )
        })

        await step("Verity Briefcase Bags type URL", async () => {
            await bagsPage.assertUrl(/bags\/(briefcase|type\/briefcase|briefcases)\/?$/, "Assert Briefcase Bags type URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await bagsPage.productTableShow.isVisible()) {
                await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Briefcase Bags type page");
        }
    })

    tests(["sg", "tw", "au", "my", "id", "nz"], `
        5. Go to Cross Body bags Type
        6. In-stock products are displayed when clicking on in-stock checkbox
        7. User can add product to cart
        8. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Cross Body Bags type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('crossbodybags')}`,
                "Go to Bags -> Type -> Cross Body Bags"
            )
        })

        await step("Verity Cross Body Bags type URL", async () => {
            await bagsPage.assertUrl(/bags\/(cross-body-bags|crossbody-bags)\/?$/, "Assert Cross Body Bags type URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await bagsPage.productTableShow.isVisible()) {
                await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    //expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Cross Body type page");
        }
    })

    tests(["sg", "jp", "au", "nz"], `
        9. Go to Duffle Type
        10. In-stock products are displayed when clicking on in-stock checkbox
        11. User can add product to cart
        12. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Duffle type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('dufflebags')}`,
                "Go to Bags -> Type -> Duffle Bags"
            )
        })

        await step("Verity Duffle type URL", async () => {
            await bagsPage.assertUrl(/bags\/(duffle|type\/duffles|duffles)\/?$/, "Assert Duffle type URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await bagsPage.productTableShow.isVisible()) {
                await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Duffle type page");
        }
    })

    test(`
        13. Go to Totes Type
        14. In-stock products are displayed when clicking on in-stock checkbox
        15. User can add product to cart
        16. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Totes type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('tote')}`,
                "Go to Bags -> Type -> Totes"
            )
        })

        await step("Verity Totes type URL", async () => {
            await bagsPage.assertUrl(/bags\/(totes|type\/tote)\/?$/, "Assert Totes type URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await bagsPage.productTableShow.isVisible()) {
                await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Totes type page");
        }
    })

    tests(["sg", "tw", "my", "id"], `
            17. Go to For Her Type
            18. In-stock products are displayed when clicking on in-stock checkbox
            19. User can add product to cart
            20. Go to the PDP
            `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to For Her type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('bagsforher')}`,
                "Go to Bags -> Type -> For Her"
            )
        })

        await step("Verity For Her type URL", async () => {
            await bagsPage.assertUrl(/bags\/(for-her)\/?$/, "Assert For Her type URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await bagsPage.productTableShow.isVisible()) {
                await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on For Her type page");
        }
    })

    tests(["jp"], `
        21. Go to Leather Type
        22. In-stock products are displayed when clicking on in-stock checkbox
        23. User can add product to cart
        24. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Leather type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('leather')}`,
                "Go to Bags -> Type -> Leather"
            )
        })

        await step("Verity Leather type URL", async () => {
            await bagsPage.assertUrl(/bags\/(type\/leather)\/?$/, "Assert Leather type URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await bagsPage.productTableShow.isVisible()) {
                await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Leather type page");
        }
    })

    tests(["jp"], `
        25. Go to 2 way 3 way Type
        26. In-stock products are displayed when clicking on in-stock checkbox
        27. User can add product to cart
        28. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to 2 way 3 way type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('2way3way')}`,
                "Go to Bags -> Type -> 2WAY／3WAY"
            )
        })

        await step("Verity 2WAY／3WAY type URL", async () => {
            await bagsPage.assertUrl(/bags\/(type\/2-way)\/?$/, "Assert 2WAY／3WAY type URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await bagsPage.productTableShow.isVisible()) {
                await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on 2WAY／3WAY type page");
        }
    })

    tests(["jp"], `
        29. Go to Shoulder Type
        30. In-stock products are displayed when clicking on in-stock checkbox
        31. User can add product to cart
        32. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Shoulder type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('shoulderbags')}`,
                "Go to Bags -> Type -> Shoulder"
            )
        })

        await step("Verity Shoulder type URL", async () => {
            await bagsPage.assertUrl(/bags\/(type\/shoulder-bag)\/?$/, "Assert Shoulder type URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await bagsPage.productTableShow.isVisible()) {
                await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Shoulder type page");
        }
    })

    tests(["jp"], `
        33. Go to Woman Type
        34. In-stock products are displayed when clicking on in-stock checkbox
        35. User can add product to cart
        36. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Woman type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('woman')}`,
                "Go to Bags -> Type -> Woman"
            )
        })

        await step("Verity Woman type URL", async () => {
            await bagsPage.assertUrl(/bags?(?:\/expandable)?\/?(?:\?.*)?$/, "Assert Woman type URL");
        })

        await step("Click In-stock checkbox", async () => {
            if (await bagsPage.productTableShow.isVisible()) {
                await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Woman type page");
        }
    })

    tests(["sg", "jp", "au", "id"], `
        37. Go to Shop all bags
        38. In-stock products are displayed when clicking on in-stock checkbox
        39. User can add product to cart
        40. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Shop all bags", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('shopallbags')}`,
                "Go to Bags -> Type -> Shop all bags"
            )
        })

        await step("Verity Shop all bags type URL", async () => {
            await bagsPage.assertUrl(`${t.bagspage('url')}`, "Assert Shop all bags URL")
        })

        await step("Click In-stock checkbox", async () => {
            await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Shop all bags page");
        }
    })

    tests(["tw", "my", "id"], `
        41. Go to Sling Type
        42. In-stock products are displayed when clicking on in-stock checkbox
        43. User can add product to cart
        44. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Sling type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('slingbags')}`,
                "Go to Bags -> Type -> Sling"
            )
        })

        await step("Verity Woman type URL", async () => {
            await bagsPage.assertUrl(/bags\/sling/, "Assert Woman type URL");
        })

        await step("Click In-stock checkbox", async () => {
            if (await bagsPage.productTableShow.isVisible()) {
                await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    //expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Woman type page");
        }
    })
})

test.describe("Bags Colours", async () => {
    tests(["jp", "ph", "sg", "tw", "id"], `
        1. Go to Mono color page
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const amount = 1

        await step("Go to Mono color page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('color')}->${t.lv2MenuItem('mono')}`,
                "Go to Bags -> Colours -> Mono"
            )
        })

        await step("Verity Mono color page URL", async () => {
            await bagsPage.assertUrl(/((bags\/black_grey_white|グレー_ブラック_ホワイト)|(bag\/灰色_白色_銀色_黑色|black_grey_white))\/?$/, "Assert Mono colours page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart")
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Mono color page");
        }
    })

    tests(["jp", "ph", "sg", "tw", "id"], `
        5. Go to Cool color page
        6. In-stock products are displayed when clicking on in-stock checkbox
        7. User can add product to cart
        8. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Cool color", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('color')}->${t.lv2MenuItem('cool')}`,
                "Go to Bags -> Colours -> Cool"
            )
        })

        await step("Verity Softside type URL", async () => {
            await bagsPage.assertUrl(/((bags\/blue_green_navy|グリーン_ネイビー_ブルー)|(bag\/海軍藍色_紫色_綠色_藍色|blue_green_navy))\/?$/, "Assert Cool Color page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Cool colours page");
        }
    })

    tests(["jp", "ph", "sg", "tw", "id"], `
        9. Go to Warm color page
        10. In-stock products are displayed when clicking on in-stock checkbox
        11. User can add product to cart
        12. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Warm colours page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('color')}->${t.lv2MenuItem('warm')}`,
                "Go to Bags -> Colours -> Warm"
            )
        })

        await step("Verity Large size page URL", async () => {
            await bagsPage.assertUrl(/((bags\/beige_orange_pink_red_yellow|オレンジ_ピンク_レッド)|bag\/海軍藍色_紫色_綠色_藍色|beige_orange_pink_red_yellow)\/?$/, "Assert Warm color page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Warm colour page");
        }
    })

    test(`
            13. Go to Shop all colours page
            14. In-stock products are displayed when clicking on in-stock checkbox
            15. User can add product to cart
            16. Go to the PDP
            `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const amount = 1

        await step("Go to Shop all colours page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('color')}->${t.lv2MenuItem('shopallcolour')}`,
                "Go to Bags -> Colours -> Shop all colours"
            )
        })

        await step("Verity Large size page URL", async () => {
            await bagsPage.assertUrl(/bags\/(shop-all-colours\/?$|bags-all-color|more-colours|\/?$)/, "Assert Shop all colours page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    //expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Shop all colours page");
        }
    })

    tests(["au"], `
        17. Go to Black color page
        18. In-stock products are displayed when clicking on in-stock checkbox
        19. User can add product to cart
        20. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const amount = 1

        await step("Go to Black color page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('color')}->${t.lv2MenuItem('black')}`,
                "Go to Bags -> Colours -> Black"
            )
        })

        await step("Verity Black color page URL", async () => {
            await bagsPage.assertUrl(/bags\/black/, "Assert Black colours page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart")
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Black color page");
        }
    })

    tests(["au"], `
        21. Go to Blue color page
        22. In-stock products are displayed when clicking on in-stock checkbox
        23. User can add product to cart
        24. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const amount = 1

        await step("Go to Blue color page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('color')}->${t.lv2MenuItem('blue')}`,
                "Go to Bags -> Colours -> Blue"
            )
        })

        await step("Verity Blue color page URL", async () => {
            await bagsPage.assertUrl(/bags\/blue/, "Assert Blue colours page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart")
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Blue color page");
        }
    })

    tests(["au"], `
        25. Go to Brown color page
        26. In-stock products are displayed when clicking on in-stock checkbox
        27. User can add product to cart
        28. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const amount = 1

        await step("Go to Brown color page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('color')}->${t.lv2MenuItem('brown')}`,
                "Go to Bags -> Colours -> Brown"
            )
        })

        await step("Verity Brown color page URL", async () => {
            await bagsPage.assertUrl(/bags\/brown/, "Assert Brown colours page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart")
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Brown color page");
        }
    })

    tests(["au"], `
        29. Go to Green color page
        30. In-stock products are displayed when clicking on in-stock checkbox
        31. User can add product to cart
        32. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const amount = 1

        await step("Go to Green color page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('color')}->${t.lv2MenuItem('green')}`,
                "Go to Bags -> Colours -> Green"
            )
        })

        await step("Verity Green color page URL", async () => {
            await bagsPage.assertUrl(/bags\/green/, "Assert Green colours page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart")
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Green color page");
        }
    })
})

test.describe("Bags Labels/Brand", async () => {
    tests(["jp", "ph", "sg", "tw", "id"], `
        1. Go to Samsonite page
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const amount = 1

        await step("Go to Samsonite page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('labels')}->${t.lv2MenuItem('samsonite')[2]}`,
                "Go to Bags -> Labels/Brand -> Samsonite"
            )
        })

        await step("Verity Samsonite page URL", async () => {
            await bagsPage.assertUrl(/bags\/(brand-samsonite|brand\/samsonite)\/?$/, "Assert Samsonite page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await bagsPage.productTableShow.isVisible()) {
                await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Samsonite page");
        }
    })

    tests(["sg", "jp", "tw", "id"], `
        5. Go to Samsonite black page
        6. In-stock products are displayed when clicking on in-stock checkbox
        7. User can add product to cart
        8. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const amount = 1

        await step("Go to Samsonite black", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('labels')}->${t.lv2MenuItem('samsoniteblack')[2]}`,
                "Go to Bags -> Labels/Brand -> Samsonite Black"
            )
        })

        await step("Verity Samsonite Black page URL", async () => {
            await bagsPage.assertUrl(/bags\/(brand-samsonite-black|brand\/samsonite-black)\/?$/, "Assert Samsonite Black page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await bagsPage.productTableShow.isVisible()) {
                await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Samsonite Black page");
        }
    })

    tests(["jp", "ph", "sg", "tw", "id"], `
        9. Go to Samsonite Red page
        10. In-stock products are displayed when clicking on in-stock checkbox
        11. User can add product to cart
        12. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Samsonite Red page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('labels')}->${t.lv2MenuItem('samsonitered')[2]}`,
                "Go to Bags -> Labels/Brand -> Samsonite Red"
            )
        })

        await step("Verity Samsonite Red page URL", async () => {
            await bagsPage.assertUrl(/bags\/(brand-samsonite-red|brand\/samsonite-red)\/?$/, "Assert Samsonite Red page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await bagsPage.productTableShow.isVisible()) {
                await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Samsonite Red page");
        }
    })

    tests(["jp"], `
        13. Go to Hartmann page
        14. In-stock products are displayed when clicking on in-stock checkbox
        15. User can add product to cart
        16. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Hartmann page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('labels')}->${t.lv2MenuItem('hartmann')[2]}`,
                "Go to Bags -> Labels/Brand -> Hartmann"
            )
        })

        await step("Verity Hartmann page URL", async () => {
            await bagsPage.assertUrl(/bags\/(brand\/hartmann)\/?$/, "Assert Hartmann page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await bagsPage.productTableShow.isVisible()) {
                await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Hartmann page");
        }
    })
})

test.describe("Bags laptop", async () => {
    tests(["au", "jp", "my", "ph", "sg", "tw"], `
        1. Go to 13" laptop page
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const amount = 1

        await step("Go to 13\" laptop page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('laptop')}->${t.lv2MenuItem('13inchlaptop')}`,
                "Go to Bags -> Labels/Brand -> 13\" Laptop"
            )
        })

        await step("Verity 13\" laptop page URL", async () => {
            await bagsPage.assertUrl(/bags\/(fit-up-to-13"-laptop|fit-up-to-13-laptop|laptop\/13-inch)\/?$/, "Assert 13\" Laptop page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await bagsPage.productTableShow.isVisible()) {
                await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart")
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on 13\" Laptop page");
        }
    })

    tests(["au", "jp", "my", "ph", "sg", "tw"], `
        5. Go to 15" laptop page
        6. In-stock products are displayed when clicking on in-stock checkbox
        7. User can add product to cart
        8. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const amount = 1

        await step("Go to 15\" laptop page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('laptop')}->${t.lv2MenuItem('15inchlaptop')}`,
                "Go to Bags -> Labels/Brand -> 15\" Laptop"
            )
        })

        await step("Verity 15\" laptop page URL", async () => {
            await bagsPage.assertUrl(/bags\/(fit-up-to-15"-laptop|fit-up-to-15-laptop|laptop\/15-inch)\/?$/, "Assert 15\" Laptop page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await bagsPage.productTableShow.isVisible()) {
                await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart")
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on 15\" Laptop page");
        }
    })

    tests(["sg", "jp", "tw", "au"], `
        9. Go to 17" laptop page
        10. In-stock products are displayed when clicking on in-stock checkbox
        11. User can add product to cart
        12. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const amount = 1

        await step("Go to 17\" laptop page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('laptop')}->${t.lv2MenuItem('17inchlaptop')}`,
                "Go to Bags -> Labels/Brand -> 17\" Laptop"
            )
        })

        await step("Verity 17\" laptop page URL", async () => {
            await bagsPage.assertUrl(/bags\/(fit-up-to-17"-laptop|fit-up-to-17-laptop|laptop\/17.3-inch)\/?$/, "Assert 17\" Laptop page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await bagsPage.productTableShow.isVisible()) {
                await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart")
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on 17\" Laptop page");
        }
    })
})

test.describe("Bags Collection", async () => {
    tests(["sg"], `
        1. Go to Pro-Dxl 6 page
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Pro-Dxl 6 page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('prodlx6')}`,
                "Go to Bags -> Collection -> Pro Dxl 6"
            )
        })

        await step("Verity Adventure page URL", async () => {
            await bagsPage.assertUrl(/(collection\/pro-dlx-6)\/?$/, "Assert Pro Dxl 6 page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Pro-Dxl 6 page");
        }
    })

    tests(["sg"], `
        5. Go to Sammies dream page
        6. In-stock products are displayed when clicking on in-stock checkbox
        7. User can add product to cart
        8. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Sammies dream page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('sammiesdream')}`,
                "Go to Bags -> Collection -> Sammies Dream"
            )
        })

        await step("Verity Sammies Dream page URL", async () => {
            await bagsPage.assertUrl(/bags\/collection\/sammies-dream/, "Assert Sammies Dream page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Sammies Dream page");
        }
    })

    tests(["sg"], `
        9. Go to Prudence-eco page
        10. In-stock products are displayed when clicking on in-stock checkbox
        11. User can add product to cart
        12. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Prudence-eco page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('prudenceeco')}`,
                "Go to Bags -> Collection -> Prudence-eco"
            )
        })

        await step("Verity Prudence-eco page URL", async () => {
            await bagsPage.assertUrl(/bags\/collection\/prudence-eco/, "Assert Prudence-eco page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Prudence-eco page");
        }
    })

    tests(["jp"], `
        13. Go to Sub-lim page
        14. In-stock products are displayed when clicking on in-stock checkbox
        15. User can add product to cart
        16. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Sub-lim page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('backpack-sub-limcollection')}`,
                "Go to Bags -> Collection -> Sub-lim"
            )
        })

        await step("Verity Sub-lim page URL", async () => {
            await bagsPage.assertUrl(/sub-lim/, "Assert Sub-lim page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Sub-lim page");
        }
    })

    tests(["jp"], `
        17. Go to Epid 4 page
        18. In-stock products are displayed when clicking on in-stock checkbox
        19. User can add product to cart
        20. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Epid 4 page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('epid4')}`,
                "Go to Bags -> Collection -> Epid 4"
            )
        })

        await step("Verity Epid 4 page URL", async () => {
            await bagsPage.assertUrl(/epid-4/, "Assert Epid 4 page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Epid 4 page");
        }
    })

    tests(["jp"], `
        21. Go to Debonair 5 page
        22. In-stock products are displayed when clicking on in-stock checkbox
        23. User can add product to cart
        24. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Debonair 5 page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('debonair5')}`,
                "Go to Bags -> Collection -> Debonair 5"
            )
        })

        await step("Verity Debonair 5 page URL", async () => {
            await bagsPage.assertUrl(/デボネア/, "Assert Debonair 5 page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Debonair 5 page");
        }
    })

    tests(["jp"], `
        25. Go to Black DMX page
        26. In-stock products are displayed when clicking on in-stock checkbox
        27. User can add product to cart
        28. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Black DMX page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('blackdmx')}`,
                "Go to Bags -> Collection -> Black DMX"
            )
        })

        await step("Verity Black DMX page URL", async () => {
            await bagsPage.assertUrl(/ホクストン/, "Assert Black DMX page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Black DMX page");
        }
    })

    tests(["jp"], `
        29. Go to Glendale page
        30. In-stock products are displayed when clicking on in-stock checkbox
        31. User can add product to cart
        32. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Glendale page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('glendale')}`,
                "Go to Bags -> Collection -> Glendale"
            )
        })

        await step("Verity Glendale page URL", async () => {
            await bagsPage.assertUrl(/glendale/, "Assert Glendale page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Glendale page");
        }
    })

    tests(["au"], `
        33. Go to Classic Leather page
        34. In-stock products are displayed when clicking on in-stock checkbox
        35. User can add product to cart
        36. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Classic Leather page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('bagscollection')}->${t.lv2MenuItem('classicleather')}`,
                "Go to Bags -> Collection -> Classic Leather"
            )
        })

        await step("Verity Classic Leather page URL", async () => {
            await bagsPage.assertUrl(/sam-classic-leather/, "Assert Classic Leather page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Classic Leather page");
        }
    })

    tests(["au"], `
        37. Go to Albi page
        38. In-stock products are displayed when clicking on in-stock checkbox
        39. User can add product to cart
        40. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Albi page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('bagscollection')}->${t.lv2MenuItem('albi')}`,
                "Go to Bags -> Collection -> Albi"
            )
        })

        await step("Verity Albi page URL", async () => {
            await bagsPage.assertUrl(/albi/, "Assert Albi page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Albi page");
        }
    })

    tests(["au"], `
        41. Go to Sonora page
        42. In-stock products are displayed when clicking on in-stock checkbox
        43. User can add product to cart
        44. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Sonora page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('bagscollection')}->${t.lv2MenuItem('sonora')}`,
                "Go to Bags -> Collection -> Sonora"
            )
        })

        await step("Verity Sonora page URL", async () => {
            await bagsPage.assertUrl(/sonora/, "Assert Sonora page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await bagsPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await bagsPage.assertHidden(bagsPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await bagsPage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await bagsPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Sonora page");
        }
    })

    tests(["au"], `
        45. Go to Shop all collections page
        46. In-stock products are displayed when clicking on in-stock checkbox
        47. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const bagsPage = createBagsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Shop all collections page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('bags')}->${t.lv2MenuItem('bagscollection')}->${t.lv2MenuItem('shopallbagscollection')}`,
                "Go to Bags -> Collection -> Shop all collections"
            )
        })

        await step("Verity Shop all collections page URL", async () => {
            await bagsPage.assertUrl(/collection/, "Assert Shop all collections page URL")
        })
    })
})