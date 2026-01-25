import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../base.page";
import { t } from "../../../../utils/helpers/helpers";
import { Config } from "../../../../config/env.config";
import { attachment, step } from "allure-js-commons";
import { test } from "../../../fixtures/test-fixture";

export class MyorderPage extends BasePage {
    readonly logoImg: Locator;
    readonly backToMypageBtn: Locator;
    readonly onlineOrderLink: Locator;
    readonly offlineOrderLink: Locator;
    readonly orderListContainer: Locator;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.backToMypageBtn = page.locator(`//h2[@class="page-title"]//i[contains(@class,"sa-icon icon-ico-arrow-left")]`);
        this.onlineOrderLink = page.locator(`.online-order`);
        this.offlineOrderLink = page.locator(`.offline-order`);
        this.orderListContainer = page.locator('.order-list-container');
    }

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================
    async isMyOrderPageDisplayed(): Promise<boolean> {
        try {
            const title = await this.page.title();
            const currentUrl = this.page.url();
            let expectedUrl = `${Config.baseURL}account/orders`;

            if (process.env.LOCALE === 'id') {
                expectedUrl = `${Config.baseURL}en/account/orders`;
            }

            await test.step("My Order page data: ", async () => {
                await attachment("Current Page Title", title, "text/plain");
                await attachment("Expected Page Title", t.myorder('title'), "text/plain");
                await attachment("Current URL", currentUrl, "text/plain");
                await attachment("Expected URL", expectedUrl, "text/plain");
            });

            if (!title.includes(t.myorder('title'))) {
                return false;
            }

            if (!currentUrl.startsWith(expectedUrl)) {
                return false;
            }

            const elementsToCheck = [
                this.logoImg,
                this.backToMypageBtn,
                this.onlineOrderLink,
                this.offlineOrderLink,
                this.orderListContainer
            ];

            for (const locator of elementsToCheck) {
                const isVisible = await locator.isVisible();
                if (!isVisible) {
                    await step(`Check visibility of element`, async () => {
                        console.error(`Element not visible: ${locator}`);
                    });
                    return false;
                }
            }

            return true;
        } catch (error) {
            console.error('Error checking My Order page display:', error);
            return false;
        }
    }

    // =========================
    // ✅ Assertions
    // =========================

}
