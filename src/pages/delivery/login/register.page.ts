import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../base.page";
import {
    t, selectDropdownOption, generateSentence, generateNumberString, generateReadableTimeBasedId, randomAlphaString,
    randomInt
} from "../../../../utils/helpers/helpers";
import { Config } from "../../../../config/env.config";
import { step } from "allure-js-commons";

export class RegisterPage extends BasePage {
    readonly logoImg: Locator;
    readonly pageTitle: Locator;
    readonly subTitle: Locator;
    readonly customerDetailsLabel: Locator;
    readonly lastNameTextbox: Locator;
    readonly firstNameTextbox: Locator;
    readonly phoneNumberTextbox: Locator;
    readonly dateOfBirthLabel: Locator;
    readonly yearDropdown: Locator;
    readonly monthDropdown: Locator;
    readonly dayDropdown: Locator;
    readonly genderDropdown: Locator;
    readonly emailTexbox: Locator;
    readonly passwordTextbox: Locator;
    readonly confirmPasswordTextbox: Locator;
    readonly getNewsRegisterLabel: Locator;
    readonly getNewsRegisterCheckbox: Locator;
    readonly termsConditionLabel: Locator;
    readonly termsConditionCheckboxEn: Locator;
    readonly termsConditionCheckboxJp: Locator;
    readonly createAccountButton: Locator;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.pageTitle = page.locator(`//div[contains(@class,"register-banner")]//h2[@class="page-title" and normalize-space(text())="${t.registerpage('pageTitle')}"]`);
        this.subTitle = page.locator(`//div[contains(@class,"register-banner")]//h5[@class="sub-title" and normalize-space(text())="会員になると、送料無料、メンバーセールへのアクセス、クーポンなどの特典をお楽しみいただけます。"]`);
        this.customerDetailsLabel = page.locator(`//div[h4[normalize-space(text())="${t.registerpage('customerdetailslabel')}"]]`);
        this.lastNameTextbox = page.locator(`//div[label[normalize-space(text())="${t.registerpage('lastname')}"]]//input[@id="registration-form-lname"]`);
        this.firstNameTextbox = page.locator(`//div[label[normalize-space(text())="${t.registerpage('firstname')}"]]//input[@id="registration-form-fname"]`);
        this.phoneNumberTextbox = page.locator(`//div[label[normalize-space(text())="${t.registerpage('phonenumber')}"]]//input[not(@type="hidden")]`);
        this.dateOfBirthLabel = page.locator(`//div[label[normalize-space(text())="${t.registerpage('dateofbirth')}"]]`);
        this.yearDropdown = page.locator(`//select[@id="year"]`);
        this.monthDropdown = page.locator(`//select[@name="month"]`);
        this.dayDropdown = page.locator(`//select[@id="day"]`);
        this.genderDropdown = page.locator(`//select[@id="gender"]`);
        this.emailTexbox = page.locator(`//div[label[normalize-space(text())="${t.registerpage('email')}"]]//input[@id="registration-form-email"]`);
        this.passwordTextbox = page.locator(`//div[label[normalize-space(text())="${t.registerpage('password')}"]]//input`);
        this.confirmPasswordTextbox = page.locator(`//div[label[normalize-space(text())="${t.registerpage('confirmpassword')}"]]//input`);
        this.getNewsRegisterLabel = page.locator(`//label[span[normalize-space(text())="${t.registerpage('getnewsrequest')}"]]`);
        this.getNewsRegisterCheckbox = page.locator(``);
        this.termsConditionLabel = page.locator(``);
        this.termsConditionCheckboxEn = page.locator(`//label[@for="accept-terms-condition" and normalize-space(.)="Agree to Privacy Policy, User Agreement and Personal Information Collection Statement."]`);
        this.termsConditionCheckboxJp = page.locator(`//label[span[normalize-space(text())="会員限定のメールマガジンに登録し、新商品情報やお得なクーポン、イベント情報などを受け取ります"]]`);
        this.createAccountButton = page.locator(`//button[@type="submit" and normalize-space(text())="${t.registerpage('createaccountbutton')}"]`);
    }

    // =========================
    // 🚀 Actions
    // =========================
    async fillRegisterForm(data?: {
        gender?: string;
        firstname?: string;
        lastname?: string;
        phone?: string;
        day?: string;
        month?: string;
        year?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
        addmaillist?: boolean;
        receivenews?: boolean;
        agreePolicy?: boolean;
    }) {
        const {
            gender = `Mr.`,
            firstname = `fname ${randomAlphaString(4)} ${randomAlphaString(3)}`,
            lastname = `lname ${randomAlphaString(4)} ${randomAlphaString(3)}`,
            phone = `${generateNumberString(8)}`,
            day = `${randomInt(1, 28)}`,
            month = `${randomInt(1, 12)}`,
            year = `${randomInt(1930, 2008)}`,
            email = `globee_test${generateReadableTimeBasedId()}@mailinator.com`,
            password = "Test@123",
            confirmPassword = "Test@123",
            addmaillist = true,
            receivenews = true,
            agreePolicy = true,
        } = data ?? {};

        await step('Fill register form', async () => {
            const titleDropdown = this.page.locator(`//select[@id="registration-form-title"]`)
            const genderDropdown = this.page.locator(`//select[@id="gender"]`)
            const dayDropdown = this.page.locator(`//select[@id="day"]`)
            const monthDropdown = this.page.locator(`//select[@name="month"]`)
            const yearDropdown = this.page.locator(`//select[@id="year"]`)

            const excludedLocales_genderdropdown = ["au"];
            const excludedLocales_addmaillist = ["sg"];
            const excludedLocales_receivenews = ["sg"];

            if (gender != "" && process.env.LOCALE != "jp" && !excludedLocales_genderdropdown.includes(process.env.LOCALE ?? "")) {
                await selectDropdownOption(this.page, titleDropdown, gender)
            } else if (gender != "" && !excludedLocales_genderdropdown.includes(process.env.LOCALE ?? "")) {
                await selectDropdownOption(this.page, genderDropdown, gender)
            }

            await this.type(this.firstNameTextbox, firstname)
            await this.type(this.lastNameTextbox, lastname)
            await this.type(this.phoneNumberTextbox, phone)

            if (day && month && year) {
                await selectDropdownOption(this.page, dayDropdown, day)
                await selectDropdownOption(this.page, monthDropdown, month)
                await selectDropdownOption(this.page, yearDropdown, year)
            }

            await this.type(this.emailTexbox, email)
            await this.type(this.passwordTextbox, password)
            await this.type(this.confirmPasswordTextbox, confirmPassword)

            if (addmaillist && !excludedLocales_addmaillist.includes(process.env.LOCALE ?? "")) {
                await this.clickCheckbox(this.page, t.checkoutpage('newsletter'))
            }

            if (receivenews && !excludedLocales_receivenews.includes(process.env.LOCALE ?? "")) {
                await this.clickCheckbox(this.page, t.checkoutpage('receivenews'))
            }

            if (agreePolicy) {
                await this.clickCheckbox(this.page, t.checkoutpage('terms'))
            }
        })
    }

    // =========================
    // 📦 Helpers
    // =========================
    async isRegisterpageDisplayed(): Promise<boolean> {
        try {
            const title = await this.page.title();
            if (!title.includes(t.registerpage('title'))) {
                return false;
            }

            const currentUrl = await this.page.url();
            let expectedUrl = Config.baseURL + "register";

            if (process.env.LOCALE == "id") {
                expectedUrl = Config.baseURL + "en/register";
            }

            if (!currentUrl.startsWith(expectedUrl)) return false;

            const elementsToCheck = [
                this.pageTitle,
                this.subTitle,
                this.customerDetailsLabel,
                this.lastNameTextbox,
                this.firstNameTextbox,
                this.phoneNumberTextbox,
                this.dateOfBirthLabel,
                this.yearDropdown,
                this.monthDropdown,
                this.dayDropdown,
                this.genderDropdown,
                this.emailTexbox,
                this.passwordTextbox,
                this.confirmPasswordTextbox,
                this.getNewsRegisterLabel,
                this.termsConditionCheckboxJp
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
            console.error('Error checking register page:', error);
            return false;
        }
    }

    // =========================
    // ✅ Assertions
    // =========================

}
