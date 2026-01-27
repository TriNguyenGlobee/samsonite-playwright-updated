import { test, expect } from "../../../src/fixtures/test-fixture"
import { step } from "allure-js-commons";
import { createLoginPage } from "../../../src/factories/login.factory";
import { RegisterPage } from "../../../src/pages/delivery/login/register.page";
import { MyPage } from "../../../src/pages/implementing/mypage/mypage.page";
import { screenshotAndAttach, generateNumberString, randomAlphaString, getLocalPhone } from "../../../utils/helpers/helpers";
import { MailSlurp } from 'mailslurp-client';

test.describe("Clicking create account button with valid information", async () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const loginPage = createLoginPage(basicAuthPage);

        await step('Register page', async () => {
            await loginPage.goToLoginRegisterPage();
            await loginPage.goToRegisterPage()
        })
    });

    test(`1. Register page is displayed - Register form shows correctly`, async ({ basicAuthPage }) => {
        const registerpage = new RegisterPage(basicAuthPage)
        const mypage = new MyPage(basicAuthPage)
        const firstname = `fname ${randomAlphaString(4)} ${randomAlphaString(3)}`
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

        await step('Wait for verification email', async () => {
            const email = await mailslurp.waitForLatestEmail(inbox.id, 30000, true);

            await mypage.assertEqual(email.subject?.toLowerCase(), `Thank you for registering, ${firstname}.`.toLowerCase(),
                "Assert the email subject")
        });
    })
})