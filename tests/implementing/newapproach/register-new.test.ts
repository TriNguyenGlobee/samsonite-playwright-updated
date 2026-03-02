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
//import { MailSlurp } from 'mailslurp-client';
import { Config } from "../../../config/env.config";
import { loadTestData } from "../../../utils/data";
import { EmailService } from "../../../utils/helpers/emailService";

test.describe("Create account with valid information", async () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const loginPage = createLoginPage(basicAuthPage);

        await step('Register page', async () => {
            await loginPage.goToLoginRegisterPage();
            await loginPage.goToRegisterPage()
        })
    });

    test(`
        1. Verify that register page is displayed with register form shows correctly
        2. User can create a new account
        3. Verify the registered email is also subscribed
        4. Verify My Payment Page is displayed with payment method list
        5. User can remove payment method
        6. Checkout page is displayed when click checkout button
        7. User can select and apply a coupon
        8. User can remove a coupon
        9. Click Remove Product button to show Remove product modal
        10. Remove product modal is closed when user click close modal button or cancel button
        11. User can remove all product from cart page
        12. My Profile page is shown with your profile form correctly
        13. User can update profile information
        14. Updated information is correct
        15. User can unregister account
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
        const emailService = new EmailService();
        const email = emailService.generateEmail();
        /*const mailslurp = new MailSlurp({
            apiKey: process.env.MAILSLURP_API_KEY!,
        });*/

        const confirmPassword = "Test@123"
        const updateFirstName = `fname ${randomAlphaString(4)} Updated`
        const updateLastName = `lname ${randomAlphaString(4)} Updated`

        //let inbox: any;
        //let emailaddress: string;
        let paymentMethodInitialCount: number
        let paymentMethodCount: number
        let cartPageURL = `${Config.baseURL}cart`

        /*
        await test.step('Create MailSlurp inbox', async () => {
            inbox = await mailslurp.createInbox();
            emailaddress = inbox.emailAddress
            expect(emailaddress).toBeTruthy();
        });*/

        await step('[STEP] Verify - 1. Register page is displayed - Register form shows correctly', async () => {
            await registerpage.isRegisterpageDisplayed()
            await screenshotAndAttach(basicAuthPage, './screenshots/Register', '01 - Register page');
        })

        await step('[STEP] Fill register form with valid information', async () => {
            await registerpage.fillRegisterForm({ firstname: firstname, phone: getLocalPhone(true), email: email })
        })

        await step('[STEP] Click on Create Account button', async () => {
            await registerpage.click(registerpage.createAccountButton)
            await basicAuthPage.waitForURL(/account/, { waitUntil: 'networkidle' })
        })

        await step(`[STEP] Verify Register new account success - My page shows`, async () => {
            await mypage.assertEqual(await mypage.isMyPageDisplayed(), true, "Assert Mypage is displayed")
            await screenshotAndAttach(basicAuthPage, './screenshots/Register', '02 - Mypage');
        })

        await step('[STEP] Verify - 2. Verification email', async () => {
            //const email = await mailslurp.waitForLatestEmail(inbox.id, 30000, true);
            const message = await emailService.waitForEmail(email);

            await step("[ChSTEP] Assert the email subject", async () => {
                //await mypage.assertEqual(email.subject?.toLowerCase(), `Thank you for registering, ${firstname}.`.toLowerCase(), "Assert the email subject")
                await mypage.assertEqual(message.subject?.toLowerCase(), `Thank you for registering, ${firstname}.`.toLowerCase(), "Assert the email subject")
            })

            //await basicAuthPage.setContent(email.body || '<p>No email body</p>', { waitUntil: 'load' });

            await step("[ChSTEP] Generate Email HTML", async () => {
                const html = message.html!.body;
                await basicAuthPage.goto('about:blank');
                await basicAuthPage.setContent(html!, { waitUntil: 'load' })
                await basicAuthPage.waitForLoadState('networkidle');
            })

            await screenshotAndAttach(basicAuthPage, './screenshots/Register', '02 - Email');
        });

        await step('[STEP] Go to Home Page', async () => {
            await mypage.goto(`${Config.baseURL}`)
            await scrollToBottom(basicAuthPage)
        })

        await step("[STEP] Type the registered email into Subscribe textbox", async () => {
            await globalnavfooterpage.type(globalnavfooterpage.emailTextbox, email)
        })

        await step("[STEP ] Veriy - 3. Duplicate message is displayed", async () => {
            await step("[ChSTEP] Clicking on Subscribe button", async () => {
                await globalnavfooterpage.click(globalnavfooterpage.subscribeButton, "Clicking on Subscribe button")
            });

            await step("[ChSTEP] Waiting for underlay screen hidden", async () => {
                await globalnavfooterpage.assertHidden(globalnavfooterpage.underlay, "Waiting for underlay screen hidden")
            });

            await step("[ChSTEP] Assert invalid-feedback: Account exists", async () => {
                await globalnavfooterpage.assertText(emailexistmsg, accountexistMsg, "Assert invalid-feedback: Account exists")
                await screenshotAndAttach(basicAuthPage, './screenshots/Register', '03 - Duplicate subscription message');
            });
        })

        await step('[STEP] Go to PLP page and add product to cart', async () => {
            await step('[ChSTEP] - Go to Luggage', async () => {

                await step("[ChSTEP] Click menu item luggage ", async () => {
                    await globalnavfooterpage.clickMenuItem('luggage')
                })

                await newarrivalspage.logoImg.hover()

                await step('[ChSTEP] Click on In-stock checkbox', async () => {
                    await homepage.clickCheckbox(basicAuthPage, `${t.homepage('in-stock')}`)
                })
            })

            await step("[ChSTEP] Add a product to cart", async () => {
                await Promise.all([
                    cartpage.addMultipleProductsToCart(1, "Add a in-stock product to cart"),
                    //expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);
            })
        })

        await step('[STEP] Go to checkout page', async () => {
            homepage.goto(`${Config.baseURL}checkout?stage=shipping#shipping`)
        })

        await step("[STEP] Fill recipient information form", async () => {
            await step("[ChSTEP] Fill recipient info", async () => {
                await checkoutpage.fillRecipientDetilsForm(basicAuthPage, checkoutShippingData)
            })

            await step("[ChSTEP] Click on continue button", async () => {
                await checkoutpage.click(checkoutpage.recipientContinueBtn, "Click on Step 2 Continue button")
            })
        })
        await PageUtils.waitForPageLoad(basicAuthPage)

        await step("[STEP] Select Visa method", async () => {
            await checkoutpage.click(checkoutpage.visaIcon, "Select Visa payment method")
        })

        await step("[STEP] Fill payment detail form", async () => {
            const { visaCheckoutData } = loadTestData();
            await checkoutpage.fillVisaPaymentDetails(basicAuthPage, visaCheckoutData.cardNumber,
                visaCheckoutData.expiryMonth, visaCheckoutData.expiryYear, visaCheckoutData.cvv,
                "Fill Visa card payment details");
        })

        await step("[STEP] Click continue button", async () => {
            await checkoutpage.click(checkoutpage.paymentcontinueBtn, "Click on payment continue button")
        })
        
        await step('[STEP] Go to My Account page by URL', async () => {
            await basicAuthPage.goto(`${Config.baseURL}account`)
        })

        await step("[STEP] Click on My Payment link", async () => {
            await myAccountPage.click(myAccountPage.paymentLink);
            await basicAuthPage.waitForURL(/wallet/, { waitUntil: 'networkidle' })
        });

        await step("[STEP] Verify - 4. My Payment Page is displayed - Payment methods list shows correctly", async () => {
            expect(await myPaymentPage.isMyPaymentsPageDisplayed()).toBe(true)
            await screenshotAndAttach(basicAuthPage, './screenshots/Register', '04 - Payment list');

            paymentMethodInitialCount = await myPaymentPage.paymentsRows.count()
        })

        await step("[STEP] Verify - 5. Remove Payment method", async () => {
            await myPaymentPage.removePayment(1)

            paymentMethodCount = await myPaymentPage.paymentsRows.count()

            await myPaymentPage.assertEqual(paymentMethodCount, paymentMethodInitialCount - 1,
                "Assert that the payment is removed"
            )

            await screenshotAndAttach(basicAuthPage, './screenshots/Register', '05 - Payment is removed');
        })

        await step('[STEP] Go to Cart page by URL', async () => {
            await basicAuthPage.goto(cartPageURL)
        })

        await step('[STEP] Verify - 6. Checkout page is displayed - Checkout page shows', async () => {
            await cartpage.assertNavigatedURLByClickLocator(basicAuthPage, cartpage.checkoutButton, `checkout`,
                "Click on Checkout button and check Checkout Login page is displayed"
            )

            await screenshotAndAttach(basicAuthPage, './screenshots/Register', '06 - Checkout page');
        })

        await step('[STEP] Click on Please select a coupon', async () => {
            await cartpage.click(cartpage.selectCouponButton)
        })

        await step('[STEP] Click appy button to apply coupon', async () => {
            await cartpage.click(cartpage.couponApplyLink.first(), "Click apply coupon link")
        })

        await delay(2000)
        await cartpage.waitFor(cartpage.couponCodeAdded)

        await step('[STEP] Verify - 7. Coupon is added', async () => {
            await cartpage.assertVisible(cartpage.couponCodeAdded,
                "Assert the coupon is added"
            )
            await screenshotAndAttach(basicAuthPage, './screenshots/Register', '07 - Coupon added');
        })

        await step('[STEP] Verify -  8. Click remove button to remove a coupon ', async () => {
            await cartpage.removeCoupon()

            await cartpage.assertHidden(cartpage.couponCodeAdded)
            await screenshotAndAttach(basicAuthPage, './screenshots/Register', '08 - Coupon removed');
        })

        await step('[STEP] Verify - 9. Remove product modal is displayed when clicking on remove product button', async () => {
            await cartpage.click(cartpage.removeProductButton.first(), 'Click remove product button in Cart page')

            await cartpage.assertVisible(cartpage.removeProductModal, 'Assert remove product modal is displayed')
            await screenshotAndAttach(basicAuthPage, './screenshots/Register', '09 - Remove product modal');
        })

        await step("[STEP] Click close modal button to close remove product modal", async () => {
            await step("[ChSTEP] Close remove product modal", async () => {
                await cartpage.click(cartpage.removeProdModalCloseButton, 'Close remove product modal')
            })

            await step("[ChSTEP] Assert remove product modal is closed", async () => {
                await cartpage.assertHidden(cartpage.removeProductModal, 'Assert remove product modal is closed')
            })

            await step("[ChSTEP] Click remove product button in Cart page", async () => {
                await cartpage.click(cartpage.removeProductButton.first(), 'Click remove product button in Cart page')
            })
        })

        await step('Verify - 11. Click cancle button to close remove product modal', async () => {
            await step("[ChSTEP] Cancel remove product", async () => {
                await cartpage.click(cartpage.removeProdModalCancelButton, 'Cancel remove product')
            })

            await step("[ChSTEP] Assert remove product modal is closed", async () => {
                await cartpage.assertHidden(cartpage.removeProductModal, 'Assert remove product modal is closed')
                await screenshotAndAttach(basicAuthPage, './screenshots/Register', '11 - Remove product modal closed');
            })
        })

        await step('[STEP] Verify - 12. Remove all produt from cart page', async () => {
            await cartpage.removeAllProducts()

            const numberOfProd = await cartpage.getNumberOfProducts()

            expect(numberOfProd).toBe(0)

            await screenshotAndAttach(basicAuthPage, './screenshots/Register', '12 - Cartpage-empty-cart');
        })

        await step('[STEP] Go to my Profile page', async () => {
            await basicAuthPage.goto(`${Config.baseURL}account`)
        })

        await step("Click on My Profile link", async () => {
            await myAccountPage.click(myAccountPage.myprofileLink);
            await basicAuthPage.waitForURL(/profile/, { waitUntil: 'networkidle' })
        });

        await step("Verify - 12. My profile page is displayed and your profile form shows correctly", async () => {
            expect(await myProfilePage.isMyProfilePageDisplayed()).toBe(true)
            await screenshotAndAttach(basicAuthPage, './screenshots/Register', '12 - My Profile Page');
        })

        await step(`[STEP] Verify - 13. Fill my profile form and update account success`, async () => {
            await step("[ChSTEP] Fill my profile form", async () => {
                await myProfilePage.fillUpdateMyProfileForm({ firstName: updateFirstName, lastName: updateLastName, password: confirmPassword })
            })

            await step('[ChSTEP] Click Update Information button', async () => {
                await myProfilePage.click(myProfilePage.updateProfileBtn)
                await basicAuthPage.waitForURL(/account/, { waitUntil: 'networkidle' })
            })

            await step('[ChSTEP] Assert Mypage is displayed', async () => {
                await mypage.assertEqual(await mypage.isMyPageDisplayed(), true, "Assert Mypage is displayed")
                await screenshotAndAttach(basicAuthPage, './screenshots/Register', '13 - Mypage');
            })
        })

        await step("[STEP] Verify - 14. Click on My Profile link and check updated information", async () => {
            await step("[ChSTEP] Click on My Profile link", async () => {
                await myAccountPage.click(myAccountPage.myprofileLink);
            });

            await step("[ChSTEP] Check updated information", async () => {
                await expect(myProfilePage.firstnameTextbox).toHaveValue(updateFirstName);
                await expect(myProfilePage.lastnameTextbox).toHaveValue(updateLastName);
                await screenshotAndAttach(basicAuthPage, './screenshots/Register', '14 - Updated information');
            })
        })

        await step("[STEP] Go to my Profile by URL", async () => {
            await mypage.goto(Config.baseURL + 'profile')
        })

        await step("[STEP] Verify - 15. Unregister Account", async () => {
            await myProfilePage.unregisterAccount()
            await screenshotAndAttach(basicAuthPage, './screenshots/Register', '15 - AfterEach-Home page');
        })
    })

    test.afterEach(async ({ basicAuthPage }) => {
        await step('[STEP] [FINAL STATE]', async () => {
            await screenshotAndAttach(basicAuthPage, './screenshots/Register', 'Final State');
        });
    });
})