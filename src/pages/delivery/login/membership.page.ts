import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../base.page";
import { t } from "../../../../utils/helpers/helpers";
import { Config } from "../../../../config/env.config";
import { step } from "allure-js-commons";

export class MembershipPage extends BasePage {
    readonly logoImg: Locator;
    readonly pageTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.pageTitle = page.locator(`//div[contains(@class,"register-banner")]//h2[@class="page-title" and normalize-space(text())="${t.registerpage('pageTitle')}"]`);
    }

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================
    async isMembershippageDisplayed(): Promise<boolean> {
        try {
            const title = await this.page.title();
            if (!title.includes(t.membershippage('title'))) {
                await step(`Check title of page: ${title.toString()}`, async () => {
                    console.log(`Element not visible: ${title.toString()}`);
                });
                return false;
            }

            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "MembershipPrivilegePage.html";
            if (!currentUrl.startsWith(expectedUrl)) {
                await step(`Check Url: ${currentUrl}`, async () => {
                    console.log(`Current URL is: ${currentUrl}`);
                });
                return false;
            }
            const elementsToCheck = [
                this.pageTitle,
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
            console.error('Error checking membership page:', error);
            return false;
        }
    }

    // =========================
    // ✅ Assertions
    // =========================

}
