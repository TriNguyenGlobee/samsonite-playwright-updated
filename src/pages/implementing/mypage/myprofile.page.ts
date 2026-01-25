import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../base.page";
import { selectDropdownOption, t } from "../../../../utils/helpers/helpers";
import { Config } from "../../../../config/env.config";
import { attachment, step } from "allure-js-commons";
import { test } from "../../../fixtures/test-fixture";

export class MyProfilePage extends BasePage {
    readonly logoImg: Locator;
    readonly backToMypageBtn: Locator;
    readonly titleDropdown: Locator;
    readonly emailTextbox: Locator;
    readonly firstnameTextbox: Locator;
    readonly lastnameTextbox: Locator;
    readonly phoneTextbox: Locator;
    readonly passwordTextbox: Locator;
    readonly agreementCheckbox: Locator;
    readonly updateProfileBtn: Locator;
    readonly unregisterAccountBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.backToMypageBtn = page.locator(`//h2[@class="page-title"]//i[contains(@class,"sa-icon icon-ico-arrow-left")]`);
        this.titleDropdown = page.locator('#registration-form-title');
        this.emailTextbox = page.locator('#email');
        this.firstnameTextbox = page.locator('#firstName');
        this.lastnameTextbox = page.locator('#lastName');
        this.phoneTextbox = page.locator('#registration-form-phone');
        this.passwordTextbox = page.locator('#password');
        this.agreementCheckbox = page.locator('//span[contains(text(),"Agree to")]');
        this.updateProfileBtn = page.locator('//button[@name="save"]');
        this.unregisterAccountBtn = page.locator('.btn-unregister');
    }

    // =========================
    // 🚀 Actions
    // =========================
    async fillUpdateMyProfileForm(
        data: UpdateMyProfileFormData = {}
    ): Promise<void> {

        const defaultData: Required<UpdateMyProfileFormData> = {
            title: '',
            firstName: '',
            lastName: '',
            phone: '',
            password: '',
            agreeTerms: true
        };

        const formData = {
            ...defaultData,
            ...data
        };

        await step('Fill update my profile form', async () => {
            if (formData.title) {
                await selectDropdownOption(this.page, this.titleDropdown, formData.title);
            }

            if (formData.firstName) {
                await this.type(this.firstnameTextbox, formData.firstName);
            }

            if (formData.lastName) {
                await this.type(this.lastnameTextbox, formData.lastName);
            }

            if (formData.phone) {
                await this.type(this.phoneTextbox, formData.phone);
            }

            if (formData.password) {
                await this.type(this.passwordTextbox, formData.password);
            }

            if (formData.agreeTerms) {
                if (!(await this.agreementCheckbox.isChecked())) {
                    await this.agreementCheckbox.click();
                }
            }
        });
    }

    // =========================
    // 📦 Helpers
    // =========================
    async isMyProfilePageDisplayed(): Promise<boolean> {
        try {
            const title = await this.page.title();
            const currentUrl = this.page.url();
            let expectedUrl = `${Config.baseURL}account/profile`;

            if (process.env.LOCALE === 'id') {
                expectedUrl = `${Config.baseURL}en/account/profile`;
            }

            await test.step("My Profile page data: ", async () => {
                await attachment("Current Page Title", title, "text/plain");
                await attachment("Expected Page Title", t.myprofile('title'), "text/plain");
                await attachment("Current URL", currentUrl, "text/plain");
                await attachment("Expected URL", expectedUrl, "text/plain");
            });

            if (!title.includes(t.myprofile('title'))) {
                return false;
            }

            if (!currentUrl.startsWith(expectedUrl)) {
                return false;
            }

            const elementsToCheck = [
                this.logoImg,
                this.backToMypageBtn,
                this.titleDropdown,
                this.emailTextbox,
                this.firstnameTextbox,
                this.lastnameTextbox,
                this.phoneTextbox,
                this.passwordTextbox,
                this.agreementCheckbox
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
            console.error('Error checking My Profile page display:', error);
            return false;
        }
    }

    // =========================
    // ✅ Assertions
    // =========================

}

type UpdateMyProfileFormData = {
    title?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    password?: string;
    agreeTerms?: boolean;
};
