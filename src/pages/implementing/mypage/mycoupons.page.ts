import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../base.page";
import { t } from "../../../../utils/helpers/helpers";
import { Config } from "../../../../config/env.config";
import { attachment, step } from "allure-js-commons";
import { test } from "../../../fixtures/test-fixture";

export class MyCouponsPage extends BasePage {
    readonly logoImg: Locator;
    readonly savedCouponLink: Locator;
    readonly appliedCouponLink: Locator;
    readonly backToMypageBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.savedCouponLink = page.locator('//div[@class="row order-card"]//div[contains(@class,"text-card")]');
        this.appliedCouponLink = page.locator('//div[@class="row profile-card"]//div[contains(@class,"text-card")]');
        this.backToMypageBtn = page.locator(`.page-title i.icon-ico-arrow-left`);
    }

    // =========================
    // 🚀 Actions
    // =========================

    // =========================
    // 📦 Helpers
    // =========================
    async isMyCouponsPageDisplayed(): Promise<boolean> {
        try {
            const title = await this.page.title();
            const currentUrl = this.page.url();

            let expectedUrl = `${Config.baseURL}couponlist`;
            if (process.env.LOCALE === 'id') {
                expectedUrl = `${Config.baseURL}en/couponlist`;
            }

            const expectedTitle = t.mycoupons('title');

            await test.step('My Coupons page data:', async () => {
                await attachment('Current Page Title', title, 'text/plain');
                await attachment('Expected Page Title', expectedTitle.toString(), 'text/plain');
                await attachment('Current URL', currentUrl, 'text/plain');
                await attachment('Expected URL', expectedUrl, 'text/plain');
            });

            if (!title.includes(expectedTitle)) {
                return false;
            }

            if (!currentUrl.startsWith(expectedUrl)) {
                return false;
            }

            const elementsToCheck = [
                this.savedCouponLink,
                this.appliedCouponLink
            ];

            for (const locator of elementsToCheck) {
                const isVisible = await locator.isVisible();
                if (!isVisible) {
                    await step('Check visibility of element', async () => {
                        console.error(`Element not visible: ${locator}`);
                    });
                    return false;
                }
            }

            return true;
        } catch (error) {
            console.error('Error checking My Coupons page display:', error);
            return false;
        }
    }

    // =========================
    // ✅ Assertions
    // =========================

}
