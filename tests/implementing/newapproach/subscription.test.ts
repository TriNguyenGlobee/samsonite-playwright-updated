import { test, expect } from "../../../src/fixtures/test-fixture"
import { scrollToBottom, screenshotAndAttach, t, generateReadableTimeBasedId } from "../../../utils/helpers/helpers";
import { step } from "allure-js-commons";
import { GlobalNavFooterPage } from "../../../src/pages/delivery/home/global-nav-footer.page";
import { Config } from "../../../config/env.config";
import { steps } from "../../../utils/helpers/localeStep";
//import { MailSlurp } from 'mailslurp-client';
import { EmailService } from "../../../utils/helpers/emailService";

test.describe("Subscription-homepage", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)

        await scrollToBottom(basicAuthPage)
        await globalnavfooterpage.footerLogo.scrollIntoViewIfNeeded()
    });

    test(`1. Invalid feedback messsge shows when clicking Subscribe button without email`, async ({ basicAuthPage }) => {
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)
        const invalid_Feedback = t.globalnavfooter('completethisfield')

        await step("[STEP] Click Subscribe button without email", async () => {
            await globalnavfooterpage.click(globalnavfooterpage.subscribeButton)
        })

        await step("[STEP] Verify - 1. Verify that invalid feedback is displayed", async () => {
            await globalnavfooterpage.assertText(globalnavfooterpage.invalidFeedback, invalid_Feedback,
                "Assert invalid-feedback: please complete this field"
            )

            await screenshotAndAttach(basicAuthPage, './screenshots/Subscription', '01 - Invalid feedback');
        })
    })

    test("2. Invalid feedback message shows when clicking Subscribe button with invalid email", async ({ basicAuthPage }) => {
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)
        const invalid_Email = "globeetest_invalidemail"
        const invalid_Feedback = t.globalnavfooter('invalidemail')

        await step("[STEP] Submit button with invalid-email address", async () => {
            await step("[ChSTEP] Type invalid email into email textbox", async () => {
                await globalnavfooterpage.type(globalnavfooterpage.emailTextbox, invalid_Email)
            })

            await step("[ChSTEP] Clicking on the subscribe button", async () => {
                await globalnavfooterpage.click(globalnavfooterpage.subscribeButton)
            })
        })

        await step("[STEP] Verify - 2. Verify that invalid feedback is displayed", async () => {
            await globalnavfooterpage.assertText(globalnavfooterpage.invalidFeedback, invalid_Feedback,
                "Assert invalid-feedback: Please enter the valid email"
            )

            await screenshotAndAttach(basicAuthPage, './screenshots/Subscription', '02 - Invalid feedback');
        })
    })

    test(`
        3. User can subscribe with valid email
        4. The duplicate subscribe message shows when clicking Subscribe button with exist email
        `, async ({ basicAuthPage }) => {
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)
        const email_suffix = generateReadableTimeBasedId()
        //const valid_email = "gloobeauto_" + email_suffix + "@yopmail.com"
        const subscribeMsg = t.globalnavfooter('createsuccess')
        const accountexistMsg = t.globalnavfooter('duplicateemail')
        const createdmsg = basicAuthPage.locator(`//footer[@id="footer"]//div[contains(@class,"subscribe-msg accountcreated")]`)
        const successmsg = basicAuthPage.locator(`//div[@class="resp-messages"]//h2[@class="success"]`)
        const emailexistmsg = basicAuthPage.locator(`//footer[@id="footer"]//div[contains(@class,"subscribe-msg accountexists")]`)
        const emailService = new EmailService();
        const email = emailService.generateEmail();
        const returnbutton = basicAuthPage.locator(`//button[@class="btn-return"]`)
        /*
        const mailslurp = new MailSlurp({
            apiKey: process.env.MAILSLURP_API_KEY!,
        });*/

        //let inbox: any;
        let emailaddress: string;
        /*
        await test.step('Create MailSlurp inbox', async () => {
            inbox = await mailslurp.createInbox();
            emailaddress = inbox.emailAddress
            expect(emailaddress).toBeTruthy();
        });*/

        await step("[STEP] Type a valid email and click Subscribe button", async () => {
            await step("[ChSTEP] Type valid email into email textbox", async () => {
                await globalnavfooterpage.type(globalnavfooterpage.emailTextbox, email)
            })

            await step("[ChSTEP] Clicking on the subscribe button", async () => {
                await globalnavfooterpage.click(globalnavfooterpage.subscribeButton,
                    "Clicking on Subscribe button"
                )

                await steps(["au"], "Fill the lastest news", async () => {
                    await globalnavfooterpage.fillLatestNewsForm({
                        email: email
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
        })

        await steps(["sg"], "[STEP] Verify - 3. Verify Subscription success - Successful subscription message shown", async () => {
            await globalnavfooterpage.assertText(createdmsg, subscribeMsg,
                "Assert invalid-feedback: Account created success"
            )

            await screenshotAndAttach(basicAuthPage, './screenshots/Subscription', '03 - Successful subscription message');
        })

        await steps(["au"], "[STEP] Verify - 3. Subscription success - Successful subscription message shown", async () => {
            await globalnavfooterpage.assertVisible(successmsg,
                "Assert success message is visible"
            )

            await screenshotAndAttach(basicAuthPage, './screenshots/Subscription', '03 - Successful subscription message');
            await globalnavfooterpage.click(returnbutton, "Clicking on Return button")
        })

        await step('[STEP] Verify - 4. Wait for verification email', async () => {
            //const email = await mailslurp.waitForLatestEmail(inbox.id, 30000, true);
            const message = await emailService.waitForEmail(email);

            await globalnavfooterpage.assertEqual(message.subject?.toLowerCase(), `Hi there, welcome to the World of Samsonite.`.toLowerCase(),
                "Assert the email subject")

            //await basicAuthPage.setContent(email.body || '<p>No email body</p>', { waitUntil: 'load' });

            await step("[ChSTEP] Generate Email HTML", async () => {
                const html = message.html!.body;
                await basicAuthPage.goto('about:blank');
                await basicAuthPage.setContent(html!, { waitUntil: 'load' })
                await basicAuthPage.waitForLoadState('networkidle');
            })

            await screenshotAndAttach(basicAuthPage, './screenshots/Subscription', '04 - Email');
        });

        await step("[STEP] Clicking on the subscribe button again", async () => {
            await globalnavfooterpage.goto(Config.baseURL)

            await step("[ChSTEP] Type the same email into email textbox again", async () => {
                await step("Enter the subscribed email into the email textbox", async () => {
                    await globalnavfooterpage.type(globalnavfooterpage.emailTextbox, email)
                })
            })

            await step("[ChSTEP] Clicking on the subscribe button again", async () => {
                await globalnavfooterpage.click(globalnavfooterpage.subscribeButton,
                    "Clicking on Subscribe button"
                )
            })

            await globalnavfooterpage.assertHidden(globalnavfooterpage.underlay,
                "Waiting for underlay screen hidden"
            )
        })

        await step("[STEP] Verify - 5. Verify duplicate subscription message is displayed", async () => {
            await globalnavfooterpage.assertText(emailexistmsg, accountexistMsg,
                "Assert invalid-feedback: Account exists"
            )

            await screenshotAndAttach(basicAuthPage, './screenshots/Subscription', '05 - Duplicate subscription message');
        })
    })

    test.afterEach(async ({ basicAuthPage }) => {
        await step('[STEP] [FINAL STATE]', async () => {
            await screenshotAndAttach(basicAuthPage, './screenshots/Subscription', 'Final State');
        });
    });
});