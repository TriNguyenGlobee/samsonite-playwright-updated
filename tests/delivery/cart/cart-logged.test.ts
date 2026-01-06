import { test, expect } from "../../../src/fixtures/test-fixture";
import { createCartPage } from "../../../src/factories/cart.factory";
import { createMinicartPage } from "../../../src/factories/minicart.factory";
import { Config } from "../../../config/env.config";
import { step } from "allure-js-commons";
import { t, clickUntil, extractNumber, delay, lazyLoad, scrollToTop, reload } from "../../../utils/helpers/helpers";
import { createHomePage } from "../../../src/factories/home.factory"
import { tests } from "../../../utils/helpers/localeTest"
import { steps } from "../../../utils/helpers/localeStep"
import { NewArrivalsPage } from "../../../src/pages/delivery/productlistingpage/newarrivals/newarrivals.page";

test.describe("Empty cart after login", () => {
    let initialCartBadge = 0

    test.beforeAll(async ({ loggedInPage }) => {
        const homepage = createHomePage(loggedInPage)
        const cartpage = createCartPage(loggedInPage)
        let cartPageURL = `${Config.baseURL}cart`

        initialCartBadge = await homepage.getCartBadgeValue()

        if (process.env.LOCALE == "id") {
            cartPageURL = `${Config.baseURL}en/cart`
        }

        if (initialCartBadge > 0) {
            await step('Verify that all products in minicart are removed', async () => {

                await loggedInPage.goto(cartPageURL)

                await cartpage.removeAllProducts()

                const numberOfProd = await cartpage.getNumberOfProducts()

                expect(numberOfProd).toBe(0)
            })
        }
    });

    test(`
        1. Minicart is displayed correctly
        2. Click shopping cart button to close minicart
        3. Explore by category
        `, async ({ loggedInPage }) => {
        const homePage = createHomePage(loggedInPage);
        const minicartPage = createMinicartPage(loggedInPage)
        const amountOfFooterCategoryItem = await minicartPage.getAmountFooterCategoryItems()

        await step("Click on Cart icon", async () => {
            await homePage.click(homePage.cartIcon)
        })

        await step("Verify that minicart is displayed", async () => {
            expect(await minicartPage.isMinicartShown()).toBe(true)
            expect(minicartPage.emptyCartMsg).toHaveText(t.minicart('emptymsg'))
            expect(minicartPage.startShoppingButton).toBeVisible()
            expect(minicartPage.exploreByCategoryText).toBeVisible()
            expect(await minicartPage.footerCategoryItem.count()).toBe(amountOfFooterCategoryItem)
        })

        await step("Click Shopping Cart button", async () => {
            await minicartPage.click(minicartPage.startShoppingButton)
        })

        await step("Verify that Minicart is closed", async () => {
            expect(await minicartPage.isMinicartShown()).toBe(false)
        })

        await step("Explore by footer category", async () => {
            const expectedURL = await homePage.getLocatorURL(minicartPage.footerCategoryItem.nth(1))

            await clickUntil(loggedInPage, homePage.cartIcon, minicartPage.minicartRender, 'visible', {
                delayMs: 500,
                maxTries: 3,
                timeoutMs: 3000
            })

            await minicartPage.assertNavigatedURLByClickLocator(loggedInPage, minicartPage.footerCategoryItem.nth(1), expectedURL!)
        })
    })

    test(`4. Cart page is displayed`, async ({ loggedInPage }) => {
        const cartpage = createCartPage(loggedInPage)

        await steps(["au", "jp", "my", "nz", "ph", "sg", "tw"], 'Go to Cart page by URL', async () => {
            await loggedInPage.goto(`${Config.baseURL}cart`)
        })

        await steps(["id"], 'Go to Cart page by URL', async () => {
            await loggedInPage.goto(`${Config.baseURL}en/cart`)
        })

        await step('Verify that the cart page is displayed', async () => {
            await cartpage.isCartPageDisplayed()

            expect(cartpage.pageTitle).toHaveText(t.cartpage('pageTitle'))
            expect(cartpage.emptymsg).toHaveText(t.cartpage('emptymsg'))
        })
    })
});

test.describe("Add products to cart after login", () => {
    let initialCartBadge = 0
    let cartPageURL = `${Config.baseURL}cart`
    let checkoutPageURL = `${Config.baseURL}checkout`

    test.beforeEach(async ({ loggedInPage }) => {
        const homepage = createHomePage(loggedInPage)
        const cartpage = createCartPage(loggedInPage)

        initialCartBadge = await homepage.getCartBadgeValue()

        if (process.env.LOCALE == "id") {
            cartPageURL = `${Config.baseURL}en/cart`
            checkoutPageURL = `${Config.baseURL}en/checkout`
        }

        if (initialCartBadge > 0) {
            await step('Verify that all products in minicart are removed', async () => {
                await loggedInPage.goto(cartPageURL)

                await cartpage.removeAllProducts()

                const numberOfProd = await cartpage.getNumberOfProducts()

                expect(numberOfProd).toBe(0)
            })
        }
    });

    test(`
        1. Minicart is displayed after adding product to cart
        2. Prodcollection and prodname are displayed correctly in the minicart
        3. Viewcart button and Checkout button are displayed in the minicart
        4. Amazon pay button is displayed in the minicart
        5. Cart page is displayed when clicking on view cart button
        6. Checkout page is displayed when clicking on checkout button
        7. Amazone pay page is displayed when clicking on Amanazon pay button
        `, async ({ loggedInPage }) => {
        const homePage = createHomePage(loggedInPage);
        const minicart = createMinicartPage(loggedInPage)
        const cartpage = createCartPage(loggedInPage)
        const newarrivalspage = new NewArrivalsPage(loggedInPage)

        const prodIndex = 1;
        let prodCollection: string, prodName: string

        await step('Go to New Arrivals', async () => {
            await homePage.clickMenuItem('newarrivals')
            await newarrivalspage.logoImg.hover()

            await step("Click In-stock checkbox", async () => {
                if (await homePage.productTableShow.isVisible()) {
                    await homePage.clickCheckbox(loggedInPage, t.homepage('in-stock'),
                        "Checking the In-stock checkbox")
                } else {
                    test.skip(true, "Product table not visible, skipping the test.");
                }
            })
        })

        const isInStockProdNotExist = await cartpage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify the minicart is displayed after adding product to cart", async () => {
                await lazyLoad(loggedInPage)
                await scrollToTop(loggedInPage)
                await reload(loggedInPage)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(1, "Add a in-stock product to cart"),
                    //expect(minicart.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })
        } else {
            test.skip(true, "No in-stock products found on Duffle type page");
        }

        await step('Verify prodcollection and prodname are displayed in the the minicart correctly', async () => {
            const minicartProdName = await minicart.getMinicartProdName(prodIndex)
            const minicartProdCollection = await minicart.getMinicartProdCollection(prodIndex)
            prodCollection = await cartpage.getProdCollection(prodIndex)
            prodName = await cartpage.getProdName(prodIndex)

            expect(minicartProdCollection).toBe(prodCollection)
            expect(minicartProdName).toBe(prodName)
        })

        await step('Verify view cart button and checkout button are displayed', async () => {
            await clickUntil(loggedInPage, homePage.cartIcon, minicart.minicartRender, 'visible', {
                delayMs: 300,
                maxTries: 3,
                timeoutMs: 5000
            })
            await minicart.assertVisible(minicart.viewCartButton)
            await minicart.assertVisible(minicart.checkoutButton)
        })

        await steps(["jp"], 'Verify amazone pay button is displayed', async () => {
            await minicart.assertVisible(minicart.amazonePayButton)
        })

        await step('Verify the cart page is displayed when clicking on view cart button', async () => {
            await clickUntil(loggedInPage, homePage.cartIcon, minicart.minicartRender, 'visible', {
                delayMs: 500,
                maxTries: 3,
                timeoutMs: 3000
            })

            await minicart.assertNavigatedURLByClickLocator(loggedInPage, minicart.viewCartButton, cartPageURL,
                "Click on View Cart button and check Cart page is displayed"
            )
        })

        await step('Verify the checkout page is displayed when clicking on checkout button', async () => {
            await clickUntil(loggedInPage, homePage.cartIcon, minicart.minicartRender, 'visible', {
                delayMs: 500,
                maxTries: 3,
                timeoutMs: 3000
            })

            await minicart.assertNavigatedURLByClickLocator(loggedInPage, minicart.checkoutButton, checkoutPageURL,
                "Click on Checkout button and check Checkout Login page is displayed"
            )
        })

        await steps(["jp"], 'Verify the Amazone pay page is displayed when clicking on Amazone pay button', async () => {
            await clickUntil(loggedInPage, homePage.cartIcon, minicart.minicartRender, 'visible', {
                delayMs: 500,
                maxTries: 3,
                timeoutMs: 3000
            })

            await homePage.click(minicart.amazonePayButton, "Click on Amazone pay button")

            await homePage.assertUrl(/amazon\.co\.jp/)
        })

    })

    test(`
        8. Add multiple products to cart
        9. Verify the number of products in the minicart
        10. Verify the total amount payable is correct
        11. Remove product modal is displayed when remmoving a product in the minicart
        12. Remove product modal can be closed by close button and cancel button
        13. Remove all products in the cart
        `, async ({ loggedInPage }) => {
        const homePage = createHomePage(loggedInPage);
        const minicart = createMinicartPage(loggedInPage)
        const cartpage = createCartPage(loggedInPage)
        const newarrivalspage = new NewArrivalsPage(loggedInPage)

        const prodIndexes = [1, 2];

        await step('Go to New Arrivals', async () => {
            await homePage.clickMenuItem('newarrivals')
            await newarrivalspage.logoImg.hover()
        })

        await step("Click In-stock checkbox", async () => {
            if (await homePage.productTableShow.isVisible()) {
                await homePage.clickCheckbox(loggedInPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        const isInStockProdNotExist = await cartpage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Add multi products to cart", async () => {
                await lazyLoad(loggedInPage)
                await delay(500)
                await Promise.all([
                    cartpage.addProductToCartByIndex(prodIndexes),
                    //expect(minicart.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })
        } else {
            test.skip(true, "No in-stock products found on Duffle type page");
        }

        await step('Verify number of products in the minicart', async () => {
            expect(await minicart.getNumberOfProducts()).toBe(2)
        })

        const firstProductPrice = await extractNumber(await cartpage.getProdPrice(prodIndexes[0]));
        const secondProductPrice = await extractNumber(await cartpage.getProdPrice(prodIndexes[1]));
        const firstMinicartProductPrice = await extractNumber(await minicart.getMinicartProdPrice(prodIndexes[0]));
        const secondMinicartProductPrice = await extractNumber(await minicart.getMinicartProdPrice(prodIndexes[1]));
        const shippingCost = await extractNumber(await minicart.getShippingCost());
        const shippingDiscount = await extractNumber(await minicart.getShippingDiscount())
        const promotionDiscount = await extractNumber(await minicart.getPromotionDiscount())
        const totalPrice = await extractNumber(await minicart.getTotalPrice());

        console.log(`Datatest: firstProductPrice: ${firstProductPrice}, secondProductPrice: ${secondProductPrice}, firstMinicartProductPrice: ${firstMinicartProductPrice}, secondMinicartProductPrice: ${secondMinicartProductPrice}`)
        console.log(`Datatest: shippingCost: ${shippingCost}, shippingDiscount: ${shippingDiscount}, totalPrice: ${totalPrice}`)

        await step('Verify total amount payable is correct', async () => {
            expect(firstProductPrice).toBe(firstMinicartProductPrice)
            expect(secondProductPrice).toBe(secondMinicartProductPrice)
            expect(totalPrice).toBeCloseTo(firstProductPrice + secondProductPrice + shippingCost - shippingDiscount - promotionDiscount, 2)
        })

        await step('Verify remove product modal is displayed when removing a product in the minicart', async () => {
            await clickUntil(loggedInPage, homePage.cartIcon, minicart.minicartRender, 'visible', {
                delayMs: 300,
                maxTries: 3,
                timeoutMs: 3000
            })

            await minicart.click(minicart.minicartRemoveProdButton, 'Click remove product button in the minicart')

            await minicart.assertVisible(minicart.removeProductModal, 'Assert remove product modal is displayed')
        })

        await step('Verify remove product modal can be closed by close button and cancel button', async () => {
            await minicart.click(minicart.removeProdModalCloseButton, 'Close remove product modal')

            await minicart.assertHidden(minicart.removeProductModal, 'Assert remove product modal is closed')

            await clickUntil(loggedInPage, homePage.cartIcon, minicart.minicartRender, 'visible', {
                delayMs: 300,
                maxTries: 3,
                timeoutMs: 3000
            })

            await minicart.click(minicart.minicartRemoveProdButton, 'Click remove product button in the minicart')

            await minicart.click(minicart.removeProdModalCancelButton, 'Cancel remove product')

            await minicart.assertHidden(minicart.removeProductModal, 'Assert remove product modal is closed')
        })

        await step('Verify that all products in minicart are removed', async () => {
            await clickUntil(loggedInPage, homePage.cartIcon, minicart.minicartRender, 'visible', {
                delayMs: 300,
                maxTries: 3,
                timeoutMs: 3000
            })

            await minicart.removeAllProducts()

            await minicart.assertHidden(minicart.minicartRender, 'Assert minicart is closed after removing all products')

            const numberOfProd = await minicart.getNumberOfProducts()

            expect(numberOfProd).toBe(0)
        })
    })

    test(`
        14. Prodcollection and prodname are displayed correctly in Cart page
        15. Verify the number of products in the Cart page
        16. Checkout page is displayed when clicking on checkout button
        17. Amazone pay page is displayed when clicking on Amanazon pay button
        18. Verify the total amount payable is correct
        19. Remove product modal is displayed when remmoving a product in Cart page
        20. Remove product modal can be closed by close button and cancel button
        21. Remove all products in the Cart page
        `, async ({ loggedInPage }) => {
        const homePage = createHomePage(loggedInPage);
        const cartpage = createCartPage(loggedInPage)
        const newarrivalspage = new NewArrivalsPage(loggedInPage)

        const prodIndexes = [1, 2];
        const prodIndex = 1;
        let prodCollection: string, prodName: string

        await step('Go to New Arrivals', async () => {
            await homePage.clickMenuItem('newarrivals')
            await newarrivalspage.logoImg.hover()

            await step("Click In-stock checkbox", async () => {
                if (await homePage.productTableShow.isVisible()) {
                    await homePage.clickCheckbox(loggedInPage, t.homepage('in-stock'),
                        "Checking the In-stock checkbox")
                } else {
                    test.skip(true, "Product table not visible, skipping the test.");
                }
            })
        })

        const isInStockProdNotExist = await cartpage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Add multi products to cart", async () => {
                await lazyLoad(loggedInPage)
                await delay(500)
                await Promise.all([
                    cartpage.addProductToCartByIndex(prodIndexes),
                    //expect(minicart.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })
        } else {
            test.skip(true, "No in-stock products found on Duffle type page");
        }

        const firstProductPrice = await extractNumber(await cartpage.getProdPrice(prodIndexes[0]));
        const secondProductPrice = await extractNumber(await cartpage.getProdPrice(prodIndexes[1]));

        prodCollection = await cartpage.getProdCollection(prodIndex)
        prodName = await cartpage.getProdName(prodIndex)
        
        await step('Go to Cart page by URL', async () => {
            await delay(500)
            await loggedInPage.goto(cartPageURL)
        })

        await step('Verify prodcollection and prodname are displayed in the the minicart correctly', async () => {
            const cartPageProdName = await cartpage.getCartPageProdName(prodIndex)
            const cartPageProdCollection = await cartpage.getCartPageProdCollection(prodIndex)

            expect(cartPageProdCollection).toBe(prodCollection)
            expect(cartPageProdName).toBe(prodName)
        })

        await step('Verify number of products in Cart page', async () => {
            expect(await cartpage.getNumberOfProducts()).toBe(2)
        })

        await step('Verify the checkout login page is displayed when clicking on checkout button', async () => {
            await cartpage.assertNavigatedURLByClickLocator(loggedInPage, cartpage.checkoutButton, checkoutPageURL,
                "Click on Checkout button and check Checkout Login page is displayed"
            )
        })

        await steps(["jp"], 'Verify the Amazone pay page is displayed when clicking on Amazone pay button', async () => {
            await homePage.click(cartpage.amazonePayButton, "Click on Amazone pay button")

            await homePage.assertUrl(/amazon\.co\.jp/)
        })

        await steps(["jp"], 'Go to Cart page by URL', async () => {
            await loggedInPage.goto(`${Config.baseURL}cart`)
        })

        const firstMinicartProductPrice = await extractNumber(await cartpage.getCartPageProdPrice(prodIndexes[0]));
        const secondMinicartProductPrice = await extractNumber(await cartpage.getCartPageProdPrice(prodIndexes[1]));
        const shippingCost = await extractNumber(await cartpage.getShippingCost());
        const shippingDiscount = await extractNumber(await cartpage.getShippingDiscount())
        const promotionDiscount = await extractNumber(await cartpage.getPromotionDiscount()) 
        const totalPrice = await extractNumber(await cartpage.getTotalPrice());

        await step('Verify total amount payable is correct', async () => {
            expect(firstProductPrice).toBe(firstMinicartProductPrice)
            expect(secondProductPrice).toBe(secondMinicartProductPrice)
            expect(totalPrice).toBeCloseTo(firstProductPrice + secondProductPrice + shippingCost - shippingDiscount - promotionDiscount, 2)
        })

        await step('Verify remove product modal is displayed when removing a product in Cart page', async () => {
            await cartpage.click(cartpage.removeProductButton.first(), 'Click remove product button in Cart page')

            await cartpage.assertVisible(cartpage.removeProductModal, 'Assert remove product modal is displayed')
        })

        await step('Verify remove product modal can be closed by close button and cancel button', async () => {
            await cartpage.click(cartpage.removeProdModalCloseButton, 'Close remove product modal')

            await cartpage.assertHidden(cartpage.removeProductModal, 'Assert remove product modal is closed')

            await cartpage.click(cartpage.removeProductButton.first(), 'Click remove product button in Cart page')

            await cartpage.click(cartpage.removeProdModalCancelButton, 'Cancel remove product')

            await cartpage.assertHidden(cartpage.removeProductModal, 'Assert remove product modal is closed')
        })

        await step('Verify that all products in minicart are removed', async () => {
            await cartpage.removeAllProducts()

            const numberOfProd = await cartpage.getNumberOfProducts()

            expect(numberOfProd).toBe(0)
        })
    })

    tests(["jp"], `
        22. Add gift service
        23. Remove gift service
        `, async ({ loggedInPage }) => {
        const homePage = createHomePage(loggedInPage);
        const cartpage = createCartPage(loggedInPage)
        const newarrivalspage = new NewArrivalsPage(loggedInPage)

        const prodIndex = 1;

        await step('Go to New Arrivals', async () => {
            await homePage.clickMenuItem('newarrivals')
            await newarrivalspage.logoImg.hover()
        })

        await step('Add a product to cart', async () => {
            await cartpage.addProductToCartByIndex(prodIndex)
        })

        await step('Go to Cart page by URL', async () => {
            await loggedInPage.goto(`${Config.baseURL}cart`)
        })

        await step('Add a gift service', async () => {
            await cartpage.addGiftService(prodIndex)
        })

        await step('Verify that gift service is added', async () => {
            await expect(cartpage.prodGiftRow).toBeVisible()
        })

        await step('Remove a gift service', async () => {
            await cartpage.click(cartpage.removeGiftServiceButton.first(), "Click gift service button")
        })

        await step('Verify that gift service is removed', async () => {
            await expect(cartpage.prodGiftRow).not.toBeVisible()
        })
    })
});