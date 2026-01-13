import { test, expect } from "../../../src/fixtures/test-fixture"
import { t, clickUntil, PageUtils, delay } from "../../../utils/helpers/helpers";
import { NewArrivalsPage } from "../../../src/pages/delivery/productlistingpage/newarrivals/newarrivals.page";
import { createHomePage } from "../../../src/factories/home.factory";
import { createMinicartPage } from "../../../src/factories/minicart.factory";
import { createCartPage } from "../../../src/factories/cart.factory";
import { CheckoutLoginPage } from "../../../src/pages/implementing/checkout/checkoutlogin.page";
import { step } from "allure-js-commons";
import { CheckoutPage } from "../../../src/pages/implementing/checkout/checkout.page";
import { loadTestData } from "../../../utils/data";
import { Config } from "../../../config/env.config";
import { screenshotAndAttach } from "../../../utils/helpers/helpers";

test.describe("Guest-checkout", async () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)
        const homepage = createHomePage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)

        await step('Go to New Arrivals', async () => {
            await homepage.clickMenuItem('luggage')
            await newarrivalspage.logoImg.hover()

            await step('Click on In-stock checkbox', async () => {
                await homepage.clickCheckbox(basicAuthPage, `${t.homepage('in-stock')}`)
            })
        })

        await step("Add a product to cart", async () => {
            await Promise.all([
                cartpage.addMultipleProductsToCart(1, "Add a in-stock product to cart"),
                //expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
            ]);
        })

        await step('Go to checkout login page', async () => {
            await clickUntil(basicAuthPage, homepage.cartIcon, minicartpage.minicartRender, 'visible', {
                delayMs: 500,
                maxTries: 3,
                timeoutMs: 3000
            })

            await minicartpage.click(minicartpage.checkoutButton,
                "Click on Checkout button"
            )
        })
    })

    test(`
        1. Checkout page is displayed - Your detail form shows correctly    
        2. Step 1 is done - Recipient infor form shows correctly
        3. Step 2 is done - Payment methods section shows correctly
        4. Payment method is selected - Payment details form shows correctly
        5. Step 3 is done - Place Order button shows
        6. Ordering success page is displayed
        `, async ({ basicAuthPage }) => {
        const checkoutpage = new CheckoutPage(basicAuthPage)
        const checkoutloginpage = new CheckoutLoginPage(basicAuthPage)
        const { checkoutFullData } = loadTestData();
        const { checkoutShippingData } = loadTestData();
        const cardNumberIframe = basicAuthPage.locator('input#cardNumber');

        await step("Go to guest checkout page", async () => {
            await checkoutloginpage.click(checkoutloginpage.guestcheckoutButton,
                "Clicking on Guest checkout button"
            )
        })

        await step("Verify - 1. Checkout page is displayed - Your detail form shows correctly", async () => {
            expect(await checkoutpage.isCheckoutPageDisplayed()).toBe(true)
            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-checkout', '01 - Your detail form');
        })

        await step("Fill your detail with full information", async () => {
            await checkoutpage.fillCheckoutYourDetailForm(basicAuthPage, checkoutFullData)
        })

        await checkoutpage.click(checkoutpage.continueButton, "Click on Step 1 Continue button")

        await step("Verify - 2. Step 1 is done - Recipient infor form shows correctly", async () => {
            await checkoutpage.assertEqual(await checkoutpage.isCheckoutStepDone("Your Details"), true,
                "Assert current step 1 status is Done: true"
            )

            await checkoutloginpage.assertVisible(checkoutpage.shippingSection.first(), "Assert recipient infor section visbile")

            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-checkout', '02 - Recipient infor form');
        })

        await step("Fill recipient info", async () => {
            await checkoutpage.fillRecipientDetilsForm(basicAuthPage, checkoutShippingData)
        })

        await step("Click on continue button", async () => {
            await checkoutpage.click(checkoutpage.recipientContinueBtn, "Click on Step 2 Continue button")
            await PageUtils.waitForPageLoad(basicAuthPage)
        })

        await step("Verify - 3. Step 2 is done - Payment methods section shows correctly", async () => {
            await checkoutpage.assertEqual(await checkoutpage.isCheckoutStepDone("Shipping"), true,
                "Assert current step 2 status is Done: true"
            )

            await checkoutloginpage.assertVisible(checkoutpage.visaIcon, "Assert payment method section visbile")

            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-checkout', '03 - Payment methods section');
        })

        await step("Select Visa payment method", async () => {
            await checkoutpage.click(checkoutpage.visaIcon, "Select Visa payment method")
        })

        await step("Verify - 4. Payment method is selected - Payment details form shows correctly", async () => {
            await checkoutpage.assertVisible(checkoutpage.paymentcontinueBtn,
                "Assert the Payment Continue button is displayed"
            )

            await checkoutloginpage.assertVisible(cardNumberIframe, "Assert payment detail form visbile")

            await delay(500)
            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-checkout', '04 - Payment detail form');
        })

        await step("Fill payment details with Visa card", async () => {
            const { visaCheckoutData } = loadTestData();
            await checkoutpage.fillVisaPaymentDetails(basicAuthPage, visaCheckoutData.cardNumber,
                visaCheckoutData.expiryMonth, visaCheckoutData.expiryYear, visaCheckoutData.cvv,
                "Fill Visa card payment details");
        })

        await step("Click payment continue button", async () => {
            await checkoutpage.click(checkoutpage.paymentcontinueBtn, "Click on payment continue button")
        })

        await step("Verify - 5. Step 3 is done - Place Order button shows", async () => {
            await checkoutpage.assertEqual(await checkoutpage.isCheckoutStepDone("Payment"), true,
                "Assert current step 3 status is Done: true"
            )

            await checkoutloginpage.assertVisible(checkoutpage.placeOrderBtn, "Assert place order button visbile")

            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-checkout', '05 - Place Order');
        })

        await step("Click place order button", async () => {
            await checkoutpage.click(checkoutpage.placeOrderBtn, "Click on Place Order button")
            await basicAuthPage.waitForURL(/orderconfirmation/)
        })

        await step("Verify - 6. Ordering success page is displayed", async () => {
            await checkoutpage.assertVisible(checkoutpage.orderSuccessTitle,
                "Assert the order success title is visible"
            )
            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-checkout', '06 - Ordering success page');
        })
    });
})

test.describe("Logged-checkout", async () => {
    let initialCartBadge = 0
    let cartPageURL = `${Config.baseURL}cart`

    test.beforeEach(async ({ loggedInPage }) => {
        const newarrivalspage = new NewArrivalsPage(loggedInPage)
        const homepage = createHomePage(loggedInPage)
        const cartpage = createCartPage(loggedInPage)
        const minicartpage = createMinicartPage(loggedInPage)

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

        await step('Go to New Arrivals', async () => {
            await homepage.clickMenuItem('luggage')
            await newarrivalspage.logoImg.hover()

            await step('Click on In-stock checkbox', async () => {
                await homepage.clickCheckbox(loggedInPage, `${t.homepage('in-stock')}`)
            })
        })

        await step("Add a product to cart", async () => {
            await Promise.all([
                cartpage.addMultipleProductsToCart(1, "Add a in-stock product to cart"),
                //expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
            ]);
        })

        await step('Go to checkout page', async () => {
            await clickUntil(loggedInPage, homepage.cartIcon, minicartpage.minicartRender, 'visible', {
                delayMs: 500,
                maxTries: 3,
                timeoutMs: 3000
            })

            await minicartpage.click(minicartpage.checkoutButton,
                "Click on Checkout button"
            )
        })
    })

    test(`
        1. Checkout page is displayed - Your detail form shows correctly    
        2. Step 1 is done - Recipient infor form shows correctly
        3. Step 2 is done - Payment methods section shows correctly
        4. Payment method is selected - Payment details form shows correctly
        5. Step 3 is done - Place Order button shows
        6. Ordering success page is displayed
        `, async ({ loggedInPage }) => {
        const checkoutpage = new CheckoutPage(loggedInPage)
        const checkoutloginpage = new CheckoutLoginPage(loggedInPage)
        const cardNumberIframe = loggedInPage.locator('input#cardNumber');

        await step("Verify - 1. Checkout page is displayed - Your detail form shows correctly", async () => {
            expect(await checkoutpage.isCheckoutPageDisplayed(true)).toBe(true)
            await screenshotAndAttach(loggedInPage, './screenshots/Logged-checkout', '01 - Your detail section');
        })
        /*
        await step("Verify - 2. Step 1 is done - Recipient infor shows correctly", async () => {
            await checkoutpage.assertEqual(await checkoutpage.isCheckoutStepDone("Your Details"), true,
                "Assert current step 1 status is Done: true"
            )

            await checkoutloginpage.assertVisible(checkoutpage.shippingSection.first(), "Assert recipient infor section visbile")

            await screenshotAndAttach(loggedInPage, './screenshots/Logged-checkout', '02 - Recipient section');
        })

        await checkoutpage.click(checkoutpage.continueButton, "Click on Continue button")

        await step("Verify - 3. Step 2 is done - Payment methods section shows correctly", async () => {
            await checkoutpage.assertEqual(await checkoutpage.isCheckoutStepDone("Shipping"), true,
                "Assert current step 2 status is Done: true"
            )

            await checkoutloginpage.assertVisible(checkoutpage.visaIcon, "Assert payment method section visbile")

            await screenshotAndAttach(loggedInPage, './screenshots/Logged-checkout', '03 - Payment methods section');
        })

        await step("Select Visa payment method", async () => {
            await checkoutpage.click(checkoutpage.visaIcon, "Select Visa payment method")
        })

        await step("Verify - 4. Payment method is selected - Payment details form shows correctly", async () => {
            await checkoutpage.assertVisible(checkoutpage.paymentcontinueBtn,
                "Assert the Payment Continue button is displayed"
            )

            await checkoutloginpage.assertVisible(cardNumberIframe, "Assert payment detail form visbile")

            await delay(500)
            await screenshotAndAttach(loggedInPage, './screenshots/Logged-checkout', '04 - Payment detail form');
        })

        await step("Fill payment details with Visa card", async () => {
            const { visaCheckoutData } = loadTestData();
            await checkoutpage.fillVisaPaymentDetails(loggedInPage, visaCheckoutData.cardNumber,
                visaCheckoutData.expiryMonth, visaCheckoutData.expiryYear, visaCheckoutData.cvv,
                "Fill Visa card payment details");
        })

        await step("Click payment continue button", async () => {
            await checkoutpage.click(checkoutpage.paymentcontinueBtn, "Click on payment continue button")
        })

        await step("Verify - 5. Step 3 is done - Place Order button shows", async () => {
            await checkoutpage.assertEqual(await checkoutpage.isCheckoutStepDone("Payment"), true,
                "Assert current step 3 status is Done: true"
            )

            await checkoutloginpage.assertVisible(checkoutpage.placeOrderBtn, "Assert place order button visbile")

            await screenshotAndAttach(loggedInPage, './screenshots/Logged-checkout', '05 - Place Order');
        })
        */
        await step("Click Agree to Privacy Policy checkbox", async () => {
            await checkoutpage.clickCheckbox(loggedInPage, t.checkoutpage('terms'),
                `Need to click ${t.checkoutpage('terms')} checkbox`
            )
        })

        await step("Click place order button then input cvv to textbox", async () => {
            await checkoutpage.click(checkoutpage.placeOrderBtn, "Click on Place Order button")
            await checkoutpage.type(checkoutpage.cvvModalCVVTextbox, "123", "Enter CVV to CVV textbox")
            await checkoutpage.click(checkoutpage.cvvModalSubmitButton, "Click on Yes button")
            await loggedInPage.waitForURL(/orderconfirmation/)
        })

        await step("Verify - 6. Ordering success page is displayed", async () => {
            await checkoutpage.assertVisible(checkoutpage.orderSuccessTitle,
                "Assert the order success title is visible"
            )
            await screenshotAndAttach(loggedInPage, './screenshots/Logged-checkout', '06 - Ordering success page');
        })
    });
})

test.describe("Guest-methods-checkout", async () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)
        const homepage = createHomePage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)

        await step('Go to New Arrivals', async () => {
            await homepage.clickMenuItem('luggage')
            await newarrivalspage.logoImg.hover()

            await step('Click on In-stock checkbox', async () => {
                await homepage.clickCheckbox(basicAuthPage, `${t.homepage('in-stock')}`)
            })
        })

        await step("Add a product to cart", async () => {
            await Promise.all([
                cartpage.addMultipleProductsToCart(1, "Add a in-stock product to cart"),
                //expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
            ]);
        })

        await step('Go to checkout login page', async () => {
            await clickUntil(basicAuthPage, homepage.cartIcon, minicartpage.minicartRender, 'visible', {
                delayMs: 500,
                maxTries: 3,
                timeoutMs: 3000
            })

            await minicartpage.click(minicartpage.checkoutButton,
                "Click on Checkout button"
            )
        })
    })

    test(`
        1. Checkout page is displayed - Your detail form shows correctly    
        2. Step 1 is done - Recipient infor form shows correctly
        3. Step 2 is done - Payment methods section shows correctly
        4. Payment method is selected - Payment details form shows correctly
        5. Step 3 is done - Place Order button shows
        6. Ordering success page is displayed
        `, async ({ basicAuthPage }) => {
        const checkoutpage = new CheckoutPage(basicAuthPage)
        const checkoutloginpage = new CheckoutLoginPage(basicAuthPage)
        const { checkoutFullData } = loadTestData();
        const { checkoutShippingData } = loadTestData();
        const cardNumberIframe = basicAuthPage.locator('input#cardNumber');

        await step("Go to guest checkout page", async () => {
            await checkoutloginpage.click(checkoutloginpage.guestcheckoutButton,
                "Clicking on Guest checkout button"
            )
        })

        await step("Verify - 1. Checkout page is displayed - Your detail form shows correctly", async () => {
            expect(await checkoutpage.isCheckoutPageDisplayed()).toBe(true)
            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-methods-checkout', '01 - Your detail form');
        })

        await step("Fill your detail with full information", async () => {
            await checkoutpage.fillCheckoutYourDetailForm(basicAuthPage, checkoutFullData)
        })

        await checkoutpage.click(checkoutpage.continueButton, "Click on Step 1 Continue button")

        await step("Verify - 2. Step 1 is done - Recipient infor form shows correctly", async () => {
            await checkoutpage.assertEqual(await checkoutpage.isCheckoutStepDone("Your Details"), true,
                "Assert current step 1 status is Done: true"
            )

            await checkoutloginpage.assertVisible(checkoutpage.shippingSection.first(), "Assert recipient infor section visbile")

            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-methods-checkout', '02 - Recipient infor form');
        })

        await step("Fill recipient info", async () => {
            await checkoutpage.fillRecipientDetilsForm(basicAuthPage, checkoutShippingData)
        })

        await step("Click on continue button", async () => {
            await checkoutpage.click(checkoutpage.recipientContinueBtn, "Click on Step 2 Continue button")
            await PageUtils.waitForPageLoad(basicAuthPage)
        })

        await step("Verify - 3. Step 2 is done - Payment methods section shows correctly", async () => {
            await checkoutpage.assertEqual(await checkoutpage.isCheckoutStepDone("Shipping"), true,
                "Assert current step 2 status is Done: true"
            )

            await checkoutloginpage.assertVisible(checkoutpage.visaIcon, "Assert payment method section visbile")

            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-methods-checkout', '03 - Payment methods section');
        })

        await step("Select GPay payment method", async () => {
            await checkoutpage.click(checkoutpage.googlepayIcon, "Select GPay payment method")
        })

        await step("Verify - 4. GPay payment method is selected - GPay button shows", async () => {
            await checkoutpage.assertAttributeValue(checkoutpage.googlepayIcon, "aria-selected", "true",
                "Assert GPay method is selected"
            )

            await checkoutloginpage.assertVisible(checkoutpage.gpaybutton, "Assert GPay button is displayed")

            await checkoutloginpage.assertEnabled(checkoutpage.gpaybutton, "Assert GPay button is enabled")

            await delay(1000)
            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-methods-checkout', '04 - GPay button');
        })

        await step("Select atome payment method", async () => {
            await delay(1000)
            await checkoutpage.click(checkoutpage.atomeIcon, "Select atome payment method")
        })

        await step("Verify - 5. Atome payment method is selected - Continue button shows", async () => {
            await checkoutpage.assertAttributeValue(checkoutpage.atomeIcon, "aria-selected", "true",
                "Assert Atome method is selected"
            )

            await checkoutloginpage.assertVisible(checkoutpage.paymentcontinueBtn, "Assert Payment continue button is displayed")

            await checkoutloginpage.assertEnabled(checkoutpage.paymentcontinueBtn, "Assert Payment continue button is enabled")

            await delay(1000)
            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-methods-checkout', '05 - Payment continue button');
        })

        await step("Click payment continue button", async () => {
            await delay(1000)
            await checkoutpage.click(checkoutpage.paymentcontinueBtn, "Click on payment continue button")
        })

        await step("Verify - 6. Step 3 is done - Place Order button shows", async () => {
            await checkoutpage.assertEqual(await checkoutpage.isCheckoutStepDone("Payment"), true,
                "Assert current step 3 status is Done: true"
            )

            await checkoutloginpage.assertVisible(checkoutpage.placeOrderBtn, "Assert place order button visbile")

            await checkoutloginpage.assertEnabled(checkoutpage.placeOrderBtn, "Assert place order button is enabled")

            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-methods-checkout', '06 - Place Order Button');
        })

        await step("Click Payment Edit Button", async () => {
            await delay(500)

            await checkoutpage.click(checkoutpage.paymentEditBtn,
                "Clicking on Payment Edit button"
            )
        })

        await step("Select Paypal payment method", async () => {
            await checkoutpage.click(checkoutpage.paypalIcon, "Select Paypal payment method")
        })

        await step("Verify - 7. Paypal payment method is selected - Continue button shows", async () => {
            await checkoutpage.assertAttributeValue(checkoutpage.paypalIcon, "aria-selected", "true",
                "Assert Paypal method is selected"
            )

            await checkoutloginpage.assertVisible(checkoutpage.paymentcontinueBtn, "Assert Payment continue button is displayed")

            await checkoutloginpage.assertEnabled(checkoutpage.paymentcontinueBtn, "Assert Payment continue button is enabled")

            await delay(1000)
            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-methods-checkout', '07 - Payment continue button');
        })

        await step("Click payment continue button", async () => {
            await checkoutpage.click(checkoutpage.paymentcontinueBtn, "Click on payment continue button")
        })

        await step("Verify - 8. Step 3 is done - Paypal checkout button shows", async () => {
            await checkoutpage.assertEqual(await checkoutpage.isCheckoutStepDone("Payment"), true,
                "Assert current step 3 status is Done: true"
            )

            await checkoutloginpage.assertVisible(checkoutpage.paypalCheckoutBtn, "Assert Paypal Checkout button visbile")

            await checkoutloginpage.assertEnabled(checkoutpage.paypalCheckoutBtn, "Assert Paypal Checkout is enabled")

            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-methods-checkout', '08 - Paypal Checkout Button');
        })

        await step("Click Payment Edit Button", async () => {
            await delay(500)

            await checkoutpage.click(checkoutpage.paymentEditBtn,
                "Clicking on Payment Edit button"
            )
        })

        await step("Select Master Card payment method", async () => {
            await checkoutpage.click(checkoutpage.masterIcon, "Select Master Card payment method")
        })

        await step("Verify - 9. Master Card Payment method is selected - Payment details form shows correctly", async () => {
            await checkoutpage.assertVisible(checkoutpage.paymentcontinueBtn,
                "Assert the Payment Continue button is displayed"
            )

            await checkoutpage.assertAttributeValue(checkoutpage.masterIcon, "aria-selected", "true",
                "Assert Master Card method is selected"
            )

            await checkoutloginpage.assertVisible(cardNumberIframe, "Assert payment detail form visbile")

            await delay(1000)
            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-methods-checkout', '09 - Payment detail form');
        })

        await step("Select Visa payment method", async () => {
            await checkoutpage.click(checkoutpage.visaIcon, "Select Visa payment method")
        })

        await step("Verify - 10. Visa Payment method is selected - Payment details form shows correctly", async () => {
            await checkoutpage.assertVisible(checkoutpage.paymentcontinueBtn,
                "Assert the Payment Continue button is displayed"
            )

            await checkoutloginpage.assertVisible(cardNumberIframe, "Assert payment detail form visbile")

            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-methods-checkout', '10 - Payment detail form');
        })

        await step("Fill payment details with Visa card", async () => {
            const { visaCheckoutData } = loadTestData();
            await checkoutpage.fillVisaPaymentDetails(basicAuthPage, visaCheckoutData.cardNumber,
                visaCheckoutData.expiryMonth, visaCheckoutData.expiryYear, visaCheckoutData.cvv,
                "Fill Visa card payment details");
        })

        await step("Click payment continue button", async () => {
            await checkoutpage.click(checkoutpage.paymentcontinueBtn, "Click on payment continue button")
        })

        await step("Verify - 11. Step 3 is done - Place Order button shows", async () => {
            await checkoutpage.assertEqual(await checkoutpage.isCheckoutStepDone("Payment"), true,
                "Assert current step 3 status is Done: true"
            )

            await checkoutloginpage.assertVisible(checkoutpage.placeOrderBtn, "Assert place order button visbile")

            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-methods-checkout', '11 - Place Order Button');
        })

        await step("Click place order button", async () => {
            await checkoutpage.click(checkoutpage.placeOrderBtn, "Click on Place Order button")
            await basicAuthPage.waitForURL(/orderconfirmation/)
        })

        await step("Verify - 12. Ordering success page is displayed", async () => {
            await checkoutpage.assertVisible(checkoutpage.orderSuccessTitle,
                "Assert the order success title is visible"
            )
            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-methods-checkout', '12 - Ordering success page');
        })
    });
})