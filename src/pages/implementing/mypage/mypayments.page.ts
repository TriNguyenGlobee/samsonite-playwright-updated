import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../base.page";
import { t, delay } from "../../../../utils/helpers/helpers";
import { Config } from "../../../../config/env.config";
import { attachment, step } from "allure-js-commons";
import { test } from "../../../fixtures/test-fixture";

export class MyPaymentsPage extends BasePage {
    readonly logoImg: Locator;
    readonly paymentsRows: Locator
    readonly removePaymentBtn: Locator;

    readonly confirmDeletePayment = this.page.locator(`//h4[text()="Delete Payment?"]/ancestor::div[@class="modal-content"]//button[contains(@class,"delete-confirmation-btn")]`)

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.paymentsRows = page.locator('//div[contains(@class,"list-payments")]//div[@class="card"]');
        this.removePaymentBtn = this.paymentsRows.locator('xpath=.//button[contains(@class,"remove-payment")]');
    }

    // =========================
    // 🚀 Actions
    // =========================
    async removePayment(index: number) {
        await step("Remove an Payment method", async () => {
            this.jsClick(this.removePaymentBtn.nth(index - 1), "Click remove button")

            await this.waitFor(this.confirmDeletePayment)
            this.click(this.confirmDeletePayment, "Click confirm delete payment button")

            await delay(3000)
        })
    }

    // =========================
    // 📦 Helpers
    // =========================
    async isMyPaymentsPageDisplayed(): Promise<boolean> {
        try {
            const title = await this.page.title();
            const currentUrl = this.page.url();

            let expectedUrl = `${Config.baseURL}wallet`;
            if (process.env.LOCALE === 'id') {
                expectedUrl = `${Config.baseURL}en/wallet`;
            }

            const expectedTitle = t.mypayments('title');

            await test.step('My Payments page data:', async () => {
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

            return true;
        } catch (error) {
            console.error('Error checking My Payments page display:', error);
            return false;
        }
    }

    // =========================
    // ✅ Assertions
    // =========================

}
