import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../base.page";
import {
    t, generateNumberString, generateReadableTimeBasedId, randomAlphaString,
    getLocalPhone,
    PageUtils,
    delay
} from "../../../../utils/helpers/helpers";
import { Config } from "../../../../config/env.config";
import { step, attachment } from "allure-js-commons";
import { test } from "@playwright/test";

export class MyAddressBookPage extends BasePage {
    readonly logoImg: Locator;
    readonly addressBookRows: Locator;
    readonly editAddressBtn: Locator;
    readonly removeAddressBtn: Locator;
    readonly addnewAddressBtn: Locator;

    readonly firstNameTextbox = this.page.locator('#firstName');
    readonly lastNameTextbox = this.page.locator('#lastName');
    readonly phoneTextbox = this.page.locator('#registration-form-phone');
    readonly postalCodeTextbox = this.page.locator('#customer-postal-code');
    readonly address1Textbox = this.page.locator('//div[label[normalize-space(text())="Address 1"]]//input');
    readonly setDefaultAddressCheckbox = this.page.locator('label[for="set-default-address"]');
    readonly addAddressButton = this.page.locator(`//button[normalize-space(text())="Add address"]`)
    readonly confirmDeleteAddress = this.page.locator(`//h4[text()="Delete Address?"]/ancestor::div[@class="modal-content"]//button[normalize-space(text())="Yes"]`)

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.addressBookRows = page.locator('//div[contains(@class,"list-address")]//div[@class="card"]');
        this.editAddressBtn = page.locator('//span[@class="pull-right"]');
        this.removeAddressBtn = page.locator('.remove-btn i');
        this.addnewAddressBtn = page.locator('//a[normalize-space(text())="Add New"]');
    }

    // =========================
    // 🚀 Actions
    // =========================
    async fillAddAddressBookDetail(data?: {
        firstName?: string;
        lastName?: string;
        phone?: string;
        postalCode?: string;
        address1?: string;
        setAsDefault?: boolean;
    }): Promise<void> {

        const {
            firstName = `fname ${randomAlphaString(4)} ${randomAlphaString(3)}`,
            lastName = `lname ${randomAlphaString(4)} ${randomAlphaString(3)}`,
            phone = `${getLocalPhone()}`,
            postalCode = `${generateNumberString(5)}`,
            address1 = `Address ${randomAlphaString(6)} ${randomAlphaString(4)}`,
            setAsDefault = false
        } = data ?? {};

        await step('Fill add address book detail form', async () => {

            await this.type(this.firstNameTextbox, firstName);
            await this.type(this.lastNameTextbox, lastName);
            await this.type(this.phoneTextbox, phone);
            await this.type(this.postalCodeTextbox, postalCode);
            await this.type(this.address1Textbox, address1);

            if (setAsDefault) {
                await this.setDefaultAddressCheckbox.click();
            }
        });
    }

    async removeAddress(index: number) {
        await step("Remove an address book", async () => {
            this.jsClick(this.removeAddressBtn.nth(index -1), "Click remove button")

            await this.waitFor(this.confirmDeleteAddress)
            this.click(this.confirmDeleteAddress, "Click confirm delete address button")
            
            await delay(1000)
        })
    }

    // =========================
    // 📦 Helpers
    // =========================

    // =========================
    // ✅ Assertions
    // =========================
    async isMyAddressBookPageDisplayed(): Promise<boolean> {
        try {
            const title = await this.page.title();
            const currentUrl = this.page.url();
            let expectedUrl = `${Config.baseURL}addressbook`;

            if (process.env.LOCALE === 'id') {
                expectedUrl = `${Config.baseURL}en/addressbook`;
            }

            await test.step("My Address Book page data: ", async () => {
                await attachment("Current Page Title", title, "text/plain");
                await attachment("Expected Page Title", t.myaddressbook('title'), "text/plain");
                await attachment("Current URL", currentUrl, "text/plain");
                await attachment("Expected URL", expectedUrl, "text/plain");
            });

            if (!title.includes(t.myaddressbook('title'))) {
                return false;
            }

            if (!currentUrl.startsWith(expectedUrl)) {
                return false;
            }

            const elementsToCheck = [
                this.addressBookRows.first(),
                this.editAddressBtn.first(),
                this.removeAddressBtn.first(),
                this.addnewAddressBtn
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
            console.error('Error checking My Address Book page display:', error);
            return false;
        }
    }

}