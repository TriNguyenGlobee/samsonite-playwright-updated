import { test } from "../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { GlobalNavFooterPage } from "../../../src/pages/delivery/home/global-nav-footer.page";
import { scrollToBottom, t, screenshotAndAttach } from "../../../utils/helpers/helpers";
import { createLoginPage } from "../../../src/factories/login.factory";
import { Config } from "../../../config/env.config";

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

        await step("Verify Delivery & Shipping link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('deliveryandshipping')),
                t.globalnavfooter('deliveryandshippingURL'),
                "Assert navigated URL when clicking Delivery & Shipping link", "middle"
            )
        })

        await step("Verify Returns & Exchanges link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("Returns & Exchanges"),
                t.globalnavfooter('returnsandexchangesURL'),
                "Assert navigated URL when clicking Returns & Exchanges link", "middle"
            )
        })

        await step("Verify Warranty link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('warranty')), t.globalnavfooter('warrantyURL'),
                "Assert navigated URL when clicking Warranty link", "middle"
            )
        })

        await step("Verify Contact Us link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('contactus')),
                t.globalnavfooter('contactusURL'),
                "Assert navigated URL when clicking Contact Us link", "middle"
            )
        })

        await step("Verify Fake Website Alert link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('fakewebsitealert')),
                t.globalnavfooter('fakewebsitealertURL'),
                "Assert navigated URL when clicking Fake Website Alert link", "middle"
            )
        })
    })

    test("3. Our Company links groups", async ({ basicAuthPage }) => {
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)

        await step("Verify About Samsonite link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('aboutsamsonite')),
                t.globalnavfooter('aboutsamsoniteURL'),
                "Assert navigated URL when clicking About Samsonite link", "middle"
            )
        })

        await step("Verify Careers link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('careers')),
                t.globalnavfooter('careersURL'),
                "Assert navigated URL when clicking Careers link", "middle"
            )
        })

        await step("Verify Investor Relations link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('investorrelations')),
                t.globalnavfooter('investorrelationsURL'),
                "Assert navigated URL when clicking Investor Relations link", "middle"
            )
        })

        await step("Verify Store and Service Centre Locator link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('store&services')),
                t.globalnavfooter('store&serviceURL'),
                "Assert navigated URL when clicking Store and Service Centre Locator link", "middle"
            )
        })

        await step("Verify Sustainability link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('sustainability')),
                t.globalnavfooter('sustainabilityURL'),
                "Assert navigated URL when clicking Sustainability link", "middle"
            )
        })
    })

    test("4. Account links groups", async ({ basicAuthPage }) => {
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)
        const loginpage = createLoginPage(basicAuthPage)

        await step("Login with valid account", async () => {
            await globalnavfooterpage.goToLoginRegisterPage()
            await loginpage.login(Config.credentials.username, Config.credentials.password)
        })

        await step("Verify Track Order link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('trackorder')),
                t.globalnavfooter('trackorderURL'),
                "Assert navigated URL when clicking Track Order link", "middle"
            )
        })

        await step("Verify Friends of Samsonite link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("Friends of Samsonite"),
                t.globalnavfooter('friendsofsamsoniteURL'),
                "Assert navigated URL when clicking Friends of Samsonite link", "middle"
            )
        })

        await step("Verify Sign In link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('signin')),
                t.globalnavfooter('accountURL'),
                "Assert navigated URL when clicking Sign In link", "middle"
            )
        })
    })

    test("5. Bottom navigation links", async ({ basicAuthPage }) => {
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)

        await step("Verify sitemap link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('sitemap')),
                t.globalnavfooter('sitemapURL'),
                "Assert navigated URL when clicking sitemap link", "middle"
            )
        })

        await step("Verify User agreement link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('useragreement')),
                t.globalnavfooter('useragreementURL'),
                "Assert navigated URL when clicking User agreement link", "middle"
            )
        })

        await step("Verify Privacy link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('privacy')),
                t.globalnavfooter('privacyURL'),
                "Assert navigated URL when clicking Privacy link", "middle"
            )
        })

        await step("Verify Personal Information Collection Statement link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('personalinformationcollectionstatement')),
                t.globalnavfooter('personalinformationcollectionstatementURL'),
                "Assert navigated URL when clicking Personal Information Collection Statement link", "middle"
            )
        })
    })
})