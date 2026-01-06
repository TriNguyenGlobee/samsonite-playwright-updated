import { test, expect } from "../../../src/fixtures/test-fixture";
import { ForgotPasswordPage } from "../../../src/pages/delivery/login/forgot-password.page";
import { RegisterPage } from "../../../src/pages/delivery/login/register.page";
import { MembershipPage } from "../../../src/pages/delivery/login/membership.page";
import { MyPage } from "../../../src/pages/implementing/mypage/mypage.page";
import { Config } from "../../../config/env.config";
import { step } from "allure-js-commons";
import { t, PageUtils } from "../../../utils/helpers/helpers";
import { createLoginPage } from "../../../src/factories/login.factory";
import { createHomePage } from "../../../src/factories/home.factory"
import { tests } from "../../../utils/helpers/localeTest"

test.describe("Login Screen", () => {
    test(
        `
        1. Login page is displayed 
        2. Passwordreset screen is displayed
        3. Register page is displayed
        `, async ({ basicAuthPage }) => {
        const loginPage = createLoginPage(basicAuthPage);
        const forgotPasswordPage = new ForgotPasswordPage(basicAuthPage);
        const registerPage = new RegisterPage(basicAuthPage);

        await step("Go to login page", async () => {
            await loginPage.goToLoginRegisterPage();
        });

        await step("Verify Login page displayed", async () => {
            expect(await loginPage.isLoginPageDisplayed()).toBe(true);
        });

        await step("Go to forgot password page", async () => {
            await loginPage.goToForgotPasswordPage();
        });

        await step("Verify Forgot Password page displayed", async () => {
            expect(await forgotPasswordPage.isForgotPasswordpageDisplayed()).toBe(true);
        });

        await step("Goback to Login page", async () => {
            await forgotPasswordPage.goBack("Login");
        });

        await step("Go to register page", async () => {
            await loginPage.goToRegisterPage();
        });

        await step("Verify Register page displayed", async () => {
            expect(await registerPage.isRegisterpageDisplayed()).toBe(true);
        });
    });

    tests(["jp"],
        `4. Membership page is displayed`, async ({ basicAuthPage }) => {
        const loginPage = createLoginPage(basicAuthPage);
        const membershipPage = new MembershipPage(basicAuthPage);

        await step("Go to login page", async () => {
            await loginPage.goToLoginRegisterPage();
        });

        await step("Go to membership page", async () => {
            await loginPage.goToMembershipPage();
        });

        await step("Verify transition to  Membership Privilege Page - URL", async () => {
            expect(await membershipPage.isMembershippageDisplayed()).toBe(true);
        });
    });
});

test.describe('Login by normal email', () => {
    test(`1. Login success`, async ({ basicAuthPage }) => {
        const homePage = createHomePage(basicAuthPage);
        const loginPage = createLoginPage(basicAuthPage);
        const myPage = new MyPage(basicAuthPage);

        await step("Go to login page", async () => {
            await homePage.goToLoginRegisterPage();
        });

        await step("Login with valid email and password", async () => {
            await loginPage.login(Config.credentials.username, Config.credentials.password);
        });

        await step("Verify login success by checking mypage displayed", async () => {
            expect(await myPage.isMyPageDisplayed()).toBe(true);
        });
    });

    test(`
        2. Login with invalid email
        3. Login with wrong account
        4. Login with empty email and password
        `, async ({ basicAuthPage }) => {
        const loginPage = createLoginPage(basicAuthPage);
        const myPage = new MyPage(basicAuthPage);

        await step("Go to login page", async () => {
            await loginPage.goToLoginRegisterPage();
        });

        await step("Login with invalid email and password", async () => {
            await loginPage.type(loginPage.emailTextbox, "stgglobeetestssjp1009", "Type username");
            await loginPage.type(loginPage.passwordTextbox, "Globee@12345", "Type password");

            await loginPage.click(loginPage.signInButton, "Click login button");
        });

        await step("Verify login failure by checking login page is still displayed", async () => {
            expect(await loginPage.isLoginPageDisplayed()).toBe(true);
        });

        await step("Verify error message is displayed", async () => {
            expect(await loginPage.invalidEmailMsg).toContainText(t.loginpage('invalidEmailMsg'))
        });

        await step("Reset username and password fields", async () => {
            await loginPage.emailTextbox.fill("");
            await loginPage.passwordTextbox.fill("");
        });

        await step("Login with wrong email and password", async () => {
            await loginPage.type(loginPage.emailTextbox, "stgglobeetestssjp1009@yopmail.com", "Type username");
            await loginPage.type(loginPage.passwordTextbox, "Globee@1234578", "Type password");

            await loginPage.click(loginPage.signInButton, "Click login button");
        });

        await step("Verify login failure by checking login page is still displayed", async () => {
            expect(await loginPage.isLoginPageDisplayed()).toBe(true);
        });

        await step("Verify error message is displayed", async () => {
            expect(await loginPage.assertVisible(loginPage.alertMsg, "Alert message is displayed"));
        });

        await step("Reset username and password fields", async () => {
            await loginPage.emailTextbox.fill("");
            await loginPage.passwordTextbox.fill("");
        });

        await step("Login with empty email and password", async () => {
            await loginPage.type(loginPage.emailTextbox, "", "Type username");
            await loginPage.type(loginPage.passwordTextbox, "", "Type password");

            await loginPage.click(loginPage.signInButton, "Click login button");
        });

        await step("Verify login failure by checking login page is still displayed", async () => {
            expect(await loginPage.isLoginPageDisplayed()).toBe(true);
        });

        await step("Verify error message is displayed", async () => {
            expect(await loginPage.assertVisible(loginPage.requireemailmsg, "Email is required message is displayed"));
            expect(await loginPage.assertVisible(loginPage.requirepwmsg, "Password is required message is displayed"));
        });
    });
});

test.describe("Login with email link", () => {
    test(`
        1. SIGN IN WITH EMAIL LINK Popup is displayed
        2. Clicking Send Login Link button without inputing anythings
        3. Clicking Send Login Link button with invalid email
        4. Clicking Send Login Link button without checking captcha
        `, async ({ basicAuthPage }) => {
        const loginPage = createLoginPage(basicAuthPage);

        await step("Go to login page", async () => {
            await loginPage.goToLoginRegisterPage();
        });

        await step("Click on SIGN IN WITH EMAIL LINK button", async () => {
            await loginPage.click(loginPage.signinWithEmailButton, "Click on SIGN IN WITH EMAIL LINK button");
        });

        await step("Verify SIGN IN WITH EMAIL LINK Popup is displayed", async () => {
            expect(await loginPage.isSignInWithEmailLinkPopupDisplayed()).toBe(true);
            await step("Popup is displayed", async () => {
                console.log("SIGN IN WITH EMAIL LINK Popup is displayed");
            });
        });

        await step("Click send login link button", async () => {
            await loginPage.click(loginPage.popupSendEmailButton, "Click send login link button");
        });

        await step("Verify require email message is displayed", async () => {
            expect(await loginPage.assertVisible(loginPage.popupRequireEmailMsg, "Require email message is displayed"));
        });

        await step("Input invalid email and click send login link button", async () => {
            await loginPage.popupEmailTextbox.fill("stgglobeetestssjp1009");
            await loginPage.click(loginPage.popupSendEmailButton, "Click send login link button");
        });

        await step("Verify invalid email message is displayed", async () => {
            expect(await loginPage.popupInvalidEmailMsg).toContainText(t.loginpage('popupInvalidEmailMsg'))
        });

        await step("Input valid email and click send login link button", async () => {
            await loginPage.popupEmailTextbox.fill(Config.credentials.username);
            await loginPage.click(loginPage.popupSendEmailButton, "Click send login link button");
        });

        await step("Verify require captcha message is displayed", async () => {
            expect(await loginPage.assertVisible(loginPage.popupRequireCaptchaMsg, "Require captcha message is displayed"));
        });
    });
    tests([],`
        5. Clicking Send Login Link button with valid email
        6. The pop-up is closed
        7. Login request email is sent
        8. Login success with login link
        `, async ({ basicAuthPage }) => {
        const loginPage = createLoginPage(basicAuthPage);

        await step("Go to login page", async () => {
            await loginPage.goToLoginRegisterPage();
        });

        await step("Click on SIGN IN WITH EMAIL LINK button", async () => {
            await loginPage.click(loginPage.signinWithEmailButton, "Click on SIGN IN WITH EMAIL LINK button");
        });

        await step("Input valid email and click send login link button", async () => {
            await loginPage.popupEmailTextbox.fill(Config.credentials.username);
        });

        await step("Check the reCAPTCHA checkbox", async () => {
            await loginPage.clickOnRecaptchaCheckbox();
            await loginPage.click(loginPage.popupSendEmailButton, "Click send login link button");
            await PageUtils.waitForPageLoadComplete(basicAuthPage);
        });

        await step("Verify Sent Email popup is displayed", async () => {
            expect(await loginPage.isSentEmailPopupDisplayed(Config.credentials.username)).toBe(true);
        });
    });
});

test.describe("Login by Google login", () => {
    tests([],`
        1. SIGN IN WITH GOOGLE Popup is displayed
        2. Login success by Google account
        `, async ({ basicAuthPage }) => {

        const loginPage = createLoginPage(basicAuthPage);
        const myPage = new MyPage(basicAuthPage);

        await step("Go to login page", async () => {
            await loginPage.goToLoginRegisterPage();
        });

        await step("Login By Google account", async () => {
            await loginPage.loginByGoogleAccount(Config.credentials.gg_username, Config.credentials.gg_password);
        });

        await step("Verify login success by GG", async () => {
            expect(await myPage.isMyPageDisplayed()).toBe(true);
        });
    });
});