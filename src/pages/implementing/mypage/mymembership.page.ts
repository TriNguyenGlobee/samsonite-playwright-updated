import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../base.page";
import { t } from "../../../../utils/helpers/helpers";
import { Config } from "../../../../config/env.config";
import { step, attachment } from "allure-js-commons";
import { test } from "@playwright/test";

export class MyMembershipPage extends BasePage {
    readonly logoImg: Locator;
    readonly backToMypageBtn: Locator;
    readonly membershipCardImg: Locator;
    readonly rewardsAndMembershipBtn: Locator;
    readonly rewardsandmembershipUnderContent: Locator;
    readonly mycouponsbtn: Locator;
    readonly myCouponsUnderContent: Locator;
    readonly termsAndConditionsBtn: Locator;
    readonly termsAdndConditionsUnderContent: Locator;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.backToMypageBtn = page.locator(`//h2[@class="page-title"]//i[contains(@class,"sa-icon icon-ico-arrow-left")]`);
        this.membershipCardImg = page.locator('//div[@class="membership-card-image"]');
        this.rewardsandmembershipUnderContent = page.locator(`//button[contains(text(),"${t.mymembership('rewardandmembership')}")]/ancestor::div[@class="card"]//span`);
        this.rewardsAndMembershipBtn = page.locator(`//button[contains(text(),"${t.mymembership('rewardandmembership')}")]`);
        this.mycouponsbtn = page.locator(`//button[contains(text(),"${t.mymembership('mycoupons')}")]`);
        this.myCouponsUnderContent = page.locator(`//button[contains(text(),"${t.mymembership('mycoupons')}")]/ancestor::div[@class="card"]//span`);
        this.termsAndConditionsBtn = page.locator(`//button[contains(text(),"${t.mymembership('termsandconditions')}")]`);
        this.termsAdndConditionsUnderContent = page.locator(`//button[contains(text(),"${t.mymembership('termsandconditions')}")]/ancestor::div[@class="card"]//span`);
    }

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================
    async isMyMembershipDisplayed(): Promise<boolean> {
        try {
            const currentUrl = this.page.url();
            let expectedUrl = `${Config.baseURL}membership`;

            if (process.env.LOCALE === 'id') {
                expectedUrl = `${Config.baseURL}en/membership`;
            }

            await test.step("My Membership page data: ", async () => {
                await attachment("Current URL", currentUrl, "text/plain");
                await attachment("Expected URL", expectedUrl, "text/plain");
            });

            if (!currentUrl.startsWith(expectedUrl)) {
                return false;
            }

            const elementsToCheck = [
                this.rewardsAndMembershipBtn,
                this.mycouponsbtn,
                this.termsAndConditionsBtn
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
            console.error('Error checking My Membership page display:', error);
            return false;
        }
    }

    // =========================
    // ✅ Assertions
    // =========================

}
