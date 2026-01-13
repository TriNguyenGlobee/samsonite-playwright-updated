import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../base.page";
import { t, PageUtils, selectDropdownOption, waitForHasBefore } from "../../../../utils/helpers/helpers";
import { Config } from "../../../../config/env.config";
import { step, attachment } from "allure-js-commons";
import { test } from "@playwright/test";

export class CheckoutPage extends BasePage {
    readonly logoImg: Locator;
    readonly customerDetailsSection: Locator;
    readonly firstNameTextbox: Locator;
    readonly lastNameTextbox: Locator;
    readonly emailTextbox: Locator;
    readonly phoneTextbox: Locator;
    readonly continueButton: Locator;
    readonly shippingSection: Locator;
    readonly postalCodeTxt: Locator;
    readonly address1Txt: Locator;
    readonly unitnumberTxt: Locator;
    readonly shippingContinueBtn: Locator;
    readonly yourDetailsEditBtn: Locator;
    readonly recipientSection: Locator;
    readonly recipientDetailsEditBtn: Locator;
    readonly recipientFirstName: Locator;
    readonly recipientLastName: Locator;
    readonly recipientPhone: Locator;
    readonly recipientContinueBtn: Locator;
    readonly paymentcontinueBtn: Locator;
    readonly paymentEditBtn: Locator;
    readonly visaIcon: Locator;
    readonly masterIcon: Locator;
    readonly paypalIcon: Locator;
    readonly atomeIcon: Locator;
    readonly googlepayIcon: Locator;
    readonly gpaybutton: Locator;
    readonly placeOrderBtn: Locator;
    readonly paypalCheckoutBtn: Locator;
    readonly orderSuccessTitle: Locator;
    readonly cvvModalCVVTextbox: Locator;
    readonly cvvModalSubmitButton: Locator;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.customerDetailsSection = page.locator(`//div[normalize-space(@class)="customer-details-section"]`)
        this.firstNameTextbox = this.customerDetailsSection.locator(`xpath=.//input[@id="billingFirstName"]`)
        this.lastNameTextbox = this.customerDetailsSection.locator(`xpath=.//input[@id="billingLastName"]`)
        this.emailTextbox = this.customerDetailsSection.locator(`xpath=.//input[@id="billingEmail"]`)
        this.phoneTextbox = this.customerDetailsSection.locator(`xpath=.//input[@id="billingPhoneNumber"]`)
        this.continueButton = this.customerDetailsSection.locator(`xpath=.//button[@type="submit"]`)
        this.shippingSection = page.locator(`//div[@class="shipping-section"]//div[@class="single-shipping"]`)
        this.postalCodeTxt = this.shippingSection.locator(`xpath=.//input[@id="shippingZipCode"]`)
        this.address1Txt = this.shippingSection.locator(`xpath=.//input[@id="shippingAddressOne"]`)
        this.unitnumberTxt = this.shippingSection.locator(`xpath=.//input[@id="shippingAddressTwo"]`)
        this.shippingContinueBtn = this.shippingSection.locator(`xpath=.//button[@type="submit"]`)
        this.yourDetailsEditBtn = page.locator(`//div[h4[normalize-space(text())="Your details"]]//span[normalize-space(text())="Edit"]`)
        this.recipientSection = page.locator(`//div[@class="single-shipping"]`)
        this.recipientDetailsEditBtn = this.recipientSection.locator(`xpath=.//div[h4[normalize-space(text())="Recipient Details"]]//span[normalize-space(text())="Edit"]`)
        this.recipientFirstName = this.recipientSection.locator(`xpath=.//input[@id="shippingFirstName"]`)
        this.recipientLastName = this.recipientSection.locator(`xpath=.//input[@id="shippingLastName"]`)
        this.recipientPhone = this.recipientSection.locator(`xpath=.//input[@id="shippingPhoneNumber"]`)
        this.recipientContinueBtn = this.recipientSection.locator(`xpath=.//button[@type="submit"]`)
        this.paymentEditBtn = page.locator(`//div[h4[normalize-space(text())="Payment"]]//span[normalize-space(text())="Edit"]`)
        this.paymentcontinueBtn = page.locator(`//div[@class="card payment-form"]//button[@type="submit"]`)
        this.visaIcon = page.locator(`//li[@data-method-id="CREDIT_CARD" and @data-card-type="Visa"]//a`)
        this.masterIcon = page.locator(`//li[@data-method-id="CREDIT_CARD" and @data-card-type="MasterCard"]//a`)
        this.paypalIcon = page.locator(`//li[@data-method-id="PayPal"]//a`)
        this.atomeIcon = page.locator(`//li[@data-method-id="ATOME_PAYMENT"]//a`)
        this.googlepayIcon = page.locator(`//li[@data-method-id="DW_GOOGLE_PAY"]//a`)
        this.gpaybutton = page.locator(`#gpay-button-online-api-id`)
        this.placeOrderBtn = page.locator('//div[contains(@class,"page-checkout")]//div[contains(@class,"mini-order-summary")]//button[@value="place-order"]');
        this.paypalCheckoutBtn = page.locator(`//div[.//span[normalize-space(text())="Checkout"] and @role="button"]`)
        this.orderSuccessTitle = this.page.locator('//h2[@class="order-thank-you-msg"]');
        this.cvvModalCVVTextbox = page.locator(`//div[label[normalize-space(text())="CVV"] and @class="security-code-input"]//input`)
        this.cvvModalSubmitButton = page.locator(`//button[@id="cvv-code-submit-btn"]`)
    }

    // =========================
    // 🚀 Actions
    // =========================
    async fillCheckoutYourDetailForm(page: Page, data: CheckoutYourDetailLoad, description?: string): Promise<void> {
        await step(description || "Fill checkout detail", async () => {
            if (data.firstName) {
                await this.type(this.firstNameTextbox, data.firstName,
                    `Fill firstname textbox: ${data.firstName}`
                )
            }

            if (data.lastName) {
                await this.type(this.lastNameTextbox, data.lastName,
                    `Fill lastname textbox: ${data.lastName}`
                )
            }

            if (data.email) {
                await this.type(this.emailTextbox, data.email,
                    `Fill email textbox: ${data.email}`
                )
            }

            if (data.phone) {
                await this.type(this.phoneTextbox, data.phone,
                    `Fill phone number textbox: ${data.phone}`
                )
            }

            if (!data.newsletter) {
                await this.clickCheckbox(page, t.checkoutpage('newsletter'),
                    `Need to click ${t.checkoutpage('newsletter')} checkbox: ${data.newsletter}`
                )
            }

            if (data.terms) {
                await this.clickCheckbox(page, t.checkoutpage('terms'),
                    `Need to click ${t.checkoutpage('terms')} checkbox: ${data.terms}`
                )
            }
        })
    }

    async fillRecipientDetilsForm(page: Page, data: RecipientDetails, description?: string): Promise<void> {
        await step(description || "Fill recipient details detail", async () => {
            if (data.postcode) {
                await this.type(this.postalCodeTxt, data.postcode,
                    `Fill postcode textbox: ${data.postcode}`
                )
            }

            if (data.address1) {
                await this.type(this.address1Txt, data.address1,
                    `Fill address textbox: ${data.address1}`
                )
            }

            if (data.unitnumber) {
                await this.type(this.unitnumberTxt, data.unitnumber,
                    `Fill unit number textbox: ${data.unitnumber}`
                )
            }

        })
    }

    async fillVisaPaymentDetails(page: Page, cardNumber: string, cardMonth: string, cardYear: string, cvv: string, description?: string): Promise<void> {
        await step(description || "Fill visa payment details", async () => {
            const cardNumberIframe = this.page.locator('input#cardNumber');
            const cvvIframe = this.page.locator('input#securityCode');

            await this.type(cardNumberIframe, cardNumber, `Fill card number: ${cardNumber}`);
            await this.type(cvvIframe, cvv, `Fill card number: ${cvv}`);

            await selectDropdownOption(page, "select#expirationMonth", cardMonth, "value",
                `Select card expiration month: ${cardMonth}`
            );

            await selectDropdownOption(page, "select#expirationYear", cardYear, "value",
                `Select card expiration year: ${cardYear}`
            );
        })
    }

    // =========================
    // 📦 Helpers
    // =========================
    async isCheckoutPageDisplayed(login: boolean = false): Promise<boolean> {
        await PageUtils.waitForDomAvailable(this.page)
        try {
            const title = await this.page.title();
            const expectedTitle = t.checkoutpage('title')
            const currentUrl = await this.page.url();
            let expectedUrl = Config.baseURL + "checkout?stage=shipping#shipping";

            if (login) {expectedUrl = Config.baseURL + "checkout"}

            await test.step("Checkout page data: ", async () => {
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
                this.firstNameTextbox,
                this.lastNameTextbox,
                this.emailTextbox,
                this.phoneTextbox,
                this.continueButton
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
            console.error('Error checking checkout page:', error);
            return false;
        }
    }

    async isCheckoutStepDone(stepName: string): Promise<boolean> {
        const locator = this.page.locator(
            `//div[@class="step-wrapper" and .//div[normalize-space(text())="${stepName}"]]//i`
        );

        return await waitForHasBefore(locator)
    }

    // =========================
    // ✅ Assertions
    // =========================
    async assertFeedbackMsg(page: Page, label: string, msg: string, description?: string) {
        await step(description || "Assert invalid feedback under fields", async () => {
            const invalid_msg = this.customerDetailsSection.locator(`//label[normalize-space(text())="${label}"]/following-sibling::div[@class="invalid-feedback"]
            |//div[normalize-space(@class)="customer-details-section"]//label[normalize-space(text())="${label}"]/parent::div//div[@class="invalid-feedback"]`)

            await this.assertText(invalid_msg, msg, `Invalid feedback under ${label} field should be: ${msg}`)
        })
    }

}

export type CheckoutYourDetailLoad = {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    newsletter?: boolean;
    terms?: boolean;
};

export type RecipientDetails = {
    postcode?: string;
    address1?: string;
    unitnumber?: string;
}
