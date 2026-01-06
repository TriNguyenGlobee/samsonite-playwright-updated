import { expect, test } from "../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { createHomePage } from "../../../src/factories/home.factory";
import { lazyLoad, PageUtils, t, delay } from "../../../utils/helpers/helpers";
import { tests } from "../../../utils/helpers/localeTest";
import { createMinicartPage } from "../../../src/factories/minicart.factory";
import { createCartPage } from "../../../src/factories/cart.factory";
import { PDPPage } from "../../../src/pages/delivery/pdp/pdp.page";
import { createLuggagePage } from "../../../src/factories/productlistingpage/luggage.factory";

test.describe("Luggage Page", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        await PageUtils.waitForPageLoad(basicAuthPage)
        await homepage.clickMenuItem('luggage', "Go to Luggage page")
    })

    test(`
        1. Assert that the Luggage page is displayed
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1
        const expectedURL = t.luggagepage('url')

        await step("Verity Luggage page URL", async () => {
            await luggagepage.assertUrl(expectedURL.toString(), "Assert Luggage page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })
        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Luggage page");
        }
    })
});

test.describe("Luggage Type", async () => {
    test(`
        1. Go to Hardside Type
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Hardside type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('hardside')}`,
                "Go to Luggage -> Type -> Hardside"
            )
        })

        await step("Verity Hardside type URL", async () => {
            await luggagepage.assertUrl(/(luggage\/(?:type\/hard|hardside|type\/hardside)\/?$)|(suitcases\/hardside)/, "Assert Hardside type URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Hardside type page");
        }
    })

    test(`
        5. Go to Softside Type
        6. In-stock products are displayed when clicking on in-stock checkbox
        7. User can add product to cart
        8. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Softside type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('softside')}`,
                "Go to Luggage -> Type -> Softside"
            )
        })

        await step("Verity Softside type URL", async () => {
            await luggagepage.assertUrl(/(luggage\/(?:type\/soft|softside|type\/softside)\/?$)|(suitcases\/softside)/, "Assert Softside type URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Softside type page");
        }
    })

    tests(["au", "jp", "ph", "sg", "tw", "id"], `
        9. Go to Aluminium Type
        10. In-stock products are displayed when clicking on in-stock checkbox
        11. User can add product to cart
        12. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Aluminium type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('aluminium')}`,
                "Go to Luggage -> Type -> Aluminium"
            )
        })

        await step("Verity Aluminium type URL", async () => {
            await luggagepage.assertUrl(/(luggage\/(?:type\/aluminium|aluminium)\/?$)|(suitcases\/aluminium)/, "Assert Aluminium type URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Aluminium type page");
        }
    })

    tests(["jp"], `
        13. Go to Trunk Type
        14. In-stock products are displayed when clicking on in-stock checkbox
        15. User can add product to cart
        16. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Trunk type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('trunk')}`,
                "Go to Luggage -> Type -> Trunk"
            )
        })

        await step("Verity Trunk type URL", async () => {
            await luggagepage.assertUrl(/luggage\/(?:type\/trunk)\/?$/, "Assert Trunk type URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on trunk type page");
        }
    })

    test(`
        17. Go to Shop all luggage
        18. In-stock products are displayed when clicking on in-stock checkbox
        19. User can add product to cart
        20. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Shop all luggage", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('shopallluggage')}`,
                "Go to Luggage -> Type -> Shop all luggage"
            )
        })

        await step("Verity Shop all luggage type URL", async () => {
            await luggagepage.assertUrl(`${t.luggagepage('url')}`, "Assert Shop all luggage URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Shop all luggage page");
        }
    })

    tests(["au", "my"], `
        21. Go to Kids Type
        22. In-stock products are displayed when clicking on in-stock checkbox
        23. User can add product to cart
        24. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Kids type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('kids')}`,
                "Go to Luggage -> Type -> Kids"
            )
        })

        await step("Verity Kids type URL", async () => {
            await luggagepage.assertUrl(/(suitcases\/kids)|(luggage\/kids)/, "Assert Kids type URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Kids type page");
        }
    })
})

test.describe("Luggage Size", async () => {
    test(`
        1. Go to Cabin/small size
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Cabin/small size", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('size')}->${t.lv2MenuItem('small')}`,
                "Go to Luggage -> Size -> Cabin/small"
            )
        })

        await step("Verity Cabin/small size page URL", async () => {
            await luggagepage.assertUrl(/(luggage\/(cabin|機内持込|登機)\/?$)|(suitcases\/cabin)/, "Assert Cabin/small URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Cabin/smal type page");
        }
    })

    test(`
        5. Go to Medium size
        6. In-stock products are displayed when clicking on in-stock checkbox
        7. User can add product to cart
        8. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Medium size", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('size')}->${t.lv2MenuItem('medium')}`,
                "Go to Luggage -> Size -> Medium"
            )
        })

        await step("Verity Softside type URL", async () => {
            await luggagepage.assertUrl(/(luggage\/(medium|ミディアム|中型)\/?$)|(suitcases\/medium)/, "Assert Medium size page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Medium size page");
        }
    })

    test(`
        9. Go to Large size
        10. In-stock products are displayed when clicking on in-stock checkbox
        11. User can add product to cart
        12. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Large size page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('size')}->${t.lv2MenuItem('large')}`,
                "Go to Luggage -> Size -> Large"
            )
        })

        await step("Verity Large size page URL", async () => {
            await luggagepage.assertUrl(/(luggage\/(large|ラージ|大型)\/?$)|(suitcases\/large)/, "Assert Large size page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Large size page");
        }
    })
})

test.describe("Luggage Colours", async () => {
    tests(["id", "jp", "my", "nz", "ph", "sg", "tw"], `
        1. Go to Mono color page
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const amount = 1

        await step("Go to Mono color page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('lgcolor')}->${t.lv2MenuItem('mono')}`,
                "Go to Luggage -> Colours -> Mono"
            )
        })

        await step("Verity Mono color page URL", async () => {
            await luggagepage.assertUrl(/luggage\/(black_grey_silver_white|グレー_シルバー_ブラック_ホワイト|灰色_白色_銀色_黑色)\/?$/, "Assert Mono colours page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Mono color page");
        }
    })

    tests(["id", "jp", "my", "nz", "ph", "sg", "tw"], `
        5. Go to Cool color page
        6. In-stock products are displayed when clicking on in-stock checkbox
        7. User can add product to cart
        8. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Cool color", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('lgcolor')}->${t.lv2MenuItem('cool')}`,
                "Go to Luggage -> Colours -> Cool"
            )
        })

        await step("Verity Cool color URL", async () => {
            await luggagepage.assertUrl(/luggage\/(blue_green_navy|グリーン_ネイビー_パープル_ブルー|海軍藍色_紫色_綠色_藍色)\/?$/, "Assert Cool Color page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Cool colours page");
        }
    })

    tests(["id", "jp", "my", "nz", "ph", "sg", "tw"], `
        9. Go to Warm color page
        10. In-stock products are displayed when clicking on in-stock checkbox
        11. User can add product to cart
        12. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Warm colours page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('lgcolor')}->${t.lv2MenuItem('warm')}`,
                "Go to Luggage -> Colours -> Warm"
            )
        })

        await step("Verity Warm colours page URL", async () => {
            await luggagepage.assertUrl(/luggage\/(beige_orange_pink_red_yellow|イエロー_オレンジ_ピンク_レッド|橙色_米啡色_粉紅色_紅色_黃色)\/?$/, "Assert Warm color page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Warm colour page");
        }
    })

    tests(["sg", "tw", "au", "my", "id"], `
        13. Go to Shop all colours page
        14. In-stock products are displayed when clicking on in-stock checkbox
        15. User can add product to cart
        16. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Shop all colours page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('lgcolor')}->${t.lv2MenuItem('shopallcolour')}`,
                "Go to Luggage -> Colours -> Shop all colours"
            )
        })

        await step("Verity shopp all colours page URL", async () => {
            await luggagepage.assertUrl(/luggage\/(colour\/shop-all-colours|luggage-all-color|more-colours)\/?$/, "Assert Shop all colours page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Shop all colours page");
        }
    })

    tests(["jp", "tw"], `
        17. Go to Special color page
        18. In-stock products are displayed when clicking on in-stock checkbox
        19. User can add product to cart
        20. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Special color page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('lgcolor')}->${t.lv2MenuItem('special')}`,
                "Go to Luggage -> Colours -> Special"
            )
        })

        await step("Verity Large size page URL", async () => {
            await luggagepage.assertUrl(/((スーツケース\/カラー\/special)|(luggage\/special))?$/, "Assert Special colours page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Special colours page");
        }
    })

    tests(["au"], `
        21. Go to Black color page
        22. In-stock products are displayed when clicking on in-stock checkbox
        23. User can add product to cart
        24. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Black color page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('lgcolor')}->${t.lv2MenuItem('black')}`,
                "Go to Luggage -> Colours -> Black"
            )
        })

        await step("Verity Large size page URL", async () => {
            await luggagepage.assertUrl(/suitcases\/black/, "Assert Black colours page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Black colours page");
        }
    })

    tests(["au"], `
        25. Go to Blue color page
        26. In-stock products are displayed when clicking on in-stock checkbox
        27. User can add product to cart
        28. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Blue color page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('lgcolor')}->${t.lv2MenuItem('blue')}`,
                "Go to Luggage -> Colours -> Blue"
            )
        })

        await step("Verity Large size page URL", async () => {
            await luggagepage.assertUrl(/suitcases\/blue/, "Assert Blue colours page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Blue colours page");
        }
    })

    tests(["au"], `
        29. Go to Red color page
        30. In-stock products are displayed when clicking on in-stock checkbox
        31. User can add product to cart
        32. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Red color page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('lgcolor')}->${t.lv2MenuItem('red')}`,
                "Go to Luggage -> Colours -> Red"
            )
        })

        await step("Verity Large size page URL", async () => {
            await luggagepage.assertUrl(/suitcases\/red/, "Assert Red colours page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Red colours page");
        }
    })

    tests(["au"], `
        33. Go to Green color page
        34. In-stock products are displayed when clicking on in-stock checkbox
        35. User can add product to cart
        36. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Green color page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('lgcolor')}->${t.lv2MenuItem('green')}`,
                "Go to Luggage -> Colours -> Green"
            )
        })

        await step("Verity Large size page URL", async () => {
            await luggagepage.assertUrl(/suitcases\/green/, "Assert Green colours page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Green colours page");
        }
    })

    tests(["au"], `
        37. Go to White color page
        38. In-stock products are displayed when clicking on in-stock checkbox
        39. User can add product to cart
        40. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to White color page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('lgcolor')}->${t.lv2MenuItem('white')}`,
                "Go to Luggage -> Colours -> White"
            )
        })

        await step("Verity Large size page URL", async () => {
            await luggagepage.assertUrl(/suitcases\/white/, "Assert White colours page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on White colours page");
        }
    })
})

test.describe("Luggage Smart feature", async () => {
    tests(["sg", "tw", "ph", "my", "id"], `
        1. Go to Double Coil Zippers page
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Double Coil Zippers page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('smartfeature')}->${t.lv2MenuItem('doublecoilzippers')}`,
                "Go to Luggage -> Smart Feature -> Double Coil Zippers"
            )
        })

        await step("Verity Double Coil Zippers page URL", async () => {
            await luggagepage.assertUrl(/(luggage\/(smart-feature|features)\/double-coil-zippers)|(luggage-double-coil-zippers)\/?$/, "Assert Double Coil Zippers page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Double coil zippers page");
        }
    })

    tests(["sg", "tw", "ph", "jp", "my"], `
        5. Go to Easy brake system page
        6. In-stock products are displayed when clicking on in-stock checkbox
        7. User can add product to cart
        8. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Easy brake system", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('smartfeature')}->${t.lv2MenuItem('easybrakesystem')}`,
                "Go to Luggage -> Smart Feature -> Easy Brake System"
            )
        })

        await step("Verity Easy brake system page URL", async () => {
            await luggagepage.assertUrl(/(luggage\/(smart-feature|features)\/easy-brake-system)|(luggage-easy-brake-system)\/?$/, "Assert Easy brake system page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Easy brake system page");
        }
    })

    tests(["sg", "tw", "ph", "jp", "id"], `
        9. Go to Magnetic zippers page
        10. In-stock products are displayed when clicking on in-stock checkbox
        11. User can add product to cart
        12. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Magnetic zippers page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('smartfeature')}->${t.lv2MenuItem('magnetic')}`,
                "Go to Luggage -> Smart Feature -> Magnetic zippers"
            )
        })

        await step("Verity Magnetic zippers page URL", async () => {
            await luggagepage.assertUrl(/luggage\/(magnetic-zippers|smart-feature\/magnetic-zippers)\/?$/, "Assert Magnetic zippers page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Magnetic zippers page");
        }
    })

    tests(["sg", "tw", "ph", "jp", "my", "id"], `
        13. Go to Suspension wheels page
        14. In-stock products are displayed when clicking on in-stock checkbox
        15. User can add product to cart
        16. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Suspension wheels page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('smartfeature')}->${t.lv2MenuItem('suspensionwheels')}`,
                "Go to Luggage -> Smart Feature -> Suspension wheels"
            )
        })

        await step("Verity Suspension wheels page URL", async () => {
            await luggagepage.assertUrl(/luggage\/(suspension-wheels|smart-feature\/suspension-wheels)\/?$/, "Assert Suspension wheels page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Suspension wheels page");
        }
    })

    tests(["sg", "tw", "ph", "jp", "my", "id"], `
        17. Go to USB port page
        18. In-stock products are displayed when clicking on in-stock checkbox
        19. User can add product to cart
        20. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to USB port page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('smartfeature')}->${t.lv2MenuItem('lgusbport')}`,
                "Go to Luggage -> Smart Feature -> USB port"
            )
        })

        await step("Verity USB port page URL", async () => {
            await luggagepage.assertUrl(/luggage\/(usb-port|smart-feature\/usb-port)\/?$/, "Assert USB port page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on USB port page");
        }
    })

    tests(["au"], `
        21. Go to Premium page
        22. In-stock products are displayed when clicking on in-stock checkbox
        23. User can add product to cart
        24. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Premium page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('smartfeature')}->${t.lv2MenuItem('premium')}`,
                "Go to Luggage -> Smart Feature -> Premium"
            )
        })

        await step("Verity Premium page URL", async () => {
            await luggagepage.assertUrl(/suitcases\/premium/, "Assert Premium page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Premium page");
        }
    })

    tests(["au"], `
        25. Go to Lightweight and Strong page
        26. In-stock products are displayed when clicking on in-stock checkbox
        27. User can add product to cart
        28. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Lightweight and Strong page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('smartfeature')}->${t.lv2MenuItem('lightweightandstrong')}`,
                "Go to Luggage -> Smart Feature -> Lightweight and Strong"
            )
        })

        await step("Verity Lightweight and Strong page URL", async () => {
            await luggagepage.assertUrl(/suitcases\/strong/, "Assert Lightweight and Strong page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Lightweight and Strong page");
        }
    })

    tests(["au"], `
        29. Go to Roxkin™ page
        30. In-stock products are displayed when clicking on in-stock checkbox
        31. User can add product to cart
        32. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Roxkin™ page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('smartfeature')}->${t.lv2MenuItem('roxkin')}`,
                "Go to Luggage -> Smart Feature -> Roxkin™"
            )
        })

        await step("Verity Roxkin™ page URL", async () => {
            await luggagepage.assertUrl(/suitcases\/shop-by-attribute\/roxkin/, "Assert Roxkin™ page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Roxkin™ page");
        }
    })

    tests(["au"], `
        33. Go to Curv® page
        34. In-stock products are displayed when clicking on in-stock checkbox
        35. User can add product to cart
        36. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Curv® page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('smartfeature')}->${t.lv2MenuItem('curv')}`,
                "Go to Luggage -> Smart Feature -> Curv®"
            )
        })

        await step("Verity Curv® page URL", async () => {
            await luggagepage.assertUrl(/smart-luggage\/curv/, "Assert Curv® page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Curv® page");
        }
    })

    tests(["au"], `
        37. Go to Made in Europe page
        38. In-stock products are displayed when clicking on in-stock checkbox
        39. User can add product to cart
        40. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Made in Europe page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('smartfeature')}->${t.lv2MenuItem('madeineurope')}`,
                "Go to Luggage -> Smart Feature -> Made in Europe"
            )
        })

        await step("Verity Made in Europe page URL", async () => {
            await luggagepage.assertUrl(/suitcases\/made-in-europe/, "Assert Made in Europe page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Made in Europe page");
        }
    })
})

test.describe("Luggage Labels/Brand", async () => {
    tests(["sg", "tw", "ph", "jp", "my", "id"], `
        1. Go to Samsonite page
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const amount = 1

        await step("Go to Samsonite page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('labels')}->${t.lv2MenuItem('samsonite')[0]}`,
                "Go to Luggage -> Labels/Brand -> Samsonite"
            )
        })

        await step("Verity Samsonite page URL", async () => {
            await luggagepage.assertUrl(/luggage\/(brand-samsonite|brand\/samsonite)\/?$/, "Assert Samsonite page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Samsonite page");
        }
    })

    tests(["sg", "tw", "ph", "jp", "my", "id"], `
        5. Go to Samsonite black page
        6. In-stock products are displayed when clicking on in-stock checkbox
        7. User can add product to cart
        8. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Samsonite black", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('labels')}->${t.lv2MenuItem('samsoniteblack')[0]}`,
                "Go to Luggage -> Labels/Brand -> Samsonite Black"
            )
        })

        await step("Verity Samsonite Black page URL", async () => {
            await luggagepage.assertUrl(/luggage\/(brand-samsonite-black|brand\/samsonite-black)\/?$/, "Assert Samsonite Black page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Samsonite Black page");
        }
    })

    tests(["sg", "tw", "ph", "jp", "my", "id"], `
        9. Go to Samsonite Red page
        10. In-stock products are displayed when clicking on in-stock checkbox
        11. User can add product to cart
        12. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Samsonite Red page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('labels')}->${t.lv2MenuItem('samsonitered')[0]}`,
                "Go to Luggage -> Labels/Brand -> Samsonite Red"
            )
        })

        await step("Verity Samsonite Red page URL", async () => {
            await luggagepage.assertUrl(/luggage\/(brand-samsonite-red|brand\/samsonite-red)\/?$/, "Assert Samsonite Red page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
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
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Hartmann page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('labels')}->${t.lv2MenuItem('hartmann')[0]}`,
                "Go to Luggage -> Labels/Brand -> Hartmann"
            )
        })

        await step("Verity Hartmann page URL", async () => {
            await luggagepage.assertUrl(/luggage\/(brand\/hartmann)\/?$/, "Assert Hartmann page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Hartmann page");
        }
    })
})

test.describe("Luggage travel type/destination", async () => {
    tests(["jp", "my"], `
        1. Go to City page
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to City page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('traveltype')}->${t.lv2MenuItem('city')}`,
                "Go to Luggage -> Travel type/Destination -> City"
            )
        })

        await step("Verity City page URL", async () => {
            await luggagepage.assertUrl(/luggage\/(destination\/city|city)\/?$/, "Assert City page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on City page");
        }
    })

    tests(["sg", "jp", "my"], `
        5. Go to Adventure page
        6. In-stock products are displayed when clicking on in-stock checkbox
        7. User can add product to cart
        8. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Adventure page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('traveltype')}->${t.lv2MenuItem('adventure')}`,
                "Go to Luggage -> Travel type/Destination -> Adventure"
            )
        })

        await step("Verity Adventure page URL", async () => {
            await luggagepage.assertUrl(/luggage\/(adventure|destination\/adventure)\/?$/, "Assert Adventure page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Adventure page");
        }
    })

    tests(["jp", "my", "id"], `
        9. Go to Beach page
        10. In-stock products are displayed when clicking on in-stock checkbox
        11. User can add product to cart
        12. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Beach page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('traveltype')}->${t.lv2MenuItem('beach')}`,
                "Go to Luggage -> Travel type/Destination -> Beach"
            )
        })

        await step("Verity Beach page URL", async () => {
            await luggagepage.assertUrl(/luggage\/(destination\/beach|beach)\/?$/, "Assert Beach page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Beach page");
        }
    })

    tests(["sg", "jp", "my"], `
        13. Go to Business page
        14. In-stock products are displayed when clicking on in-stock checkbox
        15. User can add product to cart
        16. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Business page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('traveltype')}->${t.lv2MenuItem('business')}`,
                "Go to Luggage -> Tranvel Type/Destination -> Business"
            )
        })

        await step("Verity Business page URL", async () => {
            await luggagepage.assertUrl(/luggage\/(business|destination\/business)\/?$/, "Assert business page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Business page");
        }
    })
})

test.describe("Luggage Collection", async () => {
    tests(["sg", "jp", "tw"], `
        1. Go to Collection C-Lite page
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Collection C-Lite page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)

            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('C-Lite')}`,
                "Go to Luggage -> Collection -> C-Lite"
            )
        })

        await step("Verity Collection C-Lite page URL", async () => {
            await luggagepage.assertUrl(/(collection\/c-lite|collection\/シーライト)|(luggage-collection-c-lite)\/?$/, "Assert Collection C-Lite page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Collection C-Lite page");
        }
    })

    tests(["sg", "tw", "ph"], `
        5. Go to Unimax page
        6. In-stock products are displayed when clicking on in-stock checkbox
        7. User can add product to cart
        8. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Unimax page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('Unimax')}`,
                "Go to Luggage -> Collection -> Unimax"
            )
        })

        await step("Verity Adventure page URL", async () => {
            await luggagepage.assertUrl(/(collection\/unimax)|(luggage-collection-unimax)\/?$/, "Assert Unimax page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Unimax page");
        }
    })

    tests(["sg"], `
        9. Go to 73h page
        10. In-stock products are displayed when clicking on in-stock checkbox
        11. User can add product to cart
        12. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to 73h page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('73H')}`,
                "Go to Luggage -> Collection -> 73H"
            )
        })

        await step("Verity Beach page URL", async () => {
            await luggagepage.assertUrl(/(collection\/73h)\/?$/, "Assert 73h page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on 73h page");
        }
    })

    tests(["sg", "jp", "ph"], `
        13. Go to Richmond II page
        14. In-stock products are displayed when clicking on in-stock checkbox
        15. User can add product to cart
        16. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Richmond II page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('SBL Richmond II')}`,
                "Go to Luggage -> Collection -> Richmond II"
            )
        })

        await step("Verity Richmond II page URL", async () => {
            await luggagepage.assertUrl(/(collection\/sbl-richmond-ii|collection\/richmond2|リッチモンド-2)\/?$/, "Assert Richmond II page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Richmond II page");
        }
    })

    tests(["sg", "ph"], `
        17. Go to Proxis page
        18. In-stock products are displayed when clicking on in-stock checkbox
        19. User can add product to cart
        20. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Proxis page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('proxis')}`,
                "Go to Luggage -> Collection -> Proxis"
            )
        })

        await step("Verity Proxis page URL", async () => {
            await luggagepage.assertUrl(/(collection\/proxis)\/?$/, "Assert Proxis page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Proxis page");
        }
    })

    tests(["jp", "tw", "ph", "my"], `
        21. Go to Minter page
        22. In-stock products are displayed when clicking on in-stock checkbox
        23. User can add product to cart
        24. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Minter page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('minter')}`,
                "Go to Luggage -> Collection -> Minter"
            )
        })

        await step("Verity Minter page URL", async () => {
            await luggagepage.assertUrl(/minter|(luggage-collection-minter)/, "Assert Minter page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Minter page");
        }
    })

    tests([], `
        25. Go to Lite box alu page
        26. In-stock products are displayed when clicking on in-stock checkbox
        27. User can add product to cart
        28. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Lite box alu page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('litebox')}`,
                "Go to Luggage -> Collection -> Lite box alu"
            )
        })

        await step("Verity Lite box alu page URL", async () => {
            await luggagepage.assertUrl(/(collection\/lite-box-alu)\/?$/, "Assert Lite box alu page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Lite box alu page");
        }
    })

    tests(["jp"], `
        29. Go to Paralux page
        30. In-stock products are displayed when clicking on in-stock checkbox
        31. User can add product to cart
        32. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Paralux page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('paralux')}`,
                "Go to Luggage -> Collection -> Paralux"
            )
        })

        await step("Verity Paralux page URL", async () => {
            await luggagepage.assertUrl(/(collection\/パラリュクス)\/?$/, "Assert Paralux page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Paralux page");
        }
    })

    tests(["jp"], `
        33. Go to Zipprix page
        34. In-stock products are displayed when clicking on in-stock checkbox
        35. User can add product to cart
        36. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Zipprix page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('zipprix')}`,
                "Go to Luggage -> Collection -> Zipprix"
            )
        })

        await step("Verity Zipprix page URL", async () => {
            await luggagepage.assertUrl(/(collection\/ジップリックスft)\/?$/, "Assert Zipprix page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Zipprix page");
        }
    })

    tests(["tw", "id"], `
        37. Go to EVOA Z/EVOA page
        38. In-stock products are displayed when clicking on in-stock checkbox
        39. User can add product to cart
        40. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to EVOA Z page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('evoaz')}`,
                "Go to Luggage -> Collection -> EVOA Z"
            )
        })

        await step("Verity EVOA Z page URL", async () => {
            await luggagepage.assertUrl(/(collection\/ジップリックスft)|luggage-collection-evoa-z|en\/luggage\/evoa\/?$/, "Assert EVOA Z page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on EVOA Z page");
        }
    })

    tests(["tw"], `
        41. Go to UPSCAPE page
        42. In-stock products are displayed when clicking on in-stock checkbox
        43. User can add product to cart
        44. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to UPSCAPE page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('upscape')}`,
                "Go to Luggage -> Collection -> UPSCAPE"
            )
        })

        await step("Verity UPSCAPE page URL", async () => {
            await luggagepage.assertUrl(/(collection\/ジップリックスft)|luggage-collection-upscape\/?$/, "Assert UPSCAPE page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on UPSCAPE page");
        }
    })

    tests(["au"], `
        45. Go to Oc2lite page
        46. In-stock products are displayed when clicking on in-stock checkbox
        47. User can add product to cart
        48. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Oc2lite page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('Oc2lite')}`,
                "Go to Luggage -> Collection -> Oc2lite"
            )
        })

        await step("Verity Oc2lite page URL", async () => {
            await luggagepage.assertUrl(/oc2lite-collection/, "Assert Oc2lite page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Oc2lite page");
        }
    })

    tests(["au"], `
        49. Go to Hi-Fi page
        50. In-stock products are displayed when clicking on in-stock checkbox
        51. User can add product to cart
        52. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Hi-Fi page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('hifi')}`,
                "Go to Luggage -> Collection -> Hi-Fi"
            )
        })

        await step("Verity Hi-Fi page URL", async () => {
            await luggagepage.assertUrl(/collection\/hi-fi/, "Assert Hi-Fi page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Hi-Fi page");
        }
    })

    tests(["au"], `
        53. Go to C-Lite page
        54. In-stock products are displayed when clicking on in-stock checkbox
        55. User can add product to cart
        56. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to C-Lite page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('C-Lite')}`,
                "Go to Luggage -> Collection -> C-Lite"
            )
        })

        await step("Verity C-Lite page URL", async () => {
            await luggagepage.assertUrl(/c-lite/, "Assert C-Lite page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on C-Lite page");
        }
    })

    tests(["id"], `
        57. Go to NB | Samsonite/Magnum Eco page
        58. In-stock products are displayed when clicking on in-stock checkbox
        59. User can add product to cart
        60. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to NB | Samsonite page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('nbsamsonite')}`,
                "Go to Luggage -> Collection -> NB | Samsonite"
            )
        })

        await step("Verity NB | Samsonite page URL", async () => {
            await luggagepage.assertUrl(/magnum-eco-2|en\/luggage-collection-magnum-eco/, "Assert NB | Samsonite page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on NB | Samsonite page");
        }
    })

    tests(["au"], `
        61. Go to Shop all collections page
        62. In-stock products are displayed when clicking on in-stock checkbox
        63. User can add product to cart
        64. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Shop all collections page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('shopallluggagecollection')}`,
                "Go to Luggage -> Collection -> Shop all collections"
            )
        })

        await step("Verity Shop all collections page URL", async () => {
            await luggagepage.assertUrl(/collection/, "Assert Shop all collections page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Shop all collections page");
        }
    })

    tests(["my"], `
        65. Go to Niar page
        66. In-stock products are displayed when clicking on in-stock checkbox
        67. User can add product to cart
        68. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Niar page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('Niar')}`,
                "Go to Luggage -> Collection -> Niar"
            )
        })

        await step("Verity Niar page URL", async () => {
            await luggagepage.assertUrl(/niar/, "Assert Niar page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Niar page");
        }
    })

    tests(["my"], `
        69. Go to Toiis C page
        70. In-stock products are displayed when clicking on in-stock checkbox
        71. User can add product to cart
        72. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Toiis C page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('toiisC')}`,
                "Go to Luggage -> Collection -> Toiis C"
            )
        })

        await step("Verity Toiis C page URL", async () => {
            await luggagepage.assertUrl(/toiis-c/, "Assert Toiis C page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Toiis C page");
        }
    })

    tests(["my"], `
        73. Go to B-Lite 4 page
        74. In-stock products are displayed when clicking on in-stock checkbox
        75. User can add product to cart
        76. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to B-Lite 4 page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('blite4')}`,
                "Go to Luggage -> Collection -> B-Lite 4"
            )
        })

        await step("Verity B-Lite 4 page URL", async () => {
            await luggagepage.assertUrl(/b-lite-4/, "Assert B-Lite 4 page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on B-Lite 4 page");
        }
    })

    tests(["my"], `
        77. Go to Azio page
        78. In-stock products are displayed when clicking on in-stock checkbox
        79. User can add product to cart
        80. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createLuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Azio page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('azio')}`,
                "Go to Luggage -> Collection -> Azio"
            )
        })

        await step("Verity Azio page URL", async () => {
            await luggagepage.assertUrl(/azio/, "Assert Azio page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Azio page");
        }
    })
})