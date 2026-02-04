import { test } from "../../../src/fixtures/test-fixture"
import { screenshotAndAttach, delay, getLocalPhone } from "../../../utils/helpers/helpers";
import { ContactUS } from "../../../src/pages/delivery/contactus/contactus.page";
import { step } from "allure-js-commons";
import { Config } from "../../../config/env.config";

test.describe("Contact Us", async () => {
    test(`
        1. Contact us page is displayed - Contact us form shows all required fields
        2. Submit contact us form - Success message is displayed
        `, async ({ basicAuthPage }) => {

        await step('Go to Contact Us by URL', async () => {
            await basicAuthPage.goto(`${Config.baseURL}contactus`);
        })

        await step('Verify - 1. Contact us page is displayed - Contact us form shows all required fields', async () => {
            const contactUsPage = new ContactUS(basicAuthPage);

            await contactUsPage.assertEqual(await contactUsPage.isContactUsPageDisplayed(), true, "Contact Us page is displayed");
            await screenshotAndAttach(basicAuthPage, './screenshots/ContactUs', '01 - Contact Us page');
        });

        await step('Verify - 2. Submit contact us form - Success message is displayed', async () => {
            const contactUsPage = new ContactUS(basicAuthPage);
            await contactUsPage.fillContactUsForm({ phone: getLocalPhone(true) });
            await contactUsPage.click(contactUsPage.submitButton, "Click on Submit button on Contact Us form");
            await delay(500)

            await contactUsPage.assertVisible(contactUsPage.successMessageLocator, "Success message is displayed after submitting Contact Us form");

            await screenshotAndAttach(basicAuthPage, './screenshots/ContactUs', '02 - Success message');
        });
    });
})