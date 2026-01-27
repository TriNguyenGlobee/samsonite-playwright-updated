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
        1. All links groups are displayed - Footer logo is displayed - Copyright and current year correct
        `, async ({ basicAuthPage }) => {
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)
        const now = new Date
        const currentYear = now.getFullYear()
        const copyrightContent = `Copyright © ${currentYear} Samsonite IP Holdings S.àr.l. All rights reserved.`

        await step("Verify that links groups are displayed", async () => {
            await globalnavfooterpage.assertVisible(globalnavfooterpage.supportLinksGroups,
                "Assert Support link groups displayed"
            )

            await globalnavfooterpage.assertVisible(globalnavfooterpage.ourcompanyLinksGroups,
                "Assert Our company link groups displayed"
            )

            await globalnavfooterpage.assertVisible(globalnavfooterpage.accountLinksGroups,
                "Assert Account link groups displayed"
            )

            await globalnavfooterpage.assertVisible(globalnavfooterpage.followusLinksGroups,
                "Assert Follow link groups displayed"
            )
        })

        await step("Verify that footer logo is displayed", async () => {
            await globalnavfooterpage.assertVisible(globalnavfooterpage.footerLogo)
        })

        await step("Verify copyright content", async () => {
            await globalnavfooterpage.assertText(globalnavfooterpage.copyright, copyrightContent,
                "Assert copyright content and current year"
            )
        })

        await step("Screenshot footer section", async () => {
            await screenshotAndAttach(basicAuthPage, './screenshots/Footer', '01 - Footer')
        })
    })

    test("2. Support links groups", async ({ basicAuthPage }) => {
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)
        const { supportLinksGroups } = loadTestData();

        await step("Verify Support Links Groups", async () => {
            await globalnavfooterpage.assertFooterLinksGroups({
                page: basicAuthPage,
                links: supportLinksGroups
            })
        })
    })

    test("3. Our Company links groups", async ({ basicAuthPage }) => {
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)
        const { ourCompanyLinksGroups } = loadTestData();

        await step("Verify Our Company Links Groups", async () => {
            await globalnavfooterpage.assertFooterLinksGroups({
                page: basicAuthPage,
                links: ourCompanyLinksGroups
            })
        })
    })

    test("4. Account links groups", async ({ basicAuthPage }) => {
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)
        const loginpage = createLoginPage(basicAuthPage)
        const { accountLinksGroups } = loadTestData();

        await step("Login with valid account", async () => {
            await globalnavfooterpage.goToLoginRegisterPage()
            await loginpage.login(Config.credentials.username, Config.credentials.password)
        })

        await step("Verify Account Links Groups", async () => {
            await globalnavfooterpage.assertFooterLinksGroups({
                page: basicAuthPage,
                links: accountLinksGroups
            })
        })
    })

    test("5. Bottom navigation links", async ({ basicAuthPage }) => {
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)
        const { bottomLinksGroups } = loadTestData();

        await step("Verify Bottom Links Groups", async () => {
            await globalnavfooterpage.assertFooterLinksGroups({
                page: basicAuthPage,
                links: bottomLinksGroups
            })
        })
    })
})