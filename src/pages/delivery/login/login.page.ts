import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../base.page";
import { step, attachment } from "allure-js-commons";
import { Config } from "../../../../config/env.config";
import { PageUtils, maskEmail, t, openNewTab } from "../../../../utils/helpers/helpers";
import { test } from "@playwright/test";

export abstract class LoginPage extends BasePage {
    readonly signinTitle: Locator;
    readonly loginmsg: Locator;
    readonly emailTextbox: Locator;
    readonly passwordTextbox: Locator;
    readonly signInButton: Locator;
    readonly forgotPWLink: Locator;
    readonly signinWithEmailButton: Locator;
    readonly signinWithFbButton: Locator;
    readonly signinWithGGButton: Locator;
    readonly orSignInLabel: Locator;
    readonly newCustomerLabel: Locator;
    readonly emailSignUpButton: Locator;
    readonly memberNotifyMsg: Locator;
    readonly memberLink: Locator;
    readonly invalidEmailMsg: Locator;
    readonly alertMsg: Locator;
    readonly requireemailmsg: Locator;
    readonly requirepwmsg: Locator;
    readonly signInByEmailLinkPopup: Locator;
    readonly popupTitle: Locator;
    readonly popupEmailTextbox: Locator;
    readonly popupSendEmailButton: Locator;
    readonly popupCloseButton: Locator;
    readonly popupRequireEmailMsg: Locator;
    readonly popupInvalidEmailMsg: Locator;
    readonly popupRequireCaptchaMsg: Locator;
    readonly popupSentEmailTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.signinTitle = page.locator(`//div[@class="title-contain"]//h2[normalize-space(text())="${t.loginpage('singinTitle')}"]`);
        this.loginmsg = page.locator(`//div[@class="login-msg" and text()="${t.loginpage('loginmsg')}"]`);
        this.emailTextbox = page.locator(`//div[label[normalize-space(.)="${t.loginpage('usernamelabel')}"]]//input[@id="login-form-email" or @id="login-form-loginName"]`);
        this.passwordTextbox = page.locator(`//div[label[normalize-space(.)="${t.loginpage('pwlabel')}"]]//input[@id="login-form-password"]`);
        this.signInButton = page.locator(`//button[@type="submit" and normalize-space(text())="${t.loginpage('signinbtn')}"]`);
        this.forgotPWLink = page.locator(`//a[@title="${t.loginpage('forgotPW')}"]`);
        this.signinWithEmailButton = page.locator(`//a[normalize-space(text())="${t.loginpage('signinwithemail')}"]`);
        this.signinWithFbButton = page.locator(`//a[normalize-space(text())="SIGN IN WITH FACEBOOK"]`);
        this.signinWithGGButton = page.locator(`//div[@class="login-oauth-container d-none d-sm-block"]//a[normalize-space(text())="${t.loginpage('signinwithgoogle')}"]`);
        this.orSignInLabel = page.locator(`//div[@class="or-sign-in" and normalize-space(text())="${t.loginpage('orsigninlabel')}"]`);
        this.newCustomerLabel = page.locator(`//form[@class="login-oauth"][p[normalize-space(text())="${t.loginpage('newcustomerlabel')}"]]`);
        this.emailSignUpButton = page.locator(`//div[contains(@class,"email-login")][a[normalize-space(text())="${t.loginpage('emailsignup')}"]]`);
        this.memberNotifyMsg = page.locator(`//div[@class="member-notify-message" and contains(., "新規会員登録し") and contains(., "サムソナイト") and contains(., "エクスプローラープログラム") and contains(., "のメンバーになると送料無料")]`);
        this.memberLink = page.locator(`//u[contains(text(),"サムソナイト") and contains(text(),"エクスプローラープログラム")]/parent::a`);
        this.invalidEmailMsg = page.locator(`//div[label[normalize-space(text())="${t.loginpage('usernamelabel')}"]]//div[@class="invalid-feedback"]`);
        this.alertMsg = page.locator(`//div[@class="alert alert-danger" and text()="${t.loginpage('alertMsg')}"]`);
        this.requireemailmsg = page.locator(`//div[label[normalize-space(text())="${t.loginpage('usernamelabel')}"]]//div[@class="invalid-feedback" and normalize-space(text())="${t.loginpage('requireemailmsg')}"]`);
        this.requirepwmsg = page.locator(`//div[label[normalize-space(text())="${t.loginpage('pwlabel')}"]]//div[@class="invalid-feedback" and normalize-space(text())="${t.loginpage('requirepwmsg')}"]`);
        this.signInByEmailLinkPopup = page.locator(`//div[@class="modal-content"]`);
        this.popupTitle = this.signInByEmailLinkPopup.locator(`xpath=.//h2[text()="${t.loginpage('popuptitle')}"]`);
        this.popupEmailTextbox = this.signInByEmailLinkPopup.locator(`xpath=.//div[label[normalize-space(text())="${t.loginpage('popupemailLabel')}"]]//input`);
        this.popupSendEmailButton = this.signInByEmailLinkPopup.locator(`xpath=.//button[normalize-space(text())="${t.loginpage('popupsendemailbtn')}"]`);
        this.popupCloseButton = this.signInByEmailLinkPopup.locator(`xpath=.//button[@aria-label="Close" and not(@class="close")]//span`);
        this.popupRequireEmailMsg = this.signInByEmailLinkPopup.locator(`xpath=.//div[@class="invalid-feedback" and normalize-space(text())="${t.loginpage('popupRequireEmailMsg')}"]`);
        this.popupInvalidEmailMsg = this.signInByEmailLinkPopup.locator(`xpath=.//div[@class="invalid-feedback"]`);
        this.popupRequireCaptchaMsg = this.signInByEmailLinkPopup.locator(`xpath=.//div[@class="recaptcha-section"]//p[text()="${t.loginpage('popupRequireCaptchaMsg')}"]`);
        this.popupSentEmailTitle = this.signInByEmailLinkPopup.locator(`xpath=.//h2[text()="${t.loginpage('popupSentEmailTitle')}"]`);
    }

    // =========================
    // 🚀 Actions
    // =========================
    async login(username: string, password: string) {
        await step(`Type username: ${username}`, async () => {
            await this.type(this.emailTextbox, username, "Type username");
        });

        await step(`Type password: ${password}`, async () => {
            await this.type(this.passwordTextbox, password, "Type password");
        });

        await step(`Click login button`, async () => {
            await Promise.all([
                this.click(this.signInButton, "Click login button"),
                this.page.waitForURL(/account/),
            ]);
        });

        await PageUtils.waitForDomAvailable(this.page);
        await PageUtils.waitForPageLoad(this.page);
    }

    async loginByGoogleAccount(googleUsername: string, googlePassword: string) {
        const [googlePage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.signinWithGGButton.click(),
        ]);
        expect(googlePage).toBeDefined();
        await expect(googlePage).toHaveURL(/accounts\.google\.com/);

        await googlePage.waitForLoadState();

        const googleEmailTextbox = googlePage.locator('//input[@type="email" and @aria-label="Email or phone"]');
        const gogleNextButton = googlePage.locator('//div[@id="identifierNext"]//button');
        const goglePasswordTextbox = googlePage.locator('//input[@type="password" and @aria-label="Enter your password"]');
        const goglePasswordNextButton = googlePage.locator('//div[@id="passwordNext"]//button');

        await step(`Type google username: ${googleUsername}`, async () => {
            await googleEmailTextbox.fill(googleUsername);
        });

        await step("Click google next button after input email", async () => {
            await gogleNextButton.click();
        });

        await googlePage.waitForLoadState();

        await step(`Type google password: ${'*'.repeat(googlePassword.length)}`, async () => {
            await goglePasswordTextbox.fill(googlePassword);
        });

        await step("Click google next button after input password", async () => {
            await goglePasswordNextButton.click();
        });

        await googlePage.waitForLoadState();
        await PageUtils.waitForPageLoadComplete(this.page);
        await googlePage.close();
    }

    async loginByFacebookAccount(facebookUsername: string, facebookPassword: string) {
        const facebookPage = await openNewTab(this.page, async () => {
            await this.signinWithFbButton.click();
        });

        expect(facebookPage).toBeDefined();
        await expect(facebookPage).toHaveURL(/facebook\.com\/login/);

        await facebookPage.waitForLoadState();

        const facebookEmailTextbox = facebookPage.locator('//input[@id="email"]');
        const facebookPasswordTextbox = facebookPage.locator('//input[@id="pass"]');
        const facebookLoginbutton = facebookPage.locator('//input[@type="submit"]');

        await step(`Type facebook username: ${facebookUsername}`, async () => {
            await facebookEmailTextbox.fill(facebookUsername);
        });

        await step(`Type facebook password: ${'*'.repeat(facebookPassword.length)}`, async () => {
            await facebookPasswordTextbox.fill(facebookPassword);
        });

        await step("Click facebook login button after input password", async () => {
            await facebookLoginbutton.click();
        });

        await facebookPage.waitForLoadState();
        await PageUtils.waitForPageLoadComplete(this.page);
        await facebookPage.close();
    }

    async goToForgotPasswordPage(): Promise<void> {
        await this.click(this.forgotPWLink, "Click forgot password link");
    }

    async goToRegisterPage(): Promise<void> {
        await step('Go to register page', async () => {
            await Promise.all([
                this.page.waitForURL('**/register'),
                this.click(this.emailSignUpButton, "Click email sign up button"),
            ]);
        })
    }

    async goToMembershipPage(): Promise<void> {
        await this.click(this.memberLink, "Click membership link");
        await PageUtils.waitForDomAvailable(this.page);
        await PageUtils.waitForPageLoadComplete(this.page);
    }

    async clickOnRecaptchaCheckbox(): Promise<void> {
        const iframeElementHandle = await this.signInByEmailLinkPopup.locator('iframe[title="reCAPTCHA"]').elementHandle();

        if (!iframeElementHandle) {
            throw new Error('Do not found reCAPTCHA iframe');
        }

        const frame = await iframeElementHandle.contentFrame();

        if (!frame) {
            throw new Error('Do not found frame in reCAPTCHA iframe');
        }

        const checkbox = await frame.locator('//div[@class="recaptcha-checkbox-border"]');
        await checkbox.click();
    }
    // =========================
    // 📦 Helpers
    // =========================
    async isLoginPageDisplayed(): Promise<boolean> {
        await PageUtils.waitForDomAvailable(this.page)

        try {
            const title = await this.page.title();
            const expectedTitle = t.loginpage('title')
            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "login";

            await test.step("Login page data: ", async () => {
                await attachment("Current Page Title", title, "text/plain");
                await attachment("Expected Page Title", expectedTitle.toString(), "text/plain");
                await attachment("Current URL", currentUrl, "text/plain");
                await attachment("Expected URL", expectedUrl, "text/plain");
            });

            if (!expectedTitle.includes(title)) {
                return false;
            }

            if (!currentUrl.startsWith(expectedUrl)) return false;

            const elementsToCheck = [
                this.signinTitle,
                this.loginmsg,
                this.emailTextbox,
                this.passwordTextbox,
                this.signInButton,
                this.forgotPWLink,
                this.signinWithEmailButton,
                this.signinWithGGButton,
                this.orSignInLabel,
                this.newCustomerLabel,
                this.emailSignUpButton,
                this.memberNotifyMsg,
            ];
            for (const locator of elementsToCheck) {
                if (!locator.isVisible()) {
                    await step(`Check visibility of element: ${locator.toString()}`, async () => {
                        console.log(`Element not visible: ${locator.toString()}`);
                    });
                    return false;
                }
            }

            return true;
        } catch (error) {
            console.error('Error checking login page:', error);
            return false;
        }
    }

    async isSignInWithEmailLinkPopupDisplayed(): Promise<boolean> {
        try {
            const elementsToCheck = [
                this.popupTitle,
                this.popupEmailTextbox,
                this.popupSendEmailButton,
                this.popupCloseButton
            ];
            for (const locator of elementsToCheck) {
                if (!locator.isVisible()) {
                    await step(`Check visibility of element: ${locator.toString()}`, async () => {
                        console.log(`Element not visible: ${locator.toString()}`);
                    });
                    return false;
                }
            }

            return true;
        } catch (error) {
            console.error('Error checking sign in with email link popup:', error);
            return false;
        }
    }

    async isSentEmailPopupDisplayed(email: string): Promise<boolean> {
        const maskedEmail = maskEmail(email);
        const emailLocator = this.page.locator(`//p[contains(text(),"${maskedEmail}") and contains(text(),"${t.loginpage('popupSentEmailContent')}")]`);

        try {
            const elementsToCheck = [
                this.popupSentEmailTitle,
                emailLocator,
                this.popupCloseButton
            ];
            for (const locator of elementsToCheck) {
                if (!await locator.isVisible()) {
                    await step(`Check visibility of element: ${locator.toString()}`, async () => {
                        console.log(`Element not visible: ${locator.toString()}`);
                    });
                    return false;
                }
            }

            return true;
        } catch (error) {
            console.error('Error checking sent email popup:', error);
            return false;
        }
    };

    // =========================
    // ✅ Assertions
    // =========================
}
