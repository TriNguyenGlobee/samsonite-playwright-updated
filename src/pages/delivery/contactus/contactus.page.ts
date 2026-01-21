import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../base.page";
import { step, attachment } from "allure-js-commons";
import { Config } from "../../../../config/env.config";
import { generateNumberString, generateReadableTimeBasedId, t, randomAlphaString, generateSentence, selectDropdownOption, PageUtils } from "../../../../utils/helpers/helpers";
import { test } from "@playwright/test";

export class ContactUS extends BasePage {
    readonly titleDropdown: Locator;
    readonly emailTextbox: Locator;
    readonly nameTextbox: Locator;
    readonly phoneTextbox: Locator;
    readonly subjectTextbox: Locator;
    readonly messageTextbox: Locator;
    readonly submitButton: Locator;
    readonly successMessageLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.titleDropdown = page.locator('select[name="title"]');
        this.emailTextbox = page.locator('input[name="email"]');
        this.nameTextbox = page.locator('input[name="name"]');
        this.phoneTextbox = page.locator('input[name="phone"]');
        this.subjectTextbox = page.locator('input[name="subject"]');
        this.messageTextbox = page.locator('textarea[name="message"]');
        this.submitButton = page.locator('button#submit');
        this.successMessageLocator = page.locator(`//div[@class="notification animate" and text()="${t.contactuspage('successmsg')}"]`);
    }

    // =========================
    // 🚀 Actions
    // =========================
    async fillContactUsForm(data?: {
        gender?: string;
        name?: string;
        email?: string;
        phone?: string;
        subject?: string;
        message?: string;
    }) {
        const {
            gender = `Mr.`,
            name = `name ${randomAlphaString(4)} ${randomAlphaString(3)}`,
            email = `globee${generateReadableTimeBasedId()}@mailinator.com`,
            phone = `${generateNumberString(8)}`,
            subject = `subject${generateReadableTimeBasedId()}`,
            message = `${generateSentence(20)}`
        } = data ?? {};

        await step('Fill contact us form', async () => {

            if (gender != "") {
                await selectDropdownOption(this.page, this.titleDropdown, gender)
            }

            await this.type(this.nameTextbox, name)
            await this.type(this.emailTextbox, email)
            await this.type(this.phoneTextbox, phone)
            await this.type(this.subjectTextbox, subject)
            await this.type(this.messageTextbox, message)
        })
    }

    // =========================
    // 📦 Helpers
    // =========================
    async isContactUsPageDisplayed(): Promise<boolean> {
        await PageUtils.waitForDomAvailable(this.page)

        try {
            const title = await this.page.title();
            const expectedTitle = t.contactuspage('title')
            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "contactus";

            await test.step("Contact Us page data: ", async () => {
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
                this.titleDropdown,
                this.emailTextbox,
                this.nameTextbox,
                this.phoneTextbox,
                this.subjectTextbox,
                this.messageTextbox,
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
            console.error('Error checking contact us page:', error);
            return false;
        }
    }

    // =========================
    // ✅ Assertions
    // =========================
}
