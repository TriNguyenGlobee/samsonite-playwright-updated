import { expect, test } from "../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { createHomePage } from "../../../src/factories/home.factory";
import { lazyLoad, PageUtils, t, delay } from "../../../utils/helpers/helpers";
import { tests } from "../../../utils/helpers/localeTest";
import { createMinicartPage } from "../../../src/factories/minicart.factory";
import { createCartPage } from "../../../src/factories/cart.factory";
import { PDPPage } from "../../../src/pages/delivery/pdp/pdp.page";
import { createBackpacksPage } from "../../../src/factories/productlistingpage/backpacks.factory";

test.describe("Backpacks Page", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        await PageUtils.waitForPageLoad(basicAuthPage)
        await homepage.clickMenuItem('backpacks', "Go to Backpacks page")
    })

    test(`
        1. Assert that the Backpacks page is displayed
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const backpacksPage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1
        const expectedURL = t.backpackspage('url')

        await step("Verity Backpacks page URL", async () => {
            await backpacksPage.assertUrl(expectedURL.toString(), "Assert Backpacks page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpacksPage.productTableShow.isVisible()) {
                await backpacksPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpacksPage.assertHidden(backpacksPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })
        const isInStockProdNotExist = await backpacksPage.noAvailableProdMsg.isVisible()

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
                await backpacksPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Backpacks page");
        }
    })
});

test.describe("Backpacks Type", async () => {
    tests(["sg", "tw", "au", "my", "id"], `
        1. Go to Business backpacks Type
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpacksPage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Business Backpacks type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('businessbackpacks')}`,
                "Go to Backpacks -> Type -> Business Backpacks"
            )
        })

        await step("Verity Business Backpacks type URL", async () => {
            await backpacksPage.assertUrl(/backpacks\/(business|businessbackpacks)\/?$/, "Assert Business Backpacks type URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpacksPage.productTableShow.isVisible()) {
                await backpacksPage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpacksPage.assertHidden(backpacksPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpacksPage.noAvailableProdMsg.isVisible()

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
                await backpacksPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Business Backpacks type page");
        }
    })

    tests(["sg", "tw", "au", "my", "id"], `
        5. Go to Casual Backpacks Type
        6. In-stock products are displayed when clicking on in-stock checkbox
        7. User can add product to cart
        8. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Casual Backpacks type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('casualbackpacks')}`,
                "Go to Backpacks -> Type -> Casual Backpacks"
            )
        })

        await step("Verity Casual Backpacks type URL", async () => {
            await backpackspage.assertUrl(/backpacks\/(casual|casual-backpacks|casual-backpacks)\/?$/, "Assert Casual Backpacks type URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Backpacks type page");
        }
    })

    tests(["sg", "tw", "my", "id"], `
        9. Go to For Her Type
        10. In-stock products are displayed when clicking on in-stock checkbox
        11. User can add product to cart
        12. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to For Her type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('forher')}`,
                "Go to Backpacks -> Type -> For Her"
            )
        })

        await step("Verity For Her type URL", async () => {
            await backpackspage.assertUrl(/backpacks\/(for-her)\/?$/, "Assert For Her type URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on For Her type page");
        }
    })

    tests(["sg", "my"], `
        13. Go to For Kids Type
        14. In-stock products are displayed when clicking on in-stock checkbox
        15. User can add product to cart
        16. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to For Kids type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('forkids')}`,
                "Go to Backpacks -> Type -> For Kids"
            )
        })

        await step("Verity For Kids type URL", async () => {
            await backpackspage.assertUrl(/backpacks\/(for-kids)\/?$/, "Assert For Kids type URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on For Kids type page");
        }
    })

    tests(["sg", "jp", "au", "my", "id"], `
        17. Go to Shop all backpacks
        18. In-stock products are displayed when clicking on in-stock checkbox
        19. User can add product to cart
        20. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Shop all backpacks", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('shopallbackpacks')}`,
                "Go to Backpacks -> Type -> Shop all backpacks"
            )
        })

        await step("Verity Shop all backpacks type URL", async () => {
            await backpackspage.assertUrl(`${t.backpackspage('url')}`, "Assert Shop all backpacks URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Shop all backpacks page");
        }
    })

    tests(["jp", "au"], `
        21. Go to Leather Type
        22. In-stock products are displayed when clicking on in-stock checkbox
        23. User can add product to cart
        24. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Leather type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('leather')}`,
                "Go to Backpacks -> Type -> Leather"
            )
        })

        await step("Verity Leather type URL", async () => {
            await backpackspage.assertUrl(/(backpack\/(type\/leather))|(backpacks\/leather)\/?$/, "Assert Leather type URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Leather type page");
        }
    })

    tests(["jp"], `
        25. Go to Nylon Type
        26. In-stock products are displayed when clicking on in-stock checkbox
        27. User can add product to cart
        28. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Nylon type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('nylon')}`,
                "Go to Backpacks -> Type -> Nylon"
            )
        })

        await step("Verity Nylon type URL", async () => {
            await backpackspage.assertUrl(/backpack\/(type\/nylon)\/?$/, "Assert Nylon type URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Nylon type page");
        }
    })

    tests(["jp"], `
        29. Go to Polyester Type
        30. In-stock products are displayed when clicking on in-stock checkbox
        31. User can add product to cart
        32. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Polyester type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('polyester')}`,
                "Go to Backpacks -> Type -> Polyester"
            )
        })

        await step("Verity Polyester type URL", async () => {
            await backpackspage.assertUrl(/backpack\/(type\/polyester)\/?$/, "Assert Polyester type URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Polyester type page");
        }
    })

    tests(["jp"], `
        33. Go to Woman Type
        34. In-stock products are displayed when clicking on in-stock checkbox
        35. User can add product to cart
        36. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Woman type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('woman')}`,
                "Go to Backpacks -> Type -> Woman"
            )
        })

        await step("Verity Woman type URL", async () => {
            await backpackspage.assertUrl(/backpacks?(?:\/expandable)?\/?(?:\?.*)?$/, "Assert Woman type URL");
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Woman type page");
        }
    })

    tests(["au"], `
        37. Go to Travel Type
        38. In-stock products are displayed when clicking on in-stock checkbox
        39. User can add product to cart
        40. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Travel type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('travelbackpacks')}`,
                "Go to Backpacks -> Type -> Travel Backpacks"
            )
        })

        await step("Verity Travel type URL", async () => {
            await backpackspage.assertUrl(/backpacks\/travel/, "Assert Travel type URL");
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Travel type page");
        }
    })
})

test.describe("Backpacks Colours", async () => {
    tests(["jp", "ph", "sg", "tw", "my", "id"], `
        1. Go to Mono color page
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const amount = 1

        await step("Go to Mono color page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('colour')}->${t.lv2MenuItem('mono')}`,
                "Go to Backpacks -> Colours -> Mono"
            )
        })

        await step("Verity Mono color page URL", async () => {
            await backpackspage.assertUrl(/(backpacks\/black_grey_silver_white|その他_グレー_ブラック)|(backpack\/灰色_白色_銀色_黑色|black_grey_silver_white)\/?$/, "Assert Mono colours page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Mono color page");
        }
    })

    tests(["jp", "ph", "sg", "tw", "my", "id"], `
        5. Go to Cool color page
        6. In-stock products are displayed when clicking on in-stock checkbox
        7. User can add product to cart
        8. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Cool color", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('colour')}->${t.lv2MenuItem('cool')}`,
                "Go to Backpacks -> Colours -> Cool"
            )
        })

        await step("Verity Softside type URL", async () => {
            await backpackspage.assertUrl(/(backpacks\/blue_green_navy_purple|グリーン_ネイビー_パープル_ブルー)|(backpack\/海軍藍色_紫色_綠色_藍色|blue_green_navy_purple)\/?$/, "Assert Cool Color page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Cool colours page");
        }
    })

    tests(["jp", "ph", "sg", "tw", "my", "id"], `
        9. Go to Warm color page
        10. In-stock products are displayed when clicking on in-stock checkbox
        11. User can add product to cart
        12. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Warm colours page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('colour')}->${t.lv2MenuItem('warm')}`,
                "Go to Backpacks -> Colours -> Warm"
            )
        })

        await step("Verity Large size page URL", async () => {
            await backpackspage.assertUrl(/(backpacks\/beige_orange_pink_red_yellow|オレンジ_ピンク)|(backpack\/橙色_米啡色_粉紅色_紅色_黃色|beige_orange_pink_red_yellow)\/?$/, "Assert Warm color page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
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
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Shop all colours page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('colour')}->${t.lv2MenuItem('shopallcolour')}`,
                "Go to Backpacks -> Colours -> Shop all colours"
            )
        })

        await step("Verity Large size page URL", async () => {
            await backpackspage.assertUrl(/(backpacks\/colour\/shop-all-colours)|(backpack\/all-color)|(backpacks)\/?$/, "Assert Shop all colours page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
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
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const amount = 1

        await step("Go to Black colours page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('colour')}->${t.lv2MenuItem('black')}`,
                "Go to Backpacks -> Colours -> Black"
            )
        })

        await step("Verity Black size page URL", async () => {
            await backpackspage.assertUrl(/backpacks\/black\/?$/, "Assert Black color page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Black colour page");
        }
    })

    tests(["au"], `
        21. Go to Blue color page
        22. In-stock products are displayed when clicking on in-stock checkbox
        23. User can add product to cart
        24. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const amount = 1

        await step("Go to Blue colours page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('colour')}->${t.lv2MenuItem('blue')}`,
                "Go to Backpacks -> Colours -> Blue"
            )
        })

        await step("Verity Blue size page URL", async () => {
            await backpackspage.assertUrl(/backpacks\/blue\/?$/, "Assert Blue color page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Blue colour page");
        }
    })

    tests(["au"], `
        25. Go to Brown color page
        26. In-stock products are displayed when clicking on in-stock checkbox
        27. User can add product to cart
        28. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const amount = 1

        await step("Go to Brown colours page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('colour')}->${t.lv2MenuItem('brown')}`,
                "Go to Backpacks -> Colours -> Brown"
            )
        })

        await step("Verity Brown size page URL", async () => {
            await backpackspage.assertUrl(/backpacks\/brown\/?$/, "Assert Brown color page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Brown colour page");
        }
    })

    tests(["au"], `
        29. Go to Green color page
        30. In-stock products are displayed when clicking on in-stock checkbox
        31. User can add product to cart
        32. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const amount = 1

        await step("Go to Green colours page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('colour')}->${t.lv2MenuItem('green')}`,
                "Go to Backpacks -> Colours -> Green"
            )
        })

        await step("Verity Green size page URL", async () => {
            await backpackspage.assertUrl(/backpacks\/green\/?$/, "Assert Green color page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Green colour page");
        }
    })
})

test.describe("Backpacks Smart feature", async () => {
    tests(["sg"], `
        1. Go to RFID Pocket page
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const amount = 1

        await step("Go to RFID Pocket page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('features')}->${t.lv2MenuItem('RFIDPocket')}`,
                "Go to Backpacks -> Features -> RFID Pocket"
            )
        })

        await step("Verity RFID Pocket page URL", async () => {
            await backpackspage.assertUrl(/backpack\/rfid-pocket/, "Assert RFID Pocket page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart")
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on RFID Pocket page");
        }
    })

    test(`
        5. Go to USB feature page
        6. In-stock products are displayed when clicking on in-stock checkbox
        7. User can add product to cart
        8. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to USB port", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('features')}->${t.lv2MenuItem('usbport')[1]}`,
                "Go to Backpacks -> Features -> USB Port"
            )
        })

        await step("Verity USB port page URL", async () => {
            await backpackspage.assertUrl(/(backpack\/(usb-port|smart-function\/usb-port|))|(attribute\/usb-port-2)|backpacks\/usb-port\/?$/, "Assert USB port page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on USB port page");
        }
    })

    tests(["au"], `
        9. Go to Tablet Compartments feature page
        10. In-stock products are displayed when clicking on in-stock checkbox
        11. User can add product to cart
        12. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Tablet Compartments port", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('features')}->${t.lv2MenuItem('tabletcompartments')}`,
                "Go to Backpacks -> Features -> Tablet Compartments"
            )
        })

        await step("Verity Tablet Compartments page URL", async () => {
            await backpackspage.assertUrl(/backpacks\/tablet-compartment\/?$/, "Assert Tablet Compartments page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Tablet Compartments page");
        }
    })

    tests(["au"], `
        13. Go to Laptop Compartments feature page
        14. In-stock products are displayed when clicking on in-stock checkbox
        15. User can add product to cart
        16. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Laptop Compartments port", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('features')}->${t.lv2MenuItem('laptopcompartments')}`,
                "Go to Backpacks -> Features -> Laptop Compartments"
            )
        })

        await step("Verity Laptop Compartments page URL", async () => {
            await backpackspage.assertUrl(/backpacks\/laptop\/?$/, "Assert Laptop Compartments page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Laptop Compartments page");
        }
    })

    tests(["au"], `
        17. Go to Smart Sleeve feature page
        19. In-stock products are displayed when clicking on in-stock checkbox
        20. User can add product to cart
        21. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Smart Sleeve port", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('features')}->${t.lv2MenuItem('smartsleeve')}`,
                "Go to Backpacks -> Features -> Smart Sleeve"
            )
        })

        await step("Verity Smart Sleeve page URL", async () => {
            await backpackspage.assertUrl(/backpacks\/suitcase-sleeve\/?$/, "Assert Smart Sleeve page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Smart Sleeve page");
        }
    })
})

test.describe("Backpacks Labels/Brand", async () => {
    tests(["jp", "ph", "sg", "tw", "my", "id"], `
        1. Go to Samsonite page
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Samsonite page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('labels')}->${t.lv2MenuItem('samsonite')[1]}`,
                "Go to Backpacks -> Labels/Brand -> Samsonite"
            )
        })

        await step("Verity Samsonite page URL", async () => {
            await backpackspage.assertUrl(/backpack\/(brand-samsonite|brand\/samsonite)\/?$/, "Assert Samsonite page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Samsonite page");
        }
    })

    tests(["sg", "jp", "my", "id"], `
        5. Go to Samsonite black page
        6. In-stock products are displayed when clicking on in-stock checkbox
        7. User can add product to cart
        8. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Samsonite black", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('labels')}->${t.lv2MenuItem('samsoniteblack')[1]}`,
                "Go to Backpacks -> Labels/Brand -> Samsonite Black"
            )
        })

        await step("Verity Samsonite Black page URL", async () => {
            await backpackspage.assertUrl(/backpack\/(brand-samsonite-black|brand\/samsonite-black)\/?$/, "Assert Samsonite Black page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Samsonite Black page");
        }
    })

    tests(["jp", "ph", "sg", "tw", "my", "id"], `
        9. Go to Samsonite Red page
        10. In-stock products are displayed when clicking on in-stock checkbox
        11. User can add product to cart
        12. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Samsonite Red page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('labels')}->${t.lv2MenuItem('samsonitered')[1]}`,
                "Go to Backpacks -> Labels/Brand -> Samsonite Red"
            )
        })

        await step("Verity Samsonite Red page URL", async () => {
            await backpackspage.assertUrl(/backpack\/(brand-samsonite-red|brand\/samsonite-red)\/?$/, "Assert Samsonite Red page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
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
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Hartmann page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('labels')}->${t.lv2MenuItem('hartmann')[1]}`,
                "Go to Backpacks -> Labels/Brand -> Hartmann"
            )
        })

        await step("Verity Hartmann page URL", async () => {
            await backpackspage.assertUrl(/backpack\/(brand\/hartmann)\/?$/, "Assert Hartmann page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Hartmann page");
        }
    })
})

test.describe("Backpacks laptop", async () => {
    test(`
        1. Go to 13" laptop page
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const amount = 1

        await step("Go to 13\" laptop page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('laptop')}->${t.lv2MenuItem('13inchlaptop')}`,
                "Go to Backpacks -> Labels/Brand -> 13\" Laptop"
            )
        })

        await step("Verity 13\" laptop page URL", async () => {
            await backpackspage.assertUrl(/backpacks\/(fit-up-to-13"-laptop|fit-up-to-13-laptop|laptop\/13-inch)\/?$/, "Assert 13\" Laptop page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart")
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on 13\" Laptop page");
        }
    })

    test(`
        5. Go to 15" laptop page
        6. In-stock products are displayed when clicking on in-stock checkbox
        7. User can add product to cart
        8. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const amount = 1

        await step("Go to 15\" laptop page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('laptop')}->${t.lv2MenuItem('15inchlaptop')}`,
                "Go to Backpacks -> Labels/Brand -> 15\" Laptop"
            )
        })

        await step("Verity 15\" laptop page URL", async () => {
            await backpackspage.assertUrl(/backpacks\/(fit-up-to-15"-laptop|fit-up-to-15-laptop|laptop\/15-6-inch)\/?$/, "Assert 15\" Laptop page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart")
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on 15\" Laptop page");
        }
    })

    test(`
        9. Go to 17" laptop page
        10. In-stock products are displayed when clicking on in-stock checkbox
        11. User can add product to cart
        12. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const amount = 1

        await step("Go to 17\" laptop page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('laptop')}->${t.lv2MenuItem('17inchlaptop')}`,
                "Go to Backpacks -> Labels/Brand -> 17\" Laptop"
            )
        })

        await step("Verity 17\" laptop page URL", async () => {
            await backpackspage.assertUrl(/backpacks\/(fit-up-to-17"-laptop|fit-up-to-17-laptop|laptop\/17-3-inch)\/?$/, "Assert 17\" Laptop page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart")
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on 17\" Laptop page");
        }
    })
})

test.describe("Backpacks Collection", async () => {
    tests(["sg", "tw", "my", "id"], `
        1. Go to Collection Sefton page
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const amount = 1

        await step("Go to Collection Sefton page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)

            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('sefton')}`,
                "Go to Backpacks -> Collection -> Sefton"
            )
        })

        await step("Verity Collection Sefton page URL", async () => {
            await backpackspage.assertUrl(/backpacks\/collection\/sefton|backpack-collection-sefton\/?$/, "Assert Collection Sefton page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart")
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Collection Sefton page");
        }
    })

    tests(["sg", "tw", "my"], `
        5. Go to Pro-Dxl 6 page
        6. In-stock products are displayed when clicking on in-stock checkbox
        7. User can add product to cart
        8. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Unimax page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('prodlx6')}`,
                "Go to Backpacks -> Collection -> Pro Dxl 6"
            )
        })

        await step("Verity Adventure page URL", async () => {
            await backpackspage.assertUrl(/(collection\/pro-dlx-6)|backpack-collection-pro-dlx-6\/?$/, "Assert Pro Dxl 6 page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Pro-Dxl 6 page");
        }
    })

    tests(["sg"], `
        9. Go to Ecodiver page
        10. In-stock products are displayed when clicking on in-stock checkbox
        11. User can add product to cart
        12. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Ecodiver page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('ecodiver')}`,
                "Go to Backpacks -> Collection -> Ecodiver"
            )
        })

        await step("Verity Ecodiver page URL", async () => {
            await backpackspage.assertUrl(/(collection\/ecodiver)\/?$/, "Assert Ecodiver page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Ecodiver page");
        }
    })

    tests(["sg"], `
        13. Go to Sammies dream page
        14. In-stock products are displayed when clicking on in-stock checkbox
        15. User can add product to cart
        16. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Sammies dream page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('sammiesdream')}`,
                "Go to Backpacks -> Collection -> Sammies Dream"
            )
        })

        await step("Verity Sammies Dream page URL", async () => {
            await backpackspage.assertUrl(/backpacks\/collection\/sammies-dream/, "Assert Sammies Dream page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Sammies Dream page");
        }
    })

    tests(["sg", "my"], `
        17. Go to Prudence-eco page
        18. In-stock products are displayed when clicking on in-stock checkbox
        19. User can add product to cart
        20. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Prudence-eco page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('prudenceeco')}`,
                "Go to BackPacks -> Collection -> Prudence-eco"
            )
        })

        await step("Verity Prudence-eco page URL", async () => {
            await backpackspage.assertUrl(/backpacks\/collection\/prudence-eco/, "Assert Prudence-eco page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Prudence-eco page");
        }
    })

    tests(["jp"], `
        21. Go to Sub-lim page
        22. In-stock products are displayed when clicking on in-stock checkbox
        23. User can add product to cart
        24. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Sub-lim page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('backpack-sub-limcollection')}`,
                "Go to BackPacks -> Collection -> Sub-lim"
            )
        })

        await step("Verity Sub-lim page URL", async () => {
            await backpackspage.assertUrl(/sub-lim/, "Assert Sub-lim page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Sub-lim page");
        }
    })

    tests(["jp"], `
        25. Go to tech nos page
        26. In-stock products are displayed when clicking on in-stock checkbox
        27. User can add product to cart
        28. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Tech NOS page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('technos')}`,
                "Go to Backpacks -> Collection -> Tech NOS"
            )
        })

        await step("Verity Tech NOS page URL", async () => {
            await backpackspage.assertUrl(/(collection\/テクノス-コンボ)\/?$/, "Assert Tech NOS page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Tech NOS page");
        }
    })

    tests(["jp"], `
        29. Go to Hartmann page
        30. In-stock products are displayed when clicking on in-stock checkbox
        31. User can add product to cart
        32. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Hartmann page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('hartmann-collection')}`,
                "Go to Backpacks -> Collection -> Hartmann"
            )
        })

        await step("Verity Hartmann page URL", async () => {
            await backpackspage.assertUrl(/アルヴァーノ/, "Assert Hartmann page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Hartmann page");
        }
    })

    tests(["jp"], `
        33. Go to Audrina page
        34. In-stock products are displayed when clicking on in-stock checkbox
        35. User can add product to cart
        36. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Audrina page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('audrina-collection')}`,
                "Go to Backpacks -> Collection -> Audrina"
            )
        })

        await step("Verity Audrina page URL", async () => {
            await backpackspage.assertUrl(/オードリナ/, "Assert Audrina page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Audrina page");
        }
    })

    tests(["jp"], `
        37. Go to Samsonite red page
        38. In-stock products are displayed when clicking on in-stock checkbox
        39. User can add product to cart
        40. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Samsonite red page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('samsonite-red-collection')}`,
                "Go to Backpacks -> Collection -> Samsonite Red"
            )
        })

        await step("Verity Samsonite Red page URL", async () => {
            await backpackspage.assertUrl(/ゼットジップ/, "Assert Samsonite Red page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Samsonite Red page");
        }
    })

    tests(["tw"], `
        41. Go to XBR 2.0 page
        42. In-stock products are displayed when clicking on in-stock checkbox
        43. User can add product to cart
        44. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to XBR 2.0 page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('xbr2.0')}`,
                "Go to Backpacks -> Collection -> XBR 2.0"
            )
        })

        await step("Verity XBR 2.0 page URL", async () => {
            await backpackspage.assertUrl(/xbr2.0/, "Assert XBR 2.0 page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on xbr2.0 page");
        }
    })

    tests(["tw"], `
        45. Go to Zalia 3 page
        46. In-stock products are displayed when clicking on in-stock checkbox
        47. User can add product to cart
        48. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Zalia 3 page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('zalia3')}`,
                "Go to Backpacks -> Collection -> Zalia 3"
            )
        })

        await step("Verity Samsonite Red page URL", async () => {
            await backpackspage.assertUrl(/zalia3/, "Assert Zalia 3 page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Zalia 3 page");
        }
    })

    tests(["au"], `
        49. Go to Mobile Solution page
        50. In-stock products are displayed when clicking on in-stock checkbox
        51. User can add product to cart
        52. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Mobile Solution page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('backpackcollection')}->${t.lv2MenuItem('mobilesolution')}`,
                "Go to Backpacks -> Collection -> Mobile Solution"
            )
        })

        await step("Verity Samsonite Red page URL", async () => {
            await backpackspage.assertUrl(/collection\/mobile-solution/, "Assert Mobile Solution page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Mobile Solution page");
        }
    })

    tests(["au"], `
        53. Go to Classic Leather page
        54. In-stock products are displayed when clicking on in-stock checkbox
        55. User can add product to cart
        56. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Classic Leather page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('backpackcollection')}->${t.lv2MenuItem('classicleather')}`,
                "Go to Backpacks -> Collection -> Classic Leather"
            )
        })

        await step("Verity Samsonite Red page URL", async () => {
            await backpackspage.assertUrl(/collection\/sam-classic-leather/, "Assert Classic Leather page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Classic Leather page");
        }
    })

    tests(["au"], `
        57. Go to Detour page
        58. In-stock products are displayed when clicking on in-stock checkbox
        59. User can add product to cart
        60. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Detour page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('backpackcollection')}->${t.lv2MenuItem('detour')}`,
                "Go to Backpacks -> Collection -> Detour"
            )
        })

        await step("Verity Samsonite Red page URL", async () => {
            await backpackspage.assertUrl(/collection\/detour/, "Assert Detour page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Detour page");
        }
    })

    tests(["au"], `
        61. Go to Backpack shop all collection page
        62. In-stock products are displayed when clicking on in-stock checkbox
        63. User can add product to cart
        64. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Backpack shop all collection page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('backpackcollection')}->${t.lv2MenuItem('shopallbackpackscollection')}`,
                "Go to Backpacks -> Collection -> Backpack shop all collection"
            )
        })

        await step("Verity Samsonite Red page URL", async () => {
            await backpackspage.assertUrl(/collection/, "Assert Backpack shop all collection page URL")
        })
    })

    tests(["my"], `
        65. Go to Backpack Locus Eco page
        66. In-stock products are displayed when clicking on in-stock checkbox
        67. User can add product to cart
        68. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Backpack shop all collection page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('locuseco')}`,
                "Go to Backpacks -> Collection -> Backpack Locus Eco collection"
            )
        })

        await step("Verity Samsonite Red page URL", async () => {
            await backpackspage.assertUrl(/backpacks\/collection\/locus-eco/, "Assert Backpack shop Locus Eco page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Locus Eco page");
        }
    })
})