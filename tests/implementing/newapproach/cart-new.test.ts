import { test, expect } from "../../../src/fixtures/test-fixture";
import { createMinicartPage } from '../../../src/factories/minicart.factory'
import { createCartPage } from '../../../src/factories/cart.factory'
import { createLoginPage } from "../../../src/factories/login.factory";
import { RegisterPage } from "../../../src/pages/delivery/login/register.page";
import { MyPage } from "../../../src/pages/implementing/mypage/mypage.page";
import { MyProfilePage } from "../../../src/pages/implementing/mypage/myprofile.page";
import { Config } from "../../../config/env.config";
import { step } from "allure-js-commons";
import { t, clickUntil, extractNumber, delay, lazyLoad, screenshotAndAttach, generateReadableTimeBasedId, getLocalPhone } from "../../../utils/helpers/helpers";
import { createHomePage } from "../../../src/factories/home.factory"
import { NewArrivalsPage } from "../../../src/pages/delivery/productlistingpage/newarrivals/newarrivals.page";

test.describe("Cartpage-empty", () => {
    test(`
        1. Minicart is displayed - Empty cart
        2. Minicart can be closed by Start Shopping button - Minicart closed
        3. Minicart Explore by category URL navigation
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

test.describe("Cartpage-add/remove products", () => {
    let cartPageURL = `${Config.baseURL}cart`
    const newemail = "globee_test" + generateReadableTimeBasedId() + "@yopmail.com"
    const newpass = "Test@123"

    test.beforeEach(async ({ basicAuthPage }) => {
        const loginPage = createLoginPage(basicAuthPage);
        const registerpage = new RegisterPage(basicAuthPage)

        await step('Register page', async () => {
            await loginPage.goToLoginRegisterPage();
            await loginPage.goToRegisterPage()
        })

        await step('Fill information to form', async () => {
            await registerpage.fillRegisterForm({ email: newemail, password: newpass, phone: getLocalPhone(true) })
        })

        await step('Click Create Account button', async () => {
            await registerpage.click(registerpage.createAccountButton)
            await basicAuthPage.waitForURL(/account/, { waitUntil: 'networkidle' })
        })
    });

    /*
    test(`
        1. Minicart is displayed - Product added
        2. Prodcollection and prodname are correct in the minicart
        3. Cart page is displayed - Cart page shows
        4. Checkout login page is displayed - Checkout login page shows
        5. Remove product modal is displayed - Remove product modal shows corrctly
        6. Remove prodcut model is closed
        7. Product is removed - Minicart is empty
        `, async ({ basicAuthPage }) => {
        const homePage = createHomePage(basicAuthPage);
        const minicart = createMinicartPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)

        const prodIndex = 1;
        let prodCollection: string, prodName: string

        await step('Go to Luggage', async () => {
            await homePage.clickMenuItem('luggage')
            await newarrivalspage.logoImg.hover()

            await step("Click In-stock checkbox", async () => {
                await homePage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            })
        })

        await step("Get product collection", async () => {
            await cartpage.assertHidden(cartpage.underlay)
        })

        const isInStockProdNotExist = await cartpage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify - 1. Minicart is displayed - Product added", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(1, "Add a in-stock product to cart"),
                    expect(minicart.minicartRender).toBeVisible({ timeout: 5000 })
                ]);
                await screenshotAndAttach(basicAuthPage, './screenshots/Cartpage-product-added', '01 - Minicart-product-added');
            })
        } else {
            test.skip(true, "No in-stock products found on Duffle type page");
        }

        await step('Verify - 2. Prodcollection and prodname are correct in the minicart', async () => {
            prodCollection = await cartpage.getProdCollection(prodIndex)
            prodName = await cartpage.getProdName(prodIndex)
            const minicartProdName = await minicart.getMinicartProdName(prodIndex)
            const minicartProdCollection = await minicart.getMinicartProdCollection(prodIndex)

            expect(minicartProdCollection).toBe(prodCollection)
            expect(minicartProdName).toBe(prodName)
            await screenshotAndAttach(basicAuthPage, './screenshots/Cartpage-product-added', '02 - Minicart-prodname-prodcollection');
        })

        await step('Verify - 3. Cart page is displayed - Cart page shows', async () => {
            await clickUntil(basicAuthPage, homePage.cartIcon, minicart.minicartRender, 'visible', {
                delayMs: 500,
                maxTries: 3,
                timeoutMs: 3000
            })

            await minicart.assertNavigatedURLByClickLocator(basicAuthPage, minicart.viewCartButton, `cart`,
                "Click on View Cart button and check Cart page is displayed"
            )

            await screenshotAndAttach(basicAuthPage, './screenshots/Cartpage-product-added', '03 - Cart page');
        })

        await step('Verify - 4. Checkout login page is displayed - Checkout login page shows', async () => {
            await clickUntil(basicAuthPage, homePage.cartIcon, minicart.minicartRender, 'visible', {
                delayMs: 500,
                maxTries: 3,
                timeoutMs: 3000
            })

            await minicart.assertNavigatedURLByClickLocator(basicAuthPage, minicart.checkoutButton, `checkoutlogin`,
                "Click on Checkout button and check Checkout Login page is displayed"
            )

            await screenshotAndAttach(basicAuthPage, './screenshots/Cartpage-product-added', '04 - Checkout login page');
        })

        await step('Verify - 5. Remove product modal is displayed - Remove product modal shows corrctly', async () => {
            await clickUntil(basicAuthPage, homePage.cartIcon, minicart.minicartRender, 'visible', {
                delayMs: 300,
                maxTries: 3,
                timeoutMs: 3000
            })

            await minicart.click(minicart.minicartRemoveProdButton, 'Click remove product button in the minicart')

            await minicart.assertVisible(minicart.removeProductModal, 'Assert remove product modal is displayed')

            await screenshotAndAttach(basicAuthPage, './screenshots/Cartpage-product-added', '05 - Remove product modal');
        })

        await step('Verify - 6. Remove prodcut model is closed', async () => {
            await minicart.click(minicart.removeProdModalCloseButton, 'Close remove product modal')

            await minicart.assertHidden(minicart.removeProductModal, 'Assert remove product modal is closed')

            await clickUntil(basicAuthPage, homePage.cartIcon, minicart.minicartRender, 'visible', {
                delayMs: 300,
                maxTries: 3,
                timeoutMs: 3000
            })

            await minicart.click(minicart.minicartRemoveProdButton, 'Click remove product button in the minicart')

            await minicart.click(minicart.removeProdModalCancelButton, 'Cancel remove product')

            await minicart.assertHidden(minicart.removeProductModal, 'Assert remove product modal is closed')

            await screenshotAndAttach(basicAuthPage, './screenshots/Cartpage-product-added', '06 - Remove product modal closed');
        })

        await step('Verify - 7. Product is removed - Minicart is empty', async () => {
            await clickUntil(basicAuthPage, homePage.cartIcon, minicart.minicartRender, 'visible', {
                delayMs: 300,
                maxTries: 3,
                timeoutMs: 3000
            })

            await minicart.removeAllProducts()

            await minicart.assertHidden(minicart.minicartRender, 'Assert minicart is closed after removing all products')

            const numberOfProd = await minicart.getNumberOfProducts()

            expect(numberOfProd).toBe(0)

            await screenshotAndAttach(basicAuthPage, './screenshots/Cartpage-product-added', '07 - Cartpage-minicart-empty');
        })
    })
    */
    test(`
        1. Prodcollection and prodname are displayed - Number of products in Cart page
        2. Checkout login page is displayed - Checkout page shows
        3. Total amount payable - The total amount payable is correct
        4. Apply a coupon - Coupon is added
        5. Remove a coupon - Coupon is removed
        6. Remove product modal is displayed - Remove product modal shows corrctly
        7. Remove prodcut model is closed
        8. Product is removed - Cart page is empty
        `, async ({ basicAuthPage }) => {
        const homePage = createHomePage(basicAuthPage);
        const cartpage = createCartPage(basicAuthPage)
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)

        const prodIndexes = [1, 2];
        const prodIndex = 1;
        let prodCollection: string, prodName: string

        await step('Go to Luggage', async () => {
            await homePage.clickMenuItem('luggage')
            await newarrivalspage.logoImg.hover()

            await step("Click In-stock checkbox", async () => {
                await homePage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            })
        })

        const isInStockProdNotExist = await cartpage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Add multi products to cart", async () => {
                await lazyLoad(basicAuthPage)
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
            await basicAuthPage.goto(cartPageURL)
        })

        await step('Verify - 1. Prodcollection and prodname are displayed - Number of products in Cart page', async () => {
            const cartPageProdName = await cartpage.getCartPageProdName(prodIndex)
            const cartPageProdCollection = await cartpage.getCartPageProdCollection(prodIndex)

            expect(cartPageProdCollection).toBe(prodCollection)
            expect(cartPageProdName).toBe(prodName)
            expect(await cartpage.getNumberOfProducts()).toBe(2)

            await screenshotAndAttach(basicAuthPage, './screenshots/Cartpage-product-added', '01 - Number of products');
        })

        await step('Verify - 2. Checkout page is displayed - Checkout page shows', async () => {
            await cartpage.assertNavigatedURLByClickLocator(basicAuthPage, cartpage.checkoutButton, `checkout`,
                "Click on Checkout button and check Checkout Login page is displayed"
            )

            await screenshotAndAttach(basicAuthPage, './screenshots/Cartpage-product-added', '02 - Checkout page');
        })

        const firstMinicartProductPrice = await extractNumber(await cartpage.getCartPageProdPrice(prodIndexes[0]));
        const secondMinicartProductPrice = await extractNumber(await cartpage.getCartPageProdPrice(prodIndexes[1]));
        const shippingDiscount = await extractNumber(await cartpage.getShippingDiscount())
        const shippingCost = await extractNumber(await cartpage.getShippingCost());
        const totalPrice = await extractNumber(await cartpage.getTotalPrice());

        await step('Verify - 3. Total amount payable - The total amount payable is correct', async () => {
            expect(firstProductPrice).toBe(firstMinicartProductPrice)
            expect(secondProductPrice).toBe(secondMinicartProductPrice)
            expect(totalPrice).toBe(firstProductPrice + secondProductPrice + shippingCost - shippingDiscount)

            await screenshotAndAttach(basicAuthPage, './screenshots/Cartpage-product-added', '03 - The total amount payable');
        })

        await step('Click on Please select a coupon button', async () => {
            await cartpage.click(cartpage.selectCouponButton)
        })

        await step('Verify - 4. Apply a coupon - Coupon is added', async () => {
            await cartpage.click(cartpage.couponApplyLink.first(),
                "Click apply coupon link")

            await cartpage.assertVisible(cartpage.couponCodeAdded,
                "Assert the coupon is added"
            )

            await screenshotAndAttach(basicAuthPage, './screenshots/Cartpage-product-added', '04 - Coupon added');
        })

        await step('Verify -  5. Remove a coupon - Coupon is removed', async () => {
            await cartpage.removeCoupon()

            await cartpage.assertHidden(cartpage.couponCodeAdded)
            await screenshotAndAttach(basicAuthPage, './screenshots/Cartpage-product-added', '05 - Coupon removed');
        })

        await step('Verify - 6. Remove product modal is displayed - Remove product modal shows corrctly', async () => {
            await cartpage.click(cartpage.removeProductButton.first(), 'Click remove product button in Cart page')

            await cartpage.assertVisible(cartpage.removeProductModal, 'Assert remove product modal is displayed')
            await screenshotAndAttach(basicAuthPage, './screenshots/Cartpage-product-added', '06 - Remove product modal');
        })

        await step('Verify - 7. Remove prodcut model is closed', async () => {
            await cartpage.click(cartpage.removeProdModalCloseButton, 'Close remove product modal')

            await cartpage.assertHidden(cartpage.removeProductModal, 'Assert remove product modal is closed')

            await cartpage.click(cartpage.removeProductButton.first(), 'Click remove product button in Cart page')

            await cartpage.click(cartpage.removeProdModalCancelButton, 'Cancel remove product')

            await cartpage.assertHidden(cartpage.removeProductModal, 'Assert remove product modal is closed')

            await screenshotAndAttach(basicAuthPage, './screenshots/Cartpage-product-added', '07 - Remove product modal closed');
        })

        await step('Verify - 8. Product is removed - Cart page is empty', async () => {
            await cartpage.removeAllProducts()

            const numberOfProd = await cartpage.getNumberOfProducts()

            expect(numberOfProd).toBe(0)

            await screenshotAndAttach(basicAuthPage, './screenshots/Cartpage-product-added', '08 - Cartpage-empty-cart');
        })
    })

    test.afterEach(async ({ basicAuthPage }) => {
        const mypage = new MyPage(basicAuthPage)
        const myProfilePage = new MyProfilePage(basicAuthPage);

        await mypage.goto(Config.baseURL + 'profile')
        await myProfilePage.unregisterAccount()
        await screenshotAndAttach(basicAuthPage, './screenshots/Cartpage-product-added', '09 - AfterEach-Home page');
    })
});