import { test } from "../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { GlobalNavFooterPage } from "../../../src/pages/delivery/home/global-nav-footer.page";
import { scrollToBottom, t, screenshotAndAttach } from "../../../utils/helpers/helpers";
import { createLoginPage } from "../../../src/factories/login.factory";
import { Config } from "../../../config/env.config";
import { loadTestData } from "../../../utils/data";

test.describe("Footer links Groups", async () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        await scrollToBottom(basicAuthPage)
    });

    test(`
        1. Verify that the global nav footer section shows correctly
        2. Check if URLs of the items under the section "Support / FAQS" are correct and those page can be accessed
        3. Check if URLs of the items under the section "Our Company" are correct and those page can be accessed
        4. Check if URLs of the items under the section "Account" are correct and those page can be accessed
        5. Check if URLs of the Bottom navigation are correct and those page can be accessed
        `, async ({ basicAuthPage }) => {
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)
        const now = new Date
        const currentYear = now.getFullYear()
        const copyrightContent = `Copyright © ${currentYear} Samsonite IP Holdings S.àr.l. All rights reserved.`
        const { supportLinksGroups } = loadTestData();
        const { ourCompanyLinksGroups } = loadTestData();
        const loginpage = createLoginPage(basicAuthPage)
        const { accountLinksGroups } = loadTestData();
        const { bottomLinksGroups } = loadTestData();

        await step("[STEP] Verify - 1. Verify that Global nav Footer shows correctly", async () => {
            await step ("[ChSTEP] Support link groups displayed", async () => {
                await globalnavfooterpage.assertVisible(globalnavfooterpage.supportLinksGroups,"Assert Support link groups displayed")
            });

            await step("[ChSTEP] Our company link groups displayed", async () => {
                await globalnavfooterpage.assertVisible(globalnavfooterpage.ourcompanyLinksGroups, "Assert Our company link groups displayed")
            });
           
            await step("[ChSTEP] Account link groups displayed", async () => {
                await globalnavfooterpage.assertVisible(globalnavfooterpage.accountLinksGroups,"Assert Account link groups displayed")
            });

            await step("[ChSTEP] Follow link groups displayed", async () => {
                await globalnavfooterpage.assertVisible(globalnavfooterpage.followusLinksGroups,"Assert Follow link groups displayed")
            });
            
            await step("[ChSTEP] Verify copyright content and current year", async () => {
                await globalnavfooterpage.assertText(globalnavfooterpage.copyright, copyrightContent,"Assert copyright content and current year")
            });

            await step("[ChSTEP] Screenshot footer section", async () => {
                await screenshotAndAttach(basicAuthPage, './screenshots/Footer', '01 - Footer')
            })
        })

        await step("[STEP] Verify - 2. Click on each items under the section 'Support / FAQS' section and check the URL that redirects you to", async () => {
            await globalnavfooterpage.assertFooterLinksGroups({
                page: basicAuthPage,
                links: supportLinksGroups
            })
        })

        await step("[STEP] Verify - 3. Click on each items under the section 'Our Company' section and check the URL that redirects you to.", async () => {
            await globalnavfooterpage.assertFooterLinksGroups({
                page: basicAuthPage,
                links: ourCompanyLinksGroups
            })
        })

        await step("Login with valid account", async () => {
            await globalnavfooterpage.goToLoginRegisterPage()
            await loginpage.login(Config.credentials.username, Config.credentials.password)
        })

        await step("[STEP] Verify - 4. Click on each items under the section 'Account' section and check the URL that redirects you to.", async () => {
            await globalnavfooterpage.assertFooterLinksGroups({
                page: basicAuthPage,
                links: accountLinksGroups
            })
        })

        await step("[STEP] Verify - 5. Click on each items of the Bottom navigation section and check the URL that redirects you to.", async () => {
            await globalnavfooterpage.assertFooterLinksGroups({
                page: basicAuthPage,
                links: bottomLinksGroups
            })
        })
    })

    test.afterEach(async ({ basicAuthPage }) => {
        await step('[STEP] [FINAL STATE]', async () => {
            await screenshotAndAttach(basicAuthPage, './screenshots/Footer', 'Final State');
        });
    });
})