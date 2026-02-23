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

        await step('[STEP] Go to Contact Us by URL', async () => {
            await basicAuthPage.goto(`${Config.baseURL}contactus`);
        })

        await step('[STEP] Verify - 1. Contact us page is displayed - Contact us form shows all required fields', async () => {
            const contactUsPage = new ContactUS(basicAuthPage);

            await contactUsPage.assertEqual(await contactUsPage.isContactUsPageDisplayed(), true, "Contact Us page is displayed");
            await screenshotAndAttach(basicAuthPage, './screenshots/ContactUs', '01 - Contact Us page');
        });

        await step('[STEP] Verify - 2. Submit contact us form - Success message is displayed', async () => {
            const contactUsPage = new ContactUS(basicAuthPage);
           
            await step ("[ChSTEP] Fill Contact Us form", async () => {
                await contactUsPage.fillContactUsForm({ phone: getLocalPhone(true) }, "Fill Contact Us form");
            });
           
            await step ("[ChSTEP] Click on Submit button on Contact Us form", async () => {
                await contactUsPage.click(contactUsPage.submitButton, "Click on Submit button on Contact Us form");
            });
           
            await delay(500)

            await step ("[ChSTEP] Success message is displayed after submitting Contact Us form", async () => {
                await contactUsPage.assertVisible(contactUsPage.successMessageLocator, "Success message is displayed after submitting Contact Us form");
                await screenshotAndAttach(basicAuthPage, './screenshots/ContactUs', '02 - Success message');
            });
        });
    });

    test.afterEach(async ({ basicAuthPage }) => {
        await step('[STEP] [FINAL STATE]', async () => {
            await screenshotAndAttach(basicAuthPage, './screenshots/ContactUs', 'Final State');
        });
    });
})