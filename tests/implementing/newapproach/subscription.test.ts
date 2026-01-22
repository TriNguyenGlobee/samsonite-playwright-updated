import { test, expect } from "../../../src/fixtures/test-fixture"
import { scrollToBottom, screenshotAndAttach, t, generateReadableTimeBasedId, clickUntil, PageUtils, delay, generateNumberString } from "../../../utils/helpers/helpers";
import { step } from "allure-js-commons";
import { GlobalNavFooterPage } from "../../../src/pages/delivery/home/global-nav-footer.page";
import { NewArrivalsPage } from "../../../src/pages/delivery/productlistingpage/newarrivals/newarrivals.page";
import { createHomePage } from "../../../src/factories/home.factory";
import { createMinicartPage } from "../../../src/factories/minicart.factory";
import { createCartPage } from "../../../src/factories/cart.factory";
import { CheckoutLoginPage } from "../../../src/pages/implementing/checkout/checkoutlogin.page";
import { CheckoutPage } from "../../../src/pages/implementing/checkout/checkout.page";
import { createLoginPage } from "../../../src/factories/login.factory";
import { RegisterPage } from "../../../src/pages/delivery/login/register.page";
import { MyPage } from "../../../src/pages/implementing/mypage/mypage.page";
import { loadTestData } from "../../../utils/data";
import { Config } from "../../../config/env.config";
import { steps } from "../../../utils/helpers/localeStep";

test.describe("Subscription-homepage", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)

        await scrollToBottom(basicAuthPage)
        await globalnavfooterpage.footerLogo.scrollIntoViewIfNeeded()
    });

    test("1. Submit button without email address - Invalid feedback shows", async ({ basicAuthPage }) => {
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)
        const invalid_Feedback = t.globalnavfooter('completethisfield')

        await step("Clicking on the subscribe button", async () => {
            await globalnavfooterpage.click(globalnavfooterpage.subscribeButton)
        })

        await step("Verify - 1. Submit button without email address - Invalid feedback shows", async () => {
            await globalnavfooterpage.assertText(globalnavfooterpage.invalidFeedback, invalid_Feedback,
                "Assert invalid-feedback: please complete this field"
            )

            await screenshotAndAttach(basicAuthPage, './screenshots/Subscription', '01 - Invalid feedback');
        })
    })

    test("2. Submit button with invalid-email address - Invalid feedback shows", async ({ basicAuthPage }) => {
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)
        const invalid_Email = "globeetest_invalidemail"
        const invalid_Feedback = t.globalnavfooter('invalidemail')

        await step("Enter the invalid-email into the email textbox", async () => {
            await globalnavfooterpage.type(globalnavfooterpage.emailTextbox, invalid_Email)
        })

        await step("Clicking on the subscribe button", async () => {
            await globalnavfooterpage.click(globalnavfooterpage.subscribeButton)
        })

        await step("Verify - 2. Submit button with invalid-email address - Invalid feedback shows", async () => {
            await globalnavfooterpage.assertText(globalnavfooterpage.invalidFeedback, invalid_Feedback,
                "Assert invalid-feedback: Please enter the valid email"
            )

            await screenshotAndAttach(basicAuthPage, './screenshots/Subscription', '02 - Invalid feedback');
        })
    })

    test(`
        3. Subscription success - Successful subscription message shown
        4. Duplicate subscription handling - Duplicate subscription message shown
        `, async ({ basicAuthPage }) => {
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)
        const email_suffix = generateReadableTimeBasedId()
        const valid_email = "gloobeauto_" + email_suffix + "@mailinator.com"
        const subscribeMsg = t.globalnavfooter('createsuccess')
        const accountexistMsg = t.globalnavfooter('duplicateemail')
        const createdmsg = basicAuthPage.locator(`//footer[@id="footer"]//div[contains(@class,"subscribe-msg accountcreated")]`)
        const successmsg = basicAuthPage.locator(`//div[@class="resp-messages"]//h2[@class="success"]`)
        const emailexistmsg = basicAuthPage.locator(`//footer[@id="footer"]//div[contains(@class,"subscribe-msg accountexists")]`)
        const returnbutton = basicAuthPage.locator(`//button[@class="btn-return"]`)

        await step("Enter the valid-email into the email textbox", async () => {
            await globalnavfooterpage.type(globalnavfooterpage.emailTextbox, valid_email)
        })

        await step("Clicking on the subscribe button", async () => {
            await globalnavfooterpage.click(globalnavfooterpage.subscribeButton,
                "Clicking on Subscribe button"
            )

            await steps(["au"], "Fill the lastest news", async () => {
                await globalnavfooterpage.fillLatestNewsForm({
                    email: valid_email
                })
            })

            await steps(["au"], "Click lastest news submit button", async () => {
                await globalnavfooterpage.click(globalnavfooterpage.latestNewsSubmitButton,
                    "Clicking on Latest News Submit button"
                )
            })

            await globalnavfooterpage.assertHidden(globalnavfooterpage.underlay,
                "Waiting for underlay screen hidden"
            )
        })

        await steps(["sg"], "Verify - 3. Subscription success - Successful subscription message shown", async () => {
            await globalnavfooterpage.assertText(createdmsg, subscribeMsg,
                "Assert invalid-feedback: Account created success"
            )

            await screenshotAndAttach(basicAuthPage, './screenshots/Subscription', '03 - Successful subscription message');
        })

        await steps(["au"], "Verify - 3. Subscription success - Successful subscription message shown", async () => {
            await globalnavfooterpage.assertVisible(successmsg,
                "Assert success message is visible"
            )

            await screenshotAndAttach(basicAuthPage, './screenshots/Subscription', '03 - Successful subscription message');
            await globalnavfooterpage.click(returnbutton, "Clicking on Return button")
        })

        await step("Clicking on the subscribe button again", async () => {
            await globalnavfooterpage.click(globalnavfooterpage.subscribeButton,
                "Clicking on Subscribe button"
            )
            await globalnavfooterpage.assertHidden(globalnavfooterpage.underlay,
                "Waiting for underlay screen hidden"
            )
        })

        await step("Verify - 4. Duplicate subscription handling - Duplicate subscription message shown", async () => {
            await globalnavfooterpage.assertText(emailexistmsg, accountexistMsg,
                "Assert invalid-feedback: Account exists"
            )
        })

        await screenshotAndAttach(basicAuthPage, './screenshots/Subscription', '04 - Duplicate subscription message');
    })
});

test.describe("Subscription-guest-checkout", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)
        const homepage = createHomePage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)

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
    })

    test(`
        1. Fill your detail with full information and check Add to newsletter box
        2. Ordering success page is displayed
        3. Duplicate subscription handling - Duplicate subscription message shown
        `, async ({ basicAuthPage }) => {
        const checkoutpage = new CheckoutPage(basicAuthPage)
        const checkoutloginpage = new CheckoutLoginPage(basicAuthPage)
        const { checkoutFullData } = loadTestData();
        const { checkoutShippingData } = loadTestData();
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)
        const accountexistMsg = t.globalnavfooter('duplicateemail')
        const emailexistmsg = basicAuthPage.locator(`//footer[@id="footer"]//div[contains(@class,"subscribe-msg accountexists")]`)

        await step("Go to guest checkout page", async () => {
            await checkoutloginpage.click(checkoutloginpage.guestcheckoutButton,
                "Clicking on Guest checkout button"
            )
        })

        await step("Verify - 1. Fill your detail with full information and check Add to newsletter box", async () => {
            await checkoutpage.fillCheckoutYourDetailForm(basicAuthPage, checkoutFullData)
            await screenshotAndAttach(basicAuthPage, './screenshots/Subscription', '01 - Add to newsletter box checked');
        })

        await checkoutpage.click(checkoutpage.continueButton, "Click on Step 1 Continue button")

        await step("Fill recipient info", async () => {
            await checkoutpage.fillRecipientDetilsForm(basicAuthPage, checkoutShippingData)
        })

        await step("Click on continue button", async () => {
            await checkoutpage.click(checkoutpage.recipientContinueBtn, "Click on Step 2 Continue button")
            await PageUtils.waitForPageLoad(basicAuthPage)
        })

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

        await step("Verify - 2. Ordering success page is displayed", async () => {
            await checkoutpage.assertVisible(checkoutpage.orderSuccessTitle,
                "Assert the order success title is visible"
            )
            await screenshotAndAttach(basicAuthPage, './screenshots/Subscription', '02 - Ordering success page');
        })

        await step("Back to homepage", async () => {
            await checkoutpage.goto(Config.baseURL)
        });

        await scrollToBottom(basicAuthPage)
        await globalnavfooterpage.footerLogo.scrollIntoViewIfNeeded()

        await step("Enter the invalid-email into the email textbox", async () => {
            await globalnavfooterpage.type(globalnavfooterpage.emailTextbox, checkoutFullData.email)
        })

        await step("Clicking on the subscribe button again", async () => {
            await globalnavfooterpage.click(globalnavfooterpage.subscribeButton,
                "Clicking on Subscribe button"
            )
            await globalnavfooterpage.assertHidden(globalnavfooterpage.underlay,
                "Waiting for underlay screen hidden"
            )
        })

        await step("Verify - 3. Duplicate subscription handling - Duplicate subscription message shown", async () => {
            await globalnavfooterpage.assertText(emailexistmsg, accountexistMsg,
                "Assert invalid-feedback: Account exists"
            )

            await screenshotAndAttach(basicAuthPage, './screenshots/Subscription', '03 - Duplicate subscription message');
        })
    });
});

test.describe("Subscription-register-account", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const loginPage = createLoginPage(basicAuthPage);

        await step('Register page', async () => {
            await loginPage.goToLoginRegisterPage();
            await loginPage.goToRegisterPage()
        })
    });

    test(`
        1. Fill register form - Add to newsletter box checked
        2. Register new account success - My page shows
        `, async ({ basicAuthPage }) => {
        const registerpage = new RegisterPage(basicAuthPage)
        const mypage = new MyPage(basicAuthPage)
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)
        const accountexistMsg = t.globalnavfooter('duplicateemail')
        const emailexistmsg = basicAuthPage.locator(`//footer[@id="footer"]//div[contains(@class,"subscribe-msg accountexists")]`)
        const newemail = "gloobeauto_" + generateReadableTimeBasedId() + "@mailinator.com"

        await step('Fill information to form', async () => {
            await registerpage.fillRegisterForm({ email: newemail, phone: `89${generateNumberString(6)}` })
            await screenshotAndAttach(basicAuthPage, './screenshots/Subscription', '01 - Add to newsletter box checked');
        })

        await step('Click Create Account button', async () => {
            await registerpage.click(registerpage.createAccountButton)
            await basicAuthPage.waitForURL(/account/, { waitUntil: 'networkidle' })
        })

        await step(`Verify - 2. Register new account success - My page shows`, async () => {
            await mypage.assertEqual(await mypage.isMyPageDisplayed(), true, "Assert Mypage is displayed")
            await screenshotAndAttach(basicAuthPage, './screenshots/Subscription', '02 - Mypage');
        })

        await step("Back to homepage", async () => {
            await mypage.goto(Config.baseURL)
        });

        await scrollToBottom(basicAuthPage)
        await globalnavfooterpage.footerLogo.scrollIntoViewIfNeeded()

        await step("Enter the invalid-email into the email textbox", async () => {
            await globalnavfooterpage.type(globalnavfooterpage.emailTextbox, newemail)
        })

        await step("Clicking on the subscribe button again", async () => {
            await globalnavfooterpage.click(globalnavfooterpage.subscribeButton,
                "Clicking on Subscribe button"
            )
            await globalnavfooterpage.assertHidden(globalnavfooterpage.underlay,
                "Waiting for underlay screen hidden"
            )
        })

        await step("Verify - 3. Duplicate subscription handling - Duplicate subscription message shown", async () => {
            await globalnavfooterpage.assertText(emailexistmsg, accountexistMsg,
                "Assert invalid-feedback: Account exists"
            )

            await screenshotAndAttach(basicAuthPage, './screenshots/Subscription', '03 - Duplicate subscription message');
        })
    })
});