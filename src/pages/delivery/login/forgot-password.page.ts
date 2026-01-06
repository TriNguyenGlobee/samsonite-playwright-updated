import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../base.page";
import { t, PageUtils } from "../../../../utils/helpers/helpers";
import { Config } from "../../../../config/env.config";
import { step, attachment } from "allure-js-commons";
import { test } from "@playwright/test";

export class ForgotPasswordPage extends BasePage {
    readonly logoImg: Locator;
    readonly pageTitle: Locator;
    readonly instructionMsg: Locator;
    readonly emailTextbox: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.pageTitle = page.locator(`//div[@class="title-contain"][h1[normalize-space(text())="${t.forgotpasswordpage('pageTitle')}"]]`);
        this.instructionMsg = page.locator(`//div[@class="request-password-body"][p[normalize-space(text())="${t.forgotpasswordpage('instructionMsg')}"]]`);
        this.emailTextbox = page.locator(`//div[label[normalize-space(text())="${t.forgotpasswordpage('emailTextbox')}"]]//input[@id="reset-password-email"]`);
        this.submitButton = page.locator(`//div[@class="send-email-btn"]//button[normalize-space(text())="${t.forgotpasswordpage('submitbutton')}"]`);
    }

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================
    async isForgotPasswordpageDisplayed(): Promise<boolean> {
        await PageUtils.waitForDomAvailable(this.page)

        try {
            const title = await this.page.title();
            const expectedTitle = t.forgotpasswordpage('title')
            const currentUrl = await this.page.url();
            let expectedUrl = Config.baseURL + "passwordreset";

            if (process.env.LOCALE == "id") {
                expectedUrl = Config.baseURL + "en/passwordreset";
            }

            await test.step("Forgotpassword page data: ", async () => {
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
                this.pageTitle,
                this.instructionMsg,
                this.emailTextbox,
                this.submitButton
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
            console.error('Error checking forgot password page:', error);
            return false;
        }
    }

    // =========================
    // ✅ Assertions
    // =========================

}
