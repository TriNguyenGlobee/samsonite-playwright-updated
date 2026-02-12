import { test, expect } from "../../../src/fixtures/test-fixture"
import { t, clickUntil, PageUtils, delay, screenshotAndAttach, openNewTab, clickBlankAreaToClosePopup, generateReadableTimeBasedId, scrollToBottom } from "../../../utils/helpers/helpers";
import { NewArrivalsPage } from "../../../src/pages/delivery/productlistingpage/newarrivals/newarrivals.page";
import { createHomePage } from "../../../src/factories/home.factory";
import { createMinicartPage } from "../../../src/factories/minicart.factory";
import { createCartPage } from "../../../src/factories/cart.factory";
import { CheckoutLoginPage } from "../../../src/pages/implementing/checkout/checkoutlogin.page";
import { step } from "allure-js-commons";
import { CheckoutPage } from "../../../src/pages/implementing/checkout/checkout.page";
import { loadTestData } from "../../../utils/data";
import { Config } from "../../../config/env.config";
import { tests } from "../../../utils/helpers/localeTest";
import { MyPage } from "../../../src/pages/implementing/mypage/mypage.page";
import { GlobalNavFooterPage } from "../../../src/pages/delivery/home/global-nav-footer.page";

const isProd = () => process.env.ENV === 'prod';

test.describe("Guest-creditcard-checkout", async () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)
        const homepage = createHomePage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)

        await step('Go to Luggage', async () => {
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

    tests(["au"], `
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
        const cardinalFrame = basicAuthPage.frameLocator('#Cardinal-CCA-IFrame');
        const codeTextbox = cardinalFrame.locator('//input[normalize-space(@placeholder)="Enter Code Here"]')
        const submitbutton = cardinalFrame.locator('//input[@value="SUBMIT"]')

        await step("Go to guest checkout page", async () => {
            await checkoutloginpage.click(checkoutloginpage.guestcheckoutButton,
                "Clicking on Guest checkout button"
            )
        })

        await step("Verify - 1. Checkout page is displayed - Your detail form shows correctly", async () => {
            expect(await checkoutpage.isCheckoutPageDisplayed()).toBe(true)
            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-creditcard-checkout', '01 - Your detail form');
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

            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-creditcard-checkout', '02 - Recipient infor form');
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

            await checkoutloginpage.assertVisible(checkoutpage.creditIcon, "Assert payment method section visbile")

            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-creditcard-checkout', '03 - Payment methods section');
        })

        await step("Select Visa payment method", async () => {
            await checkoutpage.click(checkoutpage.creditIcon, "Select Creditcard payment method")
            await delay(500)
        })

        await step("Verify - 4. Payment method is selected - Payment details form shows correctly", async () => {
            await checkoutpage.assertVisible(checkoutpage.paymentcontinueBtn,
                "Assert the Payment Continue button is displayed"
            )

            await delay(500)
            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-creditcard-checkout', '04 - Payment detail form');
        })

        await step("Fill payment details with Creditcard card", async () => {
            const { visaCheckoutData } = loadTestData();
            await checkoutpage.fillCreditCardPaymentDetails(basicAuthPage, visaCheckoutData.cardNumber,
                visaCheckoutData.expiryDate, visaCheckoutData.cvv, visaCheckoutData.nameOnCard,
                "Fill Creditcard card payment details");
        })

        await step("Click payment continue button", async () => {
            await checkoutpage.click(checkoutpage.paymentcontinueBtn, "Click on payment continue button")

            await checkoutpage.type(codeTextbox, "1234")
            await checkoutpage.click(submitbutton, "Click submit OPT button", 100, 10)
        })

        await step("Verify - 5. Step 3 is done - Place Order button shows", async () => {
            await checkoutpage.assertEqual(await checkoutpage.isCheckoutStepDone("Payment"), true,
                "Assert current step 3 status is Done: true"
            )

            await checkoutloginpage.assertVisible(checkoutpage.placeOrderBtn, "Assert place order button visbile")

            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-creditcard-checkout', '05 - Place Order');
        })

        if (await !isProd()) {
            await step("Click place order button", async () => {
                await checkoutpage.click(checkoutpage.placeOrderBtn, "Click on Place Order button")
                await basicAuthPage.waitForURL(/orderconfirmation/)
            })

            await step("Verify - 6. Ordering success page is displayed", async () => {
                await checkoutpage.assertVisible(checkoutpage.orderSuccessTitle,
                    "Assert the order success title is visible"
                )
                await screenshotAndAttach(basicAuthPage, './screenshots/Guest-creditcard-checkout', '06 - Ordering success page');
            })
        }
    });
})

test.describe("Guest-visa-checkout", async () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)
        const homepage = createHomePage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)

        await step('Go to Luggage', async () => {
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

    tests(["sg"], `
        1. Verify Checkout page is displayed when clicking on Guest checkout button    
        2. User can fill your detail information and go to next step
        3. User can fill recipient information and go to next step
        4. User can select visa payment method
        5. User can fill payment detail information and go to next step
        6. Click Place Order button to complete order
        7. The used email is subscribed
        `, async ({ basicAuthPage }) => {
        const checkoutpage = new CheckoutPage(basicAuthPage)
        const checkoutloginpage = new CheckoutLoginPage(basicAuthPage)
        const mypage = new MyPage(basicAuthPage)
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)
        const { checkoutFullData } = loadTestData();
        const { checkoutShippingData } = loadTestData();
        const accountexistMsg = t.globalnavfooter('duplicateemail')
        const emailexistmsg = basicAuthPage.locator(`//footer[@id="footer"]//div[contains(@class,"subscribe-msg accountexists")]`)
        const cardNumberIframe = basicAuthPage.locator('input#cardNumber');
        const email_suffix = generateReadableTimeBasedId()
        const valid_email = "gloobeauto_" + email_suffix + "@yopmail.com"

        await step("[STEP] Click on Guest checkout button", async () => {
            await checkoutloginpage.click(checkoutloginpage.guestcheckoutButton,
                "Clicking on Guest checkout button"
            )
        })

        await step("[STEP] Verify - 1. Checkout page is displayed - Your detail form shows correctly", async () => {
            expect(await checkoutpage.isCheckoutPageDisplayed()).toBe(true)
            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-visa-checkout', '01 - Your detail form');
        })

        await step("[STEP] Fill your detail with full information", async () => {
            await checkoutpage.fillCheckoutYourDetailForm(basicAuthPage,
                {
                    email: valid_email,
                    firstName: checkoutFullData.firstName,
                    lastName: checkoutFullData.lastName,
                    newsletter: checkoutFullData.newsletter,
                    phone: checkoutFullData.phone,
                    terms: checkoutFullData.terms
                }
            )
        })

        await step("[STEP] Verify - 2. Click on Continue button to done Step 1 and go to step 2", async () => {
            await step("[ChSTEP] Click on Step 1 Continue button", async () => {
                await checkoutpage.click(checkoutpage.continueButton, "Click on Step 1 Continue button")
            }) 

            await step("[ChSTEP] Assert current step 1 status is Done: true", async () => {
                await checkoutpage.assertEqual(await checkoutpage.isCheckoutStepDone("Your Details"), true,"Assert current step 1 status is Done: true")
            })

            await step("[ChSTEP] Assert recipient infor section visbile", async () => {
                await checkoutloginpage.assertVisible(checkoutpage.shippingSection.first(), "Assert recipient infor section visbile")
                await screenshotAndAttach(basicAuthPage, './screenshots/Guest-visa-checkout', '02 - Recipient infor form');
            })
        })

        await step("[STEP] Fill recipient info", async () => {
            await checkoutpage.fillRecipientDetilsForm(basicAuthPage, checkoutShippingData)
        })

        await step("[STEP] Verify - 3. Click on Continue button to done Step 2 and go to step 3", async () => {
            await step("[ChSTEP] Click on continue button", async () => {
                await checkoutpage.click(checkoutpage.recipientContinueBtn, "Click on Step 2 Continue button")
                await PageUtils.waitForPageLoad(basicAuthPage)
            })

            await step ("[ChSTEP] Assert current step 2 status is Done: true", async () => {
                await checkoutpage.assertEqual(await checkoutpage.isCheckoutStepDone("Shipping"), true,"Assert current step 2 status is Done: true")
            })

            await step ("[ChSTEP] Assert payment method section visbile", async () => {
                await checkoutloginpage.assertVisible(checkoutpage.visaIcon, "Assert payment method section visbile")
                await screenshotAndAttach(basicAuthPage, './screenshots/Guest-visa-checkout', '03 - Payment methods section');   
            })
        })

        await step("[STEP] Select Visa payment method", async () => {
            await checkoutpage.click(checkoutpage.visaIcon, "Select Visa payment method")
        })

        await step("[STEP] Verify - 4. Payment method is selected - Payment details form shows correctly", async () => {
            await step ("[ChSTEP] Assert the Payment Continue button is displayed", async () => {
                await checkoutpage.assertVisible(checkoutpage.paymentcontinueBtn,"Assert the Payment Continue button is displayed")
            })

            await step ("[ChSTEP] Assert payment detail form visbile", async () => {
               await checkoutloginpage.assertVisible(cardNumberIframe, "Assert payment detail form visbile") 
            })
            
            await delay(500)
            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-visa-checkout', '04 - Payment detail form');
        })

        await step("[STEP] Fill payment details with Visa card", async () => {
            const { visaCheckoutData } = loadTestData();
            await checkoutpage.fillVisaPaymentDetails(basicAuthPage, visaCheckoutData.cardNumber,
                visaCheckoutData.expiryMonth, visaCheckoutData.expiryYear, visaCheckoutData.cvv,
                "Fill Visa card payment details");
        })

        await step("[STEP] Verify - 5. Click Payment Continue button", async () => {
            await step("[ChSTEP] Click payment continue button", async () => {
                await checkoutpage.click(checkoutpage.paymentcontinueBtn, "Click on payment continue button")
            })

             await step ("[ChSTEP] Assert current step 3 status is Done: true", async () => {
                await checkoutpage.assertEqual(await checkoutpage.isCheckoutStepDone("Payment"), true,"Assert current step 3 status is Done: true")
            })

             await step ("[ChSTEP] Assert place order button visbile", async () => {
                await checkoutloginpage.assertVisible(checkoutpage.placeOrderBtn, "Assert place order button visbile")
                await screenshotAndAttach(basicAuthPage, './screenshots/Guest-visa-checkout', '05 - Place Order');
            })
        })

        if (await !isProd()) {
            await step("[STEP] Verify - 6. Ordering success when clicking place order button (Staging only)", async () => {
                await step("[ChSTEP] Click place order button", async () => {
                    await checkoutpage.click(checkoutpage.placeOrderBtn, "Click on Place Order button")
                    await basicAuthPage.waitForURL(/orderconfirmation/)
                })
                
                await step("[ChSTEP] Assert the order success title is visible", async () => {
                    await checkoutpage.assertVisible(checkoutpage.orderSuccessTitle,"Assert the order success title is visible")
                    await screenshotAndAttach(basicAuthPage, './screenshots/Guest-visa-checkout', '06 - Ordering success page');
                })
            })
        }

        await step ("[STEP] Go to Homepage and enter the used email into Subscribe textbox", async () => {
            await step('[ChSTEP] - Go to Home Page', async () => {
                await mypage.goto(`${Config.baseURL}`)
                await scrollToBottom(basicAuthPage)
            })

            await step("[ChSTEP] Enter the Registered-email into the email textbox", async () => {
                await globalnavfooterpage.type(globalnavfooterpage.emailTextbox, valid_email)
            })
        }),

        await step("Veriy - 7. Click subscribe button and check duplicate subscription message shown", async () => {
            await step("[ChSTEP] Clicking on Subscribe button", async () => {
                await globalnavfooterpage.click(globalnavfooterpage.subscribeButton,"Clicking on Subscribe button")
            })
           
            await globalnavfooterpage.assertHidden(globalnavfooterpage.underlay,
                "Waiting for underlay screen hidden"
            )

            await step("[ChSTEP] Assert invalid-feedback: Account exists", async () => {
                await globalnavfooterpage.assertText(emailexistmsg, accountexistMsg,"Assert invalid-feedback: Account exists")
                await screenshotAndAttach(basicAuthPage, './screenshots/Guest-visa-checkout', '07 - Duplicate subscription message');
            })
            
        })
    });

    test.afterEach(async ({ basicAuthPage }) => {
        await step('[STEP] [FINAL STATE]', async () => {
            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-visa-checkout', 'Final State');
        });
    });
})

test.describe("Guest-mastercard-checkout", async () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)
        const homepage = createHomePage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)

        await step('Go to Luggage', async () => {
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

    tests(["sg"], `
        1. Verify Checkout page is displayed when clicking on Guest checkout button    
        2. User can fill your detail information and go to next step
        3. User can fill recipient information and go to next step
        4. User can select master card payment method
        5. User can fill payment detail information and go to next step
        6. Click Place Order button to complete order
        `, async ({ basicAuthPage }) => {
        const checkoutpage = new CheckoutPage(basicAuthPage)
        const checkoutloginpage = new CheckoutLoginPage(basicAuthPage)
        const { checkoutFullData } = loadTestData();
        const { checkoutShippingData } = loadTestData();
        const cardNumberIframe = basicAuthPage.locator('input#cardNumber');

        await step("[STEP] Click on Guest Checkout button", async () => {
            await checkoutloginpage.click(checkoutloginpage.guestcheckoutButton,
                "Clicking on Guest checkout button"
            )
        })

        await step("[STEP] Verify - 1. Checkout page is displayed - Your detail form shows correctly", async () => {
            expect(await checkoutpage.isCheckoutPageDisplayed()).toBe(true)
            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-mastercard-checkout', '01 - Your detail form');
        })

        await step("[STEP] Fill your detail with full information", async () => {
            await checkoutpage.fillCheckoutYourDetailForm(basicAuthPage, checkoutFullData)
        })

        await step("[STEP] Verify - 2. Click on Continue button to done Step 1 and go to step 2", async () => {
            await step("[ChSTEP] Click on Step 1 Continue button", async () => {
                await checkoutpage.click(checkoutpage.continueButton, "Click on Step 1 Continue button")
            })

            await step("[ChSTEP] Assert current step 1 status is Done: true", async () => {
                await checkoutpage.assertEqual(await checkoutpage.isCheckoutStepDone("Your Details"), true,"Assert current step 1 status is Done: true")
            }) 
            
            await step("[ChSTEP] Assert recipient infor section visbile", async () => {
                await checkoutloginpage.assertVisible(checkoutpage.shippingSection.first(), "Assert recipient infor section visbile")
                await screenshotAndAttach(basicAuthPage, './screenshots/Guest-mastercard-checkout', '02 - Recipient infor form');
            }) 
            
        })

        await step("[STEP] Fill recipient info", async () => {
            await checkoutpage.fillRecipientDetilsForm(basicAuthPage, checkoutShippingData)
        })

        await step("[STEP] Verify - 3.  Click on Continue button to done Step 2 and go to step 3", async () => {
            await step("[ChSTEP] Click on continue button", async () => {
                await checkoutpage.click(checkoutpage.recipientContinueBtn, "Click on Step 2 Continue button")
                await PageUtils.waitForPageLoad(basicAuthPage)
            })

            await step("[ChSTEP] Assert current step 2 status is Done: true", async () => {
               await checkoutpage.assertEqual(await checkoutpage.isCheckoutStepDone("Shipping"), true,"Assert current step 2 status is Done: true")
            }) 
            
            await step("[ChSTEP] Assert recipient infor section visbile", async () => {
                await checkoutloginpage.assertVisible(checkoutpage.visaIcon, "Assert payment method section visbile")
                await screenshotAndAttach(basicAuthPage, './screenshots/Guest-mastercard-checkout', '03 - Payment methods section');
            }) 
        })

        await step("[STEP] Select Mastercard payment method", async () => {
            await checkoutpage.click(checkoutpage.masterIcon, "Select Mastercard payment method")
        })

        await step("[STEP] Verify - 4. Verify Master card paymet method is selected and payment detail form shows correctly", async () => {
            await step("[ChSTEP] Assert the Payment Continue button is displayed", async () => {
                await checkoutpage.assertVisible(checkoutpage.paymentcontinueBtn,"Assert the Payment Continue button is displayed")
            }) 
            
            await step("[ChSTEP] Assert payment detail form visbile", async () => {
                await checkoutloginpage.assertVisible(cardNumberIframe, "Assert payment detail form visbile")
            }) 

            await delay(500)
            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-mastercard-checkout', '04 - Payment detail form');
        })

        await step("[STEP] Fill payment details with Mastercard", async () => {
            const { masterCardCheckoutData } = loadTestData();
            await checkoutpage.fillVisaPaymentDetails(basicAuthPage, masterCardCheckoutData.cardNumber,
                masterCardCheckoutData.expiryMonth, masterCardCheckoutData.expiryYear, masterCardCheckoutData.cvv,
                "Fill Mastercard payment details");
        })

        await step("[STEP] Verify - 5. Click Payment Continue button", async () => {
            await step("[ChSTEP] Click payment continue button", async () => {
                await checkoutpage.click(checkoutpage.paymentcontinueBtn, "Click on payment continue button")
            })

            await step("[ChSTEP] Assert current step 3 status is Done: true", async () => {
                await checkoutpage.assertEqual(await checkoutpage.isCheckoutStepDone("Payment"), true,"Assert current step 3 status is Done: true")
            })

            await step("[ChSTEP] Assert place order button visbile", async () => {
                await checkoutloginpage.assertVisible(checkoutpage.placeOrderBtn, "Assert place order button visbile")
                await screenshotAndAttach(basicAuthPage, './screenshots/Guest-mastercard-checkout', '05 - Place Order');
            })
            
        })

        if (await !isProd()) {
            await step("[STEP] Verify - 6. Ordering success page is displayed", async () => {
                await step("[ChSTEP] Click place order button", async () => {
                    await checkoutpage.click(checkoutpage.placeOrderBtn, "Click on Place Order button")
                    await basicAuthPage.waitForURL(/orderconfirmation/)
                 })

                await step("[ChSTEP] Assert the order success title is visible", async () => {
                    await checkoutpage.assertVisible(checkoutpage.orderSuccessTitle,"Assert the order success title is visible")
                    await screenshotAndAttach(basicAuthPage, './screenshots/Guest-mastercard-checkout', '06 - Ordering success page');
                })
            })
        }
    });

    test.afterEach(async ({ basicAuthPage }) => {
        await step('[STEP] [FINAL STATE]', async () => {
            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-mastercard-checkout', 'Final State');
        });
    });
})

test.describe("Guest-paypal-checkout", async () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)
        const homepage = createHomePage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)

        await step('Go to Luggage', async () => {
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
        5. Step 3 is done - Paypal checkout button shows
        6. Type paypal infor and review order
        7. Ordering success page is displayed
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
            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-paypal-checkout', '01 - Your detail form');
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

            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-paypal-checkout', '02 - Recipient infor form');
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

            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-paypal-checkout', '03 - Payment methods section');
        })

        await step("Select Paypal payment method", async () => {
            await checkoutpage.click(checkoutpage.paypalIcon, "Select Paypal payment method")
        })

        await step("Verify - 4. Payment method is selected - Continue button shows", async () => {
            await checkoutpage.assertVisible(checkoutpage.paymentcontinueBtn,
                "Assert the Payment Continue button is displayed"
            )

            await delay(500)
            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-paypal-checkout', '04 - Continue button');
        })

        await step("Click payment continue button", async () => {
            await checkoutpage.click(checkoutpage.paymentcontinueBtn, "Click on payment continue button")
        })

        await step("Verify - 5. Step 3 is done - Paypal checkout button shows", async () => {
            await checkoutpage.assertEqual(await checkoutpage.isCheckoutStepDone("Payment"), true,
                "Assert current step 3 status is Done: true"
            )

            await checkoutloginpage.assertVisible(checkoutpage.paypalCheckoutBtn, "Assert Paypal Checkout button visbile")

            await checkoutloginpage.assertEnabled(checkoutpage.paypalCheckoutBtn, "Assert Paypal Checkout is enabled")

            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-paypal-checkout', '05 - Paypal Checkout Button');
        })

        if (await !isProd()) {
            await step("Verify - 6. Type paypal infor and review order", async () => {
                const paypalPage = await openNewTab(basicAuthPage, () =>
                    checkoutpage.click(checkoutpage.paypalCheckoutBtn, "Click on Paypal checkout button")
                )

                const { paypalCheckoutData } = loadTestData();
                const emailInput = paypalPage.locator('input#email')
                const nextButton = paypalPage.locator('button#btnNext')
                const passwordInput = paypalPage.locator('input#password')
                const loginButton = paypalPage.locator('button#btnLogin')
                const continueButton = paypalPage.locator('//button[@data-id="payment-submit-btn"]')

                await emailInput.fill(paypalCheckoutData.email)
                await screenshotAndAttach(basicAuthPage, './screenshots/Guest-paypal-checkout', '06 - 1 - Paypal Checkout email field');
                await nextButton.click()
                await delay(2000)
                await passwordInput.fill(paypalCheckoutData.pass)
                await screenshotAndAttach(basicAuthPage, './screenshots/Guest-paypal-checkout', '06 - 2 - Paypal Checkout password field');
                await loginButton.click()
                await delay(5000)
                await screenshotAndAttach(basicAuthPage, './screenshots/Guest-paypal-checkout', '06 - 3 - Paypal continue button');

                await continueButton.click()
                await paypalPage.close()
            })

            await step("Verify - 7. Ordering success page is displayed", async () => {
                await checkoutpage.assertVisible(checkoutpage.orderSuccessTitle,
                    "Assert the order success title is visible"
                )
                await screenshotAndAttach(basicAuthPage, './screenshots/Guest-paypal-checkout', '07 - Ordering success page');
            })
        }
    });
})

test.describe("Guest-atome-checkout", async () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)
        const homepage = createHomePage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)

        await step('Go to Luggage', async () => {
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
        5. Step 3 is done - Paypal checkout button shows
        6. Click place order button - Atome payment flow is displayed
        7. Ordering success page is displayed
        `, async ({ basicAuthPage }) => {
        const checkoutpage = new CheckoutPage(basicAuthPage)
        const checkoutloginpage = new CheckoutLoginPage(basicAuthPage)
        const { checkoutFullData } = loadTestData();
        const { checkoutShippingData } = loadTestData();
        const gotItButton = basicAuthPage.locator('//div[@class="apply-voucher"]');
        const useVoucherPopup = basicAuthPage.locator('//div[@class="container-main"]');
        const atomeConfirmButton = basicAuthPage.locator('//div[@class="confirm-order-btn "]');
        const useNowButton = basicAuthPage.locator('//div[@class="apply-voucher"]')

        await step("Go to guest checkout page", async () => {
            await checkoutloginpage.click(checkoutloginpage.guestcheckoutButton,
                "Clicking on Guest checkout button"
            )
        })

        await step("Verify - 1. Checkout page is displayed - Your detail form shows correctly", async () => {
            expect(await checkoutpage.isCheckoutPageDisplayed()).toBe(true)
            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-atome-checkout', '01 - Your detail form');
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

            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-atome-checkout', '02 - Recipient infor form');
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

            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-atome-checkout', '03 - Payment methods section');
        })

        await step("Select Atome payment method", async () => {
            await checkoutpage.click(checkoutpage.atomeIcon, "Select Atome payment method")
        })

        await step("Verify - 4. Payment method is selected - Continue button shows", async () => {
            await checkoutpage.assertVisible(checkoutpage.paymentcontinueBtn,
                "Assert the Payment Continue button is displayed"
            )

            await delay(500)
            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-atome-checkout', '04 - Continue button');
        })

        await step("Click payment continue button", async () => {
            await checkoutpage.click(checkoutpage.paymentcontinueBtn, "Click on payment continue button")
        })

        await step("Verify - 5. Step 3 is done - Place Order button shows", async () => {
            await checkoutpage.assertEqual(await checkoutpage.isCheckoutStepDone("Payment"), true,
                "Assert current step 3 status is Done: true"
            )

            await checkoutloginpage.assertVisible(checkoutpage.placeOrderBtn, "Assert place order button visbile")

            await screenshotAndAttach(basicAuthPage, './screenshots/Guest-atome-checkout', '05 - Place Order');
        })

        if (await !isProd()) {
            await step("Verify - 6. Click place order button - Atome payment flow is displayed", async () => {
                await checkoutpage.click(checkoutpage.placeOrderBtn, "Click on Place Order button")
                await screenshotAndAttach(basicAuthPage, './screenshots/Guest-atome-checkout', '06 - Atome payment flow');
            })

            await step("Type phone number", async () => {
                await checkoutpage.typeByManual(checkoutpage.atomePhoneTextbox, "99000161")
            })

            await step("Click Next button", async () => {
                await checkoutpage.click(checkoutpage.atomeNextButton, "Click on Atome Next button")
                await delay(5000)
            })

            await step("Click Continue With SMS button", async () => {
                await checkoutpage.click(checkoutpage.smsContinueButton, "Click on Atome Continue With SMS button")
                await delay(5000)
            })

            await step("Type OTP code", async () => {
                await checkoutpage.type(checkoutpage.otpInput.nth(0), "1")
                await checkoutpage.type(checkoutpage.otpInput.nth(1), "1")
                await checkoutpage.type(checkoutpage.otpInput.nth(2), "1")
                await checkoutpage.type(checkoutpage.otpInput.nth(3), "1")

                await checkoutpage.waitFor(gotItButton)
            })

            if (await gotItButton.isVisible()) {
                await step("Click Got it button", async () => {
                    await checkoutpage.click(gotItButton, "Click on Atome Got it button")
                    await delay(2000)
                })

                await clickBlankAreaToClosePopup(basicAuthPage)
            }

            /*
            await step("Click Confirm button", async () => {
                await checkoutpage.click(atomeConfirmButton, "Click on Atome Confirm button")
                await basicAuthPage.waitForURL(/orderconfirmation/)
            })

            await step("Click Continue With SMS button", async () => {
                await checkoutpage.click(checkoutpage.smsContinueButton, "Click on Atome Continue With SMS button")
                await delay(5000)
            })

            await step("Type OTP code", async () => {
                await checkoutpage.type(checkoutpage.otpInput.nth(0), "1")
                await checkoutpage.type(checkoutpage.otpInput.nth(1), "1")
                await checkoutpage.type(checkoutpage.otpInput.nth(2), "1")
                await checkoutpage.type(checkoutpage.otpInput.nth(3), "1")
            })

            await step("Verify - 7. Ordering success page is displayed", async () => {
                await checkoutpage.assertVisible(checkoutpage.orderSuccessTitle,
                    "Assert the order success title is visible"
                )
                await screenshotAndAttach(basicAuthPage, './screenshots/Guest-atome-checkout', '07 - Ordering success page');
            })*/
        }
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

        await step('Go to Luggage', async () => {
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

        await checkoutpage.click(checkoutpage.continueButton, "Click on Continue button") */

        const isShippingContinueBtnExist = await checkoutpage.shippingContinueBtn.isVisible()

        if (isShippingContinueBtnExist) {
            await step("Click on shipping continue button", async () => {
                await checkoutpage.click(checkoutpage.shippingContinueBtn, "Click on Step 2 Continue button")
                await PageUtils.waitForPageLoad(loggedInPage)
            })

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
        }

        await step("Click Agree to Privacy Policy checkbox", async () => {
            await checkoutpage.clickCheckbox(loggedInPage, t.checkoutpage('terms'),
                `Need to click ${t.checkoutpage('terms')} checkbox`
            )
        })

        if (await !isProd()) {
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
        }
    });
})