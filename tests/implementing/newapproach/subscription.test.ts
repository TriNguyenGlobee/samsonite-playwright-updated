import { test, expect } from "../../../src/fixtures/test-fixture"
import { scrollToBottom, screenshotAndAttach, t, generateReadableTimeBasedId } from "../../../utils/helpers/helpers";
import { step } from "allure-js-commons";
import { GlobalNavFooterPage } from "../../../src/pages/delivery/home/global-nav-footer.page";
import { Config } from "../../../config/env.config";
import { steps } from "../../../utils/helpers/localeStep";
import { MailSlurp } from 'mailslurp-client';

const isProd = () => process.env.ENV === 'prod';

test.describe("Subscription-homepage", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)

        await scrollToBottom(basicAuthPage)
        await globalnavfooterpage.footerLogo.scrollIntoViewIfNeeded()
    });

    test(`1. Submit button without email address - Invalid feedback shows`, async ({ basicAuthPage }) => {
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
        //const valid_email = "gloobeauto_" + email_suffix + "@yopmail.com"
        const subscribeMsg = t.globalnavfooter('createsuccess')
        const accountexistMsg = t.globalnavfooter('duplicateemail')
        const createdmsg = basicAuthPage.locator(`//footer[@id="footer"]//div[contains(@class,"subscribe-msg accountcreated")]`)
        const successmsg = basicAuthPage.locator(`//div[@class="resp-messages"]//h2[@class="success"]`)
        const emailexistmsg = basicAuthPage.locator(`//footer[@id="footer"]//div[contains(@class,"subscribe-msg accountexists")]`)
        const returnbutton = basicAuthPage.locator(`//button[@class="btn-return"]`)
        const mailslurp = new MailSlurp({
            apiKey: process.env.MAILSLURP_API_KEY!,
        });

        let inbox: any;
        let emailaddress: string;

        await test.step('Create MailSlurp inbox', async () => {
            inbox = await mailslurp.createInbox();
            emailaddress = inbox.emailAddress
            expect(emailaddress).toBeTruthy();
        });

        await step("Enter the valid-email into the email textbox", async () => {
            await globalnavfooterpage.type(globalnavfooterpage.emailTextbox, emailaddress)
        })

        await step("Clicking on the subscribe button", async () => {
            await globalnavfooterpage.click(globalnavfooterpage.subscribeButton,
                "Clicking on Subscribe button"
            )

            await steps(["au"], "Fill the lastest news", async () => {
                await globalnavfooterpage.fillLatestNewsForm({
                    email: emailaddress
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

        await step('Verify - 4. Wait for verification email', async () => {
            const email = await mailslurp.waitForLatestEmail(inbox.id, 30000, true);

            await globalnavfooterpage.assertEqual(email.subject?.toLowerCase(), `Hi there, welcome to the World of Samsonite.`.toLowerCase(),
                "Assert the email subject")

            await basicAuthPage.setContent(email.body || '<p>No email body</p>', { waitUntil: 'load' });

            await screenshotAndAttach(basicAuthPage, './screenshots/Subscription', '04 - Email');
        });

        await step("Clicking on the subscribe button again", async () => {
            await globalnavfooterpage.goto(Config.baseURL)

            await step("Enter the valid-email into the email textbox", async () => {
                await globalnavfooterpage.type(globalnavfooterpage.emailTextbox, emailaddress)
            })

            await globalnavfooterpage.click(globalnavfooterpage.subscribeButton,
                "Clicking on Subscribe button"
            )
            await globalnavfooterpage.assertHidden(globalnavfooterpage.underlay,
                "Waiting for underlay screen hidden"
            )
        })

        await step("Verify - 5. Duplicate subscription handling - Duplicate subscription message shown", async () => {
            await globalnavfooterpage.assertText(emailexistmsg, accountexistMsg,
                "Assert invalid-feedback: Account exists"
            )
        })

        await screenshotAndAttach(basicAuthPage, './screenshots/Subscription', '05 - Duplicate subscription message');
    })
});