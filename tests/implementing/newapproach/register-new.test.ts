import { test, expect } from "../../../src/fixtures/test-fixture"
import { step } from "allure-js-commons";
import { createLoginPage } from "../../../src/factories/login.factory";
import { RegisterPage } from "../../../src/pages/delivery/login/register.page";
import { MyPage } from "../../../src/pages/implementing/mypage/mypage.page";
import { MyProfilePage } from "../../../src/pages/implementing/mypage/myprofile.page";
import { GlobalNavFooterPage } from "../../../src/pages/delivery/home/global-nav-footer.page";
import { NewArrivalsPage } from "../../../src/pages/delivery/productlistingpage/newarrivals/newarrivals.page";
import { createHomePage } from "../../../src/factories/home.factory";
import { createCartPage } from "../../../src/factories/cart.factory";
import { CheckoutPage } from "../../../src/pages/implementing/checkout/checkout.page";
import { MyPaymentsPage } from "../../../src/pages/implementing/mypage/mypayments.page";
import { screenshotAndAttach, t, randomAlphaString, getLocalPhone, scrollToBottom, PageUtils, delay } from "../../../utils/helpers/helpers";
import { MailSlurp } from 'mailslurp-client';
import { Config } from "../../../config/env.config";
import { loadTestData } from "../../../utils/data";

test.describe("Clicking create account button with valid information", async () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const loginPage = createLoginPage(basicAuthPage);

        await step('Register page', async () => {
            await loginPage.goToLoginRegisterPage();
            await loginPage.goToRegisterPage()
        })
    });

    test(`
        1. Register page is displayed - Register form shows correctly
        2. Register new account success - My page shows
        3. Wait for verification email
        4. Type Registered email and submit Subscribe button - Duplicate subscription message shown
        5. My Payment Page is displayed - Payment methods list shows correctly
        6. Remove a payment method - Payment method is removed
        7. Checkout page is displayed - Checkout page shows
        8. Apply a coupon - Coupon is added
        9. Remove a coupon - Coupon is removed
        10. Remove product modal is displayed - Remove product modal shows corrctly
        11. Remove product model is closed
        12. Product is removed - Cart page is empty
        13. My Profile Page is displayed - Your profile form shows correctly
        14. Update account success - My page shows
        15. Updated information is correct - My updated profile
        16. Unregister Account - Home page
        `, async ({ basicAuthPage }) => {
        const registerpage = new RegisterPage(basicAuthPage)
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)
        const mypage = new MyPage(basicAuthPage)
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)
        const homepage = createHomePage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const checkoutpage = new CheckoutPage(basicAuthPage)
        const myAccountPage = new MyPage(basicAuthPage);
        const myPaymentPage = new MyPaymentsPage(basicAuthPage);
        const myProfilePage = new MyProfilePage(basicAuthPage);
        const firstname = `fname ${randomAlphaString(4)} ${randomAlphaString(3)}`
        const accountexistMsg = t.globalnavfooter('duplicateemail')
        const emailexistmsg = basicAuthPage.locator(`//footer[@id="footer"]//div[contains(@class,"subscribe-msg accountexists")]`)
        const { checkoutShippingData } = loadTestData();
        const mailslurp = new MailSlurp({
            apiKey: process.env.MAILSLURP_API_KEY!,
        });

        const confirmPassword = "Test@123"
        const updateFirstName = `fname ${randomAlphaString(4)} Updated`
        const updateLastName = `lname ${randomAlphaString(4)} Updated`

        let inbox: any;
        let emailaddress: string;
        let paymentMethodInitialCount: number
        let paymentMethodCount: number
        let cartPageURL = `${Config.baseURL}cart`

        await test.step('Create MailSlurp inbox', async () => {
            inbox = await mailslurp.createInbox();
            emailaddress = inbox.emailAddress
            expect(emailaddress).toBeTruthy();
        });

        await step('Verify - 1. Register page is displayed - Register form shows correctly', async () => {
            await registerpage.isRegisterpageDisplayed()
            await screenshotAndAttach(basicAuthPage, './screenshots/Register', '01 - Register page');
        })

        await step('Fill information to form', async () => {
            await registerpage.fillRegisterForm({ firstname: firstname, phone: getLocalPhone(true), email: emailaddress })
        })

        await step('Click Create Account button', async () => {
            await registerpage.click(registerpage.createAccountButton)
            await basicAuthPage.waitForURL(/account/, { waitUntil: 'networkidle' })
        })

        await step(`Verify - 2. Register new account success - My page shows`, async () => {
            await mypage.assertEqual(await mypage.isMyPageDisplayed(), true, "Assert Mypage is displayed")
            await screenshotAndAttach(basicAuthPage, './screenshots/Register', '02 - Mypage');
        })

        await step('Verify - 3. Wait for verification email', async () => {
            const email = await mailslurp.waitForLatestEmail(inbox.id, 30000, true);

            await mypage.assertEqual(email.subject?.toLowerCase(), `Thank you for registering, ${firstname}.`.toLowerCase(),
                "Assert the email subject")

            await basicAuthPage.setContent(email.body || '<p>No email body</p>', { waitUntil: 'load' });

            await screenshotAndAttach(basicAuthPage, './screenshots/Register', '03 - Email');
        });

        await step('Go to Home Page', async () => {
            await mypage.goto(`${Config.baseURL}`)
            await scrollToBottom(basicAuthPage)
        })

        await step("Veriy - 4. Type Registered email and submit Subscribe button - Duplicate subscription message shown", async () => {
            await step("Enter the Registered-email into the email textbox", async () => {
                await globalnavfooterpage.type(globalnavfooterpage.emailTextbox, emailaddress)
            })

            await globalnavfooterpage.click(globalnavfooterpage.subscribeButton,
                "Clicking on Subscribe button"
            )
            await globalnavfooterpage.assertHidden(globalnavfooterpage.underlay,
                "Waiting for underlay screen hidden"
            )

            await globalnavfooterpage.assertText(emailexistmsg, accountexistMsg,
                "Assert invalid-feedback: Account exists"
            )

            await screenshotAndAttach(basicAuthPage, './screenshots/Register', '04 - Duplicate subscription message');
        })

        await step('Add product to cart and go to checkout page', async () => {
            await step('Go to Luggage', async () => {
                await globalnavfooterpage.clickMenuItem('luggage')
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

            await step('Go to checkout page by URL', async () => {
                homepage.goto(`${Config.baseURL}checkout?stage=shipping#shipping`)
            })
        })
        
        await step('Fill checkout information', async () => {
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
        })

        await step('Go to My Account page by URL', async () => {
            await basicAuthPage.goto(`${Config.baseURL}account`)
        })

        await step("Click on My Payment link", async () => {
            await myAccountPage.click(myAccountPage.paymentLink);
            await basicAuthPage.waitForURL(/wallet/, { waitUntil: 'networkidle' })
        });

        await step("Verify - 5. My Payment Page is displayed - Payment methods list shows correctly", async () => {
            expect(await myPaymentPage.isMyPaymentsPageDisplayed()).toBe(true)
            await screenshotAndAttach(basicAuthPage, './screenshots/Register', '05 - Payment list');

            paymentMethodInitialCount = await myPaymentPage.paymentsRows.count()
        })

        await step("Verify - 6. Remove a payment method - Payment method is removed", async () => {
            await myPaymentPage.removePayment(1)

            paymentMethodCount = await myPaymentPage.paymentsRows.count()

            await myPaymentPage.assertEqual(paymentMethodCount, paymentMethodInitialCount - 1,
                "Assert that the payment is removed"
            )

            await screenshotAndAttach(basicAuthPage, './screenshots/Register', '06 - Payment is removed');
        })

        await step('Go to Cart page by URL', async () => {
            await basicAuthPage.goto(cartPageURL)
        })

        await step('Verify - 7. Checkout page is displayed - Checkout page shows', async () => {
            await cartpage.assertNavigatedURLByClickLocator(basicAuthPage, cartpage.checkoutButton, `checkout`,
                "Click on Checkout button and check Checkout Login page is displayed"
            )

            await screenshotAndAttach(basicAuthPage, './screenshots/Register', '07 - Checkout page');
        })

        await step('Click on Please select a coupon button', async () => {
            await cartpage.click(cartpage.selectCouponButton)
        })

        await step('Verify - 8. Apply a coupon - Coupon is added', async () => {
            await cartpage.click(cartpage.couponApplyLink.first(),
                "Click apply coupon link")

            await delay(2000)

            await cartpage.assertVisible(cartpage.couponCodeAdded,
                "Assert the coupon is added"
            )

            await screenshotAndAttach(basicAuthPage, './screenshots/Register', '08 - Coupon added');
        })

        await step('Verify -  9. Remove a coupon - Coupon is removed', async () => {
            await cartpage.removeCoupon()

            await cartpage.assertHidden(cartpage.couponCodeAdded)
            await screenshotAndAttach(basicAuthPage, './screenshots/Register', '09 - Coupon removed');
        })

        await step('Verify - 10. Remove product modal is displayed - Remove product modal shows corrctly', async () => {
            await cartpage.click(cartpage.removeProductButton.first(), 'Click remove product button in Cart page')

            await cartpage.assertVisible(cartpage.removeProductModal, 'Assert remove product modal is displayed')
            await screenshotAndAttach(basicAuthPage, './screenshots/Register', '10 - Remove product modal');
        })

        await step('Verify - 11. Remove product model is closed', async () => {
            await cartpage.click(cartpage.removeProdModalCloseButton, 'Close remove product modal')

            await cartpage.assertHidden(cartpage.removeProductModal, 'Assert remove product modal is closed')

            await cartpage.click(cartpage.removeProductButton.first(), 'Click remove product button in Cart page')

            await cartpage.click(cartpage.removeProdModalCancelButton, 'Cancel remove product')

            await cartpage.assertHidden(cartpage.removeProductModal, 'Assert remove product modal is closed')

            await screenshotAndAttach(basicAuthPage, './screenshots/Register', '11 - Remove product modal closed');
        })

        await step('Verify - 12. Product is removed - Cart page is empty', async () => {
            await cartpage.removeAllProducts()

            const numberOfProd = await cartpage.getNumberOfProducts()

            expect(numberOfProd).toBe(0)

            await screenshotAndAttach(basicAuthPage, './screenshots/Register', '12 - Cartpage-empty-cart');
        })

        await step('Go to My Account page by URL', async () => {
            await basicAuthPage.goto(`${Config.baseURL}account`)
        })

        await step("Click on My Profile link", async () => {
            await myAccountPage.click(myAccountPage.myprofileLink);
            await basicAuthPage.waitForURL(/profile/, { waitUntil: 'networkidle' })
        });

        await step("Verify - 13. My Profile Page is displayed - Your profile form shows correctly", async () => {
            expect(await myProfilePage.isMyProfilePageDisplayed()).toBe(true)
            await screenshotAndAttach(basicAuthPage, './screenshots/Register', '13 - My Profile Page');
        })

        await step("Fill my profile form", async () => {
            await myProfilePage.fillUpdateMyProfileForm({ firstName: updateFirstName, lastName: updateLastName, password: confirmPassword })
        })

        await step('Click Update Information button', async () => {
            await myProfilePage.click(myProfilePage.updateProfileBtn)
            await basicAuthPage.waitForURL(/account/, { waitUntil: 'networkidle' })
        })

        await step(`Verify - 14. Update account success - My page shows`, async () => {
            await mypage.assertEqual(await mypage.isMyPageDisplayed(), true, "Assert Mypage is displayed")
            await screenshotAndAttach(basicAuthPage, './screenshots/Register', '14 - Mypage');
        })

        await step("Click on My Profile link", async () => {
            await myAccountPage.click(myAccountPage.myprofileLink);
        });

        await step("Verify - 15. Updated information is correct - My updated profile", async () => {
            await expect(myProfilePage.firstnameTextbox).toHaveValue(updateFirstName);
            await expect(myProfilePage.lastnameTextbox).toHaveValue(updateLastName);
            await screenshotAndAttach(basicAuthPage, './screenshots/Register', '15 - Updated information');
        })


    })

    test.afterEach(async ({ basicAuthPage }) => {
        const mypage = new MyPage(basicAuthPage)
        const myProfilePage = new MyProfilePage(basicAuthPage);
        await step("Verify - 16. Unregister Account - Home page", async () => {
            await mypage.goto(Config.baseURL + 'profile')
            await myProfilePage.unregisterAccount()
            await screenshotAndAttach(basicAuthPage, './screenshots/Register', '16 - AfterEach-Home page');
        })
    })
})