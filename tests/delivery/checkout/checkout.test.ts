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

test.describe("Guest checkout - Step 1", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)
        const homepage = createHomePage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const checkoutloginpage = new CheckoutLoginPage(basicAuthPage)

        await step('Go to New Arrivals', async () => {
            await homepage.clickMenuItem('newarrivals')
            await newarrivalspage.logoImg.hover()

            await step('Click on In-stock checkbox', async () => {
                await homepage.clickCheckbox(basicAuthPage, `${t.homepage('in-stock')}`)
            })
        })

        await step("Add a product to cart", async () => {
            await Promise.all([
                cartpage.addMultipleProductsToCart(1, "Add a in-stock product to cart"),
                expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
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

        await step("Go to guest checkout page", async () => {
            await checkoutloginpage.click(checkoutloginpage.guestcheckoutButton,
                "Clicking on Guest checkout button"
            )
        })
    });

    test(`
        1. Guest checkout screen is displayed
        2. Click Step 1 Continue button without firstname
        `, async ({ basicAuthPage }) => {
        const checkoutpage = new CheckoutPage(basicAuthPage)
        const { checkoutDataWithoutFirstName } = loadTestData();

        await step("Verify the checkout page is displayed", async () => {
            expect(await checkoutpage.isCheckoutPageDisplayed()).toBe(true)
        })
    })

    test("3. Click Step 1 Continue button without firstname", async ({ basicAuthPage }) => {
        const checkoutpage = new CheckoutPage(basicAuthPage)
        const { checkoutDataWithoutFirstName } = loadTestData();

        await step("Fill your detail without firstname", async () => {
            await checkoutpage.fillCheckoutYourDetailForm(basicAuthPage, checkoutDataWithoutFirstName)
        })

        await checkoutpage.click(checkoutpage.continueButton, "Click on Continue button")

        await checkoutpage.assertFeedbackMsg(basicAuthPage, t.checkoutpage('firstname'), t.checkoutpage('firstnameinvalidmsg'),
            "Assert invalid msg under Firstname field should be: Please complete this field."
        )
    })

    test("4. Click Step 1 Continue button without lastname", async ({ basicAuthPage }) => {
        const checkoutpage = new CheckoutPage(basicAuthPage)
        const { checkoutDataWithoutLastName } = loadTestData();

        await step("Fill your detail without lastname", async () => {
            await checkoutpage.fillCheckoutYourDetailForm(basicAuthPage, checkoutDataWithoutLastName)
        })

        await checkoutpage.click(checkoutpage.continueButton, "Click on Continue button")

        await checkoutpage.assertFeedbackMsg(basicAuthPage, t.checkoutpage('lastname'), t.checkoutpage('lastnameinvalidmsg'),
            "Assert invalid msg under Lastname field should be: Please complete this field."
        )
    })

    test("5. Click Step 1 Continue button without email", async ({ basicAuthPage }) => {
        const checkoutpage = new CheckoutPage(basicAuthPage)
        const { checkoutDataWithoutEmail } = loadTestData();

        await step("Fill your detail without email", async () => {
            await checkoutpage.fillCheckoutYourDetailForm(basicAuthPage, checkoutDataWithoutEmail)
        })

        await checkoutpage.click(checkoutpage.continueButton, "Click on Continue button")

        await checkoutpage.assertFeedbackMsg(basicAuthPage, t.checkoutpage('email'), t.checkoutpage('emailinvalidmsg'),
            "Assert invalid msg under Email field should be: Please complete this field."
        )
    })

    test("6. Click Step 1 Continue button without phonenumber", async ({ basicAuthPage }) => {
        const checkoutpage = new CheckoutPage(basicAuthPage)
        const { checkoutDataWithoutPhone } = loadTestData();

        await step("Fill your detail without phonenumber", async () => {
            await checkoutpage.fillCheckoutYourDetailForm(basicAuthPage, checkoutDataWithoutPhone)
        })

        await checkoutpage.click(checkoutpage.continueButton, "Click on Continue button")

        await checkoutpage.assertFeedbackMsg(basicAuthPage, t.checkoutpage('phone'), t.checkoutpage('phoneinvalidmsg'),
            "Assert invalid msg under phonenumber field should be: Please complete this field."
        )
    })

    test("7. Click Step 1 Continue button with full data", async ({ basicAuthPage }) => {
        const checkoutpage = new CheckoutPage(basicAuthPage)
        const { checkoutFullData } = loadTestData();

        await step("Verify the initial step 1 status", async () => {
            await checkoutpage.assertEqual(await checkoutpage.isCheckoutStepDone("Your Details"), false,
                "Assert initial step 1 status is Done: false"
            )
        })

        await step("Fill your detail with full data", async () => {
            await checkoutpage.fillCheckoutYourDetailForm(basicAuthPage, checkoutFullData)
        })

        await step("Click on continue button", async () => {
            await checkoutpage.click(checkoutpage.continueButton, "Click on Continue button")
            await PageUtils.waitForPageLoad(basicAuthPage)
        })

        await step("Verify the current step 1 status", async () => {
            await checkoutpage.assertEqual(await checkoutpage.isCheckoutStepDone("Your Details"), true,
                "Assert current step 1 status is Done: true"
            )
        })
    })
});

test.describe("Guest checkout - Step 2", async () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)
        const homepage = createHomePage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const checkoutloginpage = new CheckoutLoginPage(basicAuthPage)
        const checkoutpage = new CheckoutPage(basicAuthPage)
        const { checkoutFullData } = loadTestData();

        await step('Go to New Arrivals', async () => {
            await homepage.clickMenuItem('newarrivals')
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

        await step("Go to guest checkout page", async () => {
            await checkoutloginpage.click(checkoutloginpage.guestcheckoutButton,
                "Clicking on Guest checkout button"
            )
        })

        await step("Fill your detail with full information", async () => {
            await checkoutpage.fillCheckoutYourDetailForm(basicAuthPage, checkoutFullData)
        })

        await checkoutpage.click(checkoutpage.continueButton, "Click on Step 1 Continue button")
    });

    test(`
        1. Back to Step 1 by clicking Your Details Edit button
        2. Go Edit Recipient Details form by clicking Recipient Details Edit button
        3. Using my details as recipient details
        4. Go to step 3 by clicking continue button with full data
        `, async ({ basicAuthPage }) => {
        const checkoutpage = new CheckoutPage(basicAuthPage)
        const { checkoutShippingData } = loadTestData();

        await step("Click Your Details Edit button", async () => {
            await delay(500)

            await checkoutpage.click(checkoutpage.yourDetailsEditBtn,
                "Clicking on Your Details Edit button"
            )
        })

        await step("Verify step 1 fields visible", async () => {
            await checkoutpage.assertVisible(checkoutpage.firstNameTextbox,
                "Assert the firstname textbox is visible"
            )

            await checkoutpage.assertVisible(checkoutpage.lastNameTextbox,
                "Assert the lastname textbox is visible"
            )

            await checkoutpage.assertVisible(checkoutpage.emailTextbox,
                "Assert the email textbox is visible"
            )

            await checkoutpage.assertVisible(checkoutpage.phoneTextbox,
                "Assert the phone number textbox is visible"
            )
        })

        await checkoutpage.click(checkoutpage.continueButton, "Click Step 1 on Continue button")

        await checkoutpage.click(checkoutpage.recipientDetailsEditBtn,
            "Clicking on Recipient Details Edit button"
        )

        await step("Verify that Recipient section fields visible", async () => {
            await checkoutpage.assertVisible(checkoutpage.recipientFirstName,
                "Assert recipient firstname field is displayed"
            )

            await checkoutpage.assertVisible(checkoutpage.recipientLastName,
                "Assert recipient lastname field is displayed"
            )

            await checkoutpage.assertVisible(checkoutpage.recipientPhone,
                "Assert recipient phone field is displayed"
            )
        })

        await checkoutpage.clickCheckbox(basicAuthPage, "My details and recipient details are the same.",
            "Clicking on My details and recipient details are the same. checkbox"
        )

        await step("Verify that Recipient section fields hidden", async () => {
            await checkoutpage.assertHidden(checkoutpage.recipientFirstName,
                "Assert recipient firstname field is hidden"
            )

            await checkoutpage.assertHidden(checkoutpage.recipientLastName,
                "Assert recipient lastname field is hidden"
            )

            await checkoutpage.assertHidden(checkoutpage.recipientPhone,
                "Assert recipient phone field is hidden"
            )
        })

        await step("Fill recipient info", async () => {
            await checkoutpage.fillRecipientDetilsForm(basicAuthPage, checkoutShippingData)
        })

        await step("Click on continue button", async () => {
            await checkoutpage.click(checkoutpage.recipientContinueBtn, "Click on Step 2 Continue button")
            await PageUtils.waitForPageLoad(basicAuthPage)
        })

        await step("Verify the current step 2 status", async () => {
            await checkoutpage.assertEqual(await checkoutpage.isCheckoutStepDone("Shipping"), true,
                "Assert current step 2 status is Done: true"
            )
        })
    })
})

test.describe("Guest checkout - Step 3", async () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)
        const homepage = createHomePage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const checkoutloginpage = new CheckoutLoginPage(basicAuthPage)
        const checkoutpage = new CheckoutPage(basicAuthPage)
        const { checkoutFullData } = loadTestData();
        const { checkoutShippingData } = loadTestData();

        await step('Go to New Arrivals', async () => {
            await homepage.clickMenuItem('newarrivals')
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

        await step("Go to guest checkout page", async () => {
            await checkoutloginpage.click(checkoutloginpage.guestcheckoutButton,
                "Clicking on Guest checkout button"
            )
        })

        await step("Fill your detail with full information", async () => {
            await checkoutpage.fillCheckoutYourDetailForm(basicAuthPage, checkoutFullData)
        })

        await checkoutpage.click(checkoutpage.continueButton, "Click on Step 1 Continue button")

        await step("Fill recipient info", async () => {
            await checkoutpage.fillRecipientDetilsForm(basicAuthPage, checkoutShippingData)
        })

        await step("Click on continue button", async () => {
            await checkoutpage.click(checkoutpage.recipientContinueBtn, "Click on Step 2 Continue button")
            await PageUtils.waitForPageLoad(basicAuthPage)
        })
    });

    test(`
        1. Back to Step 1 by clicking Your Details Edit button
        2. Go Edit Recipient Details form by clicking Recipient Details Edit button
        3. No payment method selected as default
        4. Continue button is displayed after selecting a payment method
        5. Go to step 4 by clicking continue button
        `, async ({ basicAuthPage }) => {
        const checkoutpage = new CheckoutPage(basicAuthPage)

        await step("Click Your Details Edit button", async () => {
            await delay(500)

            await checkoutpage.click(checkoutpage.yourDetailsEditBtn,
                "Clicking on Your Details Edit button"
            )
        })

        await step("Verify step 1 fields visible", async () => {
            await checkoutpage.assertVisible(checkoutpage.firstNameTextbox,
                "Assert the firstname textbox is visible"
            )

            await checkoutpage.assertVisible(checkoutpage.lastNameTextbox,
                "Assert the lastname textbox is visible"
            )

            await checkoutpage.assertVisible(checkoutpage.emailTextbox,
                "Assert the email textbox is visible"
            )

            await checkoutpage.assertVisible(checkoutpage.phoneTextbox,
                "Assert the phone number textbox is visible"
            )
        })

        await checkoutpage.click(checkoutpage.continueButton, "Click on step 1 Continue button")

        await step("Click on step 2 continue button", async () => {
            await checkoutpage.click(checkoutpage.recipientContinueBtn, "Click on step 2 Continue button")
            await PageUtils.waitForPageLoad(basicAuthPage)
        })

        await checkoutpage.click(checkoutpage.recipientDetailsEditBtn,
            "Clicking on Recipient Details Edit button"
        )

        await step("Verify that Recipient section fields visible", async () => {
            await checkoutpage.assertVisible(checkoutpage.recipientFirstName,
                "Assert recipient firstname field is displayed"
            )

            await checkoutpage.assertVisible(checkoutpage.recipientLastName,
                "Assert recipient lastname field is displayed"
            )

            await checkoutpage.assertVisible(checkoutpage.recipientPhone,
                "Assert recipient phone field is displayed"
            )
        })

        await checkoutpage.clickCheckbox(basicAuthPage, "My details and recipient details are the same.",
            "Clicking on My details and recipient details are the same. checkbox"
        )

        await step("Verify that No payment method selected as default", async () => {
            //await checkoutpage.pause()

            await checkoutpage.assertAttributeValue(checkoutpage.visaIcon, "aria-selected", "false",
                "Assert that visa method isn't selected "
            )

            await checkoutpage.assertAttributeValue(checkoutpage.masterIcon, "aria-selected", "false",
                "Assert that mastercard method isn't selected "
            )

            await checkoutpage.assertAttributeValue(checkoutpage.paypalIcon, "aria-selected", ["false", null],
                "Assert that paypal method isn't selected "
            )

            await checkoutpage.assertAttributeValue(checkoutpage.atomeIcon, "aria-selected", ["false", null],
                "Assert that atome method isn't selected "
            )

            await checkoutpage.assertAttributeValue(checkoutpage.googlepayIcon, "aria-selected", ["false", null],
                "Assert that googlepay method isn't selected "
            )

            await checkoutpage.assertHidden(checkoutpage.recipientContinueBtn,
                "Assert the Recipient Continue button is hidden"
            )
        })
        
        await step("Select paypal payment method", async () => {
            await checkoutpage.click(checkoutpage.paypalIcon, "Select papal payment method")
        })

        await step("Verify payment continue button is displayed", async () => {
            await checkoutpage.assertVisible(checkoutpage.paymentcontinueBtn,
                "Assert the Payment Continue button is displayed"
            )
        })

        await step("Click payment continue button", async () => {
            await checkoutpage.click(checkoutpage.paymentcontinueBtn, "Click on payment continue button")
        })

        await step("Verify the current step 3 status", async () => {
            await checkoutpage.assertEqual(await checkoutpage.isCheckoutStepDone("Payment"), true,
                "Assert current step 3 status is Done: true"
            )
        })
    })
})

test.describe("Guest checkout - Ordering success", async () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)
        const homepage = createHomePage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const checkoutloginpage = new CheckoutLoginPage(basicAuthPage)
        const checkoutpage = new CheckoutPage(basicAuthPage)
        const { checkoutFullData } = loadTestData();
        const { checkoutShippingData } = loadTestData();

        await step('Go to New Arrivals', async () => {
            await homepage.clickMenuItem('newarrivals')
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

        await step("Go to guest checkout page", async () => {
            await checkoutloginpage.click(checkoutloginpage.guestcheckoutButton,
                "Clicking on Guest checkout button"
            )
        })

        await step("Fill your detail with full information", async () => {
            await checkoutpage.fillCheckoutYourDetailForm(basicAuthPage, checkoutFullData)
        })

        await checkoutpage.click(checkoutpage.continueButton, "Click on Step 1 Continue button")

        await step("Fill recipient info", async () => {
            await checkoutpage.fillRecipientDetilsForm(basicAuthPage, checkoutShippingData)
        })

        await step("Click on continue button", async () => {
            await checkoutpage.click(checkoutpage.recipientContinueBtn, "Click on Step 2 Continue button")
            await PageUtils.waitForPageLoad(basicAuthPage)
        })
    });

    test(`
        1. Fill payment details with Visa card
        2. Go to ordering success page by clicking continue button
        `, async ({ basicAuthPage }) => {
        const checkoutpage = new CheckoutPage(basicAuthPage)

        await step("Select Visa payment method", async () => {
            await checkoutpage.click(checkoutpage.visaIcon, "Select Visa payment method")
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

        await step("Click place order button", async () => {
            await checkoutpage.click(checkoutpage.placeOrderBtn, "Click on Place Order button")
            await basicAuthPage.waitForURL(/orderconfirmation/)
        })

        await step("Verify ordering success page is displayed", async () => {
            await checkoutpage.assertVisible(checkoutpage.orderSuccessTitle,
                "Assert the order success title is visible"
            )
        })
    })
})