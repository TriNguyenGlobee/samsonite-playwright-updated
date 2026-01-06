import { LoginPage } from "./login.page";
import { step, attachment } from "allure-js-commons";
import { Config } from "../../../../config/env.config";
import { PageUtils, t } from "../../../../utils/helpers/helpers";
import { test } from "@playwright/test";


export class LoginID extends LoginPage {
    // =========================
    // 📦 Helpers
    // =========================
    async isLoginPageDisplayed(): Promise<boolean> {
        await PageUtils.waitForDomAvailable(this.page)

        try {
            const title = await this.page.title();
            const expectedTitle = t.loginpage('title')
            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "en/login";

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
}