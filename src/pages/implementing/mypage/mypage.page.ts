import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../base.page";
import { t } from "../../../../utils/helpers/helpers";
import { Config } from "../../../../config/env.config";
import { step } from "allure-js-commons";

export class MyPage extends BasePage {
    readonly logoImg: Locator;
    readonly pageTitle: Locator;
    readonly myOrdersLink: Locator;
    readonly membershipLink: Locator;
    readonly mycouponsLink: Locator;
    readonly myprofileLink: Locator;
    readonly myaddressLink: Locator;
    readonly paymentLink: Locator;
    readonly mywishlistLink: Locator;
    readonly emailhelp: Locator;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.pageTitle = page.locator(`//div[@class="title-contain"][h1[normalize-space(text())="${t.mypage('pageTitle')}"]]`);
        this.myOrdersLink = page.locator(`//a[h4[normalize-space(text())="${t.mypage('myOrders')}"]]`);
        this.membershipLink = page.locator(`//a[h4[normalize-space(text())="${t.mypage('membership')}"]]`);
        this.mycouponsLink = page.locator(`//a[h4[normalize-space(text())="${t.mypage('mycoupons')}"]]`);
        this.myprofileLink = page.locator(`//a[h4[normalize-space(text())="${t.mypage('myprofile')}"]]`);
        this.myaddressLink = page.locator(`//a[h4[normalize-space(text())="${t.mypage('myaddress')}"]]`);
        this.paymentLink = page.locator(`//a[h4[normalize-space(text())="${t.mypage('payment')}"]]`);
        this.mywishlistLink = page.locator(`//a[h4[normalize-space(text())="${t.mypage('wishlist')}"]]`);
        this.emailhelp = page.locator(`//img/ancestor::div[@class="help-block"]//span[normalize-space(text())="${t.mypage('emailhelp')}"]`);
    }

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================
    async isMyPageDisplayed(): Promise<boolean> {
        try {
            const title = await this.page.title();
            if (!title.includes(t.mypage('title'))) {
                return false;
            }

            const currentUrl = await this.page.url();
            let expectedUrl = Config.baseURL + "account";

            if (process.env.LOCALE == "id") {
                expectedUrl = Config.baseURL + "en/account";
            }

            if (!currentUrl.startsWith(expectedUrl)) return false;

            const elementsToCheck = [
                this.logoImg,
                this.pageTitle,
                this.myOrdersLink,
                this.membershipLink,
                this.mycouponsLink,
                this.myprofileLink,
                this.myaddressLink,
                this.paymentLink,
                this.mywishlistLink,
                this.emailhelp
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
            console.error('Error checking mypage:', error);
            return false;
        }
    }

    // =========================
    // ✅ Assertions
    // =========================

}
