import { test } from "../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { GlobalNavFooterPage } from "../../../src/pages/delivery/home/global-nav-footer.page";
import { steps } from "../../../utils/helpers/localeStep";
import { scrollToBottom, t, generateReadableTimeBasedId, PageUtils } from "../../../utils/helpers/helpers";
import { createLoginPage } from "../../../src/factories/login.factory";
import { Config } from "../../../config/env.config";

test.describe("Newsletter", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)

        await scrollToBottom(basicAuthPage)
        await globalnavfooterpage.footerLogo.scrollIntoViewIfNeeded()
    });

    test("1. Mailing list section displayed", async ({ basicAuthPage }) => {
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)
        const emailtxt_Placeholder = t.globalnavfooter('placeholder')

        await step("Verify that Join our mailing list section is displayed", async () => {

            await globalnavfooterpage.assertVisible(globalnavfooterpage.emailTextbox,
                "Assert the Join our mailing list: email textbox displayed"
            )

            await globalnavfooterpage.assertVisible(globalnavfooterpage.subscribeButton,
                "Assert the Join our mailing list: subcribe button displayed"
            )

            await globalnavfooterpage.assertAttributeValue(globalnavfooterpage.emailTextbox, "placeholder", emailtxt_Placeholder,
                "Assert the Join our mailing list: placeholder text"
            )
        })
    })

    test("2. Submit button without email address", async ({ basicAuthPage }) => {
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)
        const invalid_Feedback = t.globalnavfooter('completethisfield')

        await step("Clicking on the subscribe button", async () => {
            await globalnavfooterpage.click(globalnavfooterpage.subscribeButton)
        })

        await step("Verify invalid-feedback", async () => {
            await globalnavfooterpage.assertText(globalnavfooterpage.invalidFeedback, invalid_Feedback,
                "Assert invalid-feedback: please complete this field"
            )
        })
    })

    test("3. Submit button with invalid-email address", async ({ basicAuthPage }) => {
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)
        const invalid_Email = "globeetest_invalidemail"
        const invalid_Feedback = t.globalnavfooter('invalidemail')

        await step("Enter the invalid-email into the email textbox", async () => {
            await globalnavfooterpage.type(globalnavfooterpage.emailTextbox, invalid_Email)
        })

        await step("Clicking on the subscribe button", async () => {
            await globalnavfooterpage.click(globalnavfooterpage.subscribeButton)
        })

        await step("Verify invalid-feedback", async () => {
            await globalnavfooterpage.assertText(globalnavfooterpage.invalidFeedback, invalid_Feedback,
                "Assert invalid-feedback: Please enter the valid email"
            )
        })
    })

    test(`
        4. Account created success
        5. Duplicate subscription handling
        `, async ({ basicAuthPage }) => {
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)
        const email_suffix = generateReadableTimeBasedId()
        const valid_email = "gloobeauto_" + email_suffix + "@mailinator.com"
        const subscribeMsg = t.globalnavfooter('createsuccess')
        const accountexistMsg = t.globalnavfooter('duplicateemail')
        const createdmsg = basicAuthPage.locator(`//footer[@id="footer"]//div[contains(@class,"subscribe-msg accountcreated")]`)
        const emailexistmsg = basicAuthPage.locator(`//footer[@id="footer"]//div[contains(@class,"subscribe-msg accountexists")]`)

        await step("Enter the invalid-email into the email textbox", async () => {
            await globalnavfooterpage.type(globalnavfooterpage.emailTextbox, valid_email)
        })

        await step("Clicking on the subscribe button", async () => {
            await globalnavfooterpage.click(globalnavfooterpage.subscribeButton, 
                "Clicking on Subscribe button"
            )
            await globalnavfooterpage.assertHidden(globalnavfooterpage.underlay, 
                "Waiting for underlay screen hidden"
            )
        })

        await step("Verify subscribe msg: regist success", async () => {
            await globalnavfooterpage.assertText(createdmsg, subscribeMsg,
                "Assert invalid-feedback: Account created success"
            )
        })  

        await step("Clicking on the subscribe button again", async () => {
            await globalnavfooterpage.click(globalnavfooterpage.subscribeButton,
                "Clicking on Subscribe button"
            )
            await globalnavfooterpage.assertHidden(globalnavfooterpage.underlay,
                "Waiting for underlay screen hidden"
            )
        })

        await step("Verify subscribe msg: duplicate email", async () => {
            await globalnavfooterpage.assertText(emailexistmsg, accountexistMsg,
                "Assert invalid-feedback: Account exists"
            )
        })
    })
});

test.describe("Footer links Groups", async () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        await scrollToBottom(basicAuthPage)
    });

    test(`
        1. All links groups are displayed
        2. Verify that footer logo is displayed
        3. Copyright and current year
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
    })

    test("4. Support links groups", async ({ basicAuthPage }) => {
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)

        await steps(["sg", "tw", "my", "id"], "Verify that Delivery & Shipping link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('deliveryandshipping')),
                t.globalnavfooter('deliveryandshippingURL'),
                "Assert navigated URL when clicking Delivery & Shipping link", "middle"
            )
        })

        await steps(["sg", "my", "id"], "Verify that Returns & Exchanges link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("Returns & Exchanges"),
                t.globalnavfooter('returnsandexchangesURL'),
                "Assert navigated URL when clicking Returns & Exchanges link", "middle"
            )
        })

        await steps(["jp", "sg", "my", "id"], "Verify that Warranty link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('warranty')), t.globalnavfooter('warrantyURL'),
                "Assert navigated URL when clicking Warranty link", "middle"
            )
        })

        await steps(["sg", "tw", "my", "id"], "Verify that Contact Us link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('contactus')),
                t.globalnavfooter('contactusURL'),
                "Assert navigated URL when clicking Contact Us link", "middle"
            )
        })

        await steps(["sg", "tw", "my", "id"], "Verify that Fake Website Alert link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('fakewebsitealert')),
                t.globalnavfooter('fakewebsitealertURL'),
                "Assert navigated URL when clicking Fake Website Alert link", "middle"
            )
        })

        await steps(["jp"], "Verify that Repair link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("修理について"),
                t.globalnavfooter('repairURL'),
                "Assert navigated URL when clicking Repair link", "middle"
            )
        })

        await steps(["jp", "tw"], "Verify that Wecare service link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('WECARE')),
                t.globalnavfooter('WECAREについてURL'),
                "Assert navigated URL when clicking Wecare service link", "middle"
            )
        })

        await steps(["jp", "tw"], "Verify that FAQ link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('faq')),
                t.globalnavfooter('faqURL'),
                "Assert navigated URL when clicking FAQ link", "middle"
            )
        })

        await steps(["jp"], "Verify that FAQ Member link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("メンバープログラムについてのFAQ"),
                t.globalnavfooter('faqmemberURL'),
                "Assert navigated URL when clicking FAQ Member link", "middle"
            )
        })

        await steps(["jp", "tw", "id"], "Verify that TSA link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('tsa')),
                t.globalnavfooter('tsaURL'),
                "Assert navigated URL when clicking TSA link", "middle"
            )
        })

        await steps(["jp"], "Verify that Trackorder link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("注文状況を確認する"),
                t.globalnavfooter('trackorderURL'),
                "Assert navigated URL when clicking Trackorder link", "middle"
            )
        })

        await steps(["jp"], "Verify that inquiries link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("お問い合わせ"),
                t.globalnavfooter('inquiriesURL'),
                "Assert navigated URL when clicking inquiries link", "middle"
            )
        })

        await steps(["tw"], "Verify that Clean Your Luggage link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("行李箱保養須知"),
                t.globalnavfooter('cleanLuggageURL'),
                "Assert navigated URL when clicking Clean Your Luggage link", "middle"
            )
        })
    })

    test("5. Our Company links groups", async ({ basicAuthPage }) => {
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)

        await steps(["sg", "jp", "tw", "my", "id"], "Verify that About Samsonite link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('aboutsamsonite')),
                t.globalnavfooter('aboutsamsoniteURL'),
                "Assert navigated URL when clicking About Samsonite link", "middle"
            )
        })

        await steps(["sg", "jp", "tw", "my"], "Verify that Careers link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('careers')),
                t.globalnavfooter('careersURL'),
                "Assert navigated URL when clicking Careers link", "middle"
            )
        })

        await steps(["sg", "tw", "my", "id"], "Verify that Investor Relations link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('investorrelations')),
                t.globalnavfooter('investorrelationsURL'),
                "Assert navigated URL when clicking Investor Relations link", "middle"
            )
        })

        await steps(["sg", "jp"], "Verify that Store and Service Centre Locator link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('store&services')),
                t.globalnavfooter('store&serviceURL'),
                "Assert navigated URL when clicking Store and Service Centre Locator link", "middle"
            )
        })

        await steps(["sg", "jp", "tw", "my", "id"], "Verify that Sustainability link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('sustainability')),
                t.globalnavfooter('sustainabilityURL'),
                "Assert navigated URL when clicking Sustainability link", "middle"
            )
        })

        await steps(["jp"], "Verify that Company profile link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("会社概要"),
                t.globalnavfooter('companyURL'),
                "Assert navigated URL when clicking Company profile link", "middle"
            )
        })

        await steps(["jp"], "Verify that about Hartmann link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("ハートマンブランドストーリー"),
                t.globalnavfooter('abouthartmannURL'),
                "Assert navigated URL when clicking about Hartmann link", "middle"
            )
        })

        await steps(["jp"], "Verify that News link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("ニュース"),
                t.globalnavfooter('newsURL'),
                "Assert navigated URL when clicking News", "middle"
            )
        })

        await steps(["jp"], "Verify that recruit info link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("採用情報"),
                t.globalnavfooter('recruitinfoURL'),
                "Assert navigated URL when clicking recruit info link", "middle"
            )
        })

        await steps(["jp"], "Verify that Corporate customers link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("法人のお客様"),
                t.globalnavfooter('corporatecustomersURL'),
                "Assert navigated URL when clicking Corporate customers link", "middle"
            )
        })

        await steps(["tw"], "Verify that Sales outlets link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('salesoutlets')),
                t.globalnavfooter('salesoutletsURL'),
                "Assert navigated URL when clicking Sales outlets link", "middle"
            )
        })
    })

    test("6. Account links groups", async ({ basicAuthPage }) => {
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)
        const loginpage = createLoginPage(basicAuthPage)

        await step("Login with valid account", async () => {
            await globalnavfooterpage.goToLoginRegisterPage()
            await loginpage.login(Config.credentials.username, Config.credentials.password)
        })

        await steps(["sg", "tw", "my", "id"], "Verify that Track Order link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('trackorder')),
                t.globalnavfooter('trackorderURL'),
                "Assert navigated URL when clicking Track Order link", "middle"
            )
        })

        await steps(["sg"], "Verify that Friends of Samsonite link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("Friends of Samsonite"),
                t.globalnavfooter('friendsofsamsoniteURL'),
                "Assert navigated URL when clicking Friends of Samsonite link", "middle"
            )
        })

        await steps(["jp"], "Verify that Cart link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("カート"),
                t.globalnavfooter('cartURL'),
                "Assert navigated URL when clicking Cart link", "middle"
            )
        })

        await steps(["jp"], "Verify that Order History link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("注文履歴"),
                t.globalnavfooter('ordershistoryURL'),
                "Assert navigated URL when clicking Order History link", "middle"
            )
        })

        await steps(["jp"], "Verify that Refer a friend link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("お友達紹介"),
                t.globalnavfooter('referralshowURL'),
                "Assert navigated URL when clicking Refer a friend link", "middle"
            )
        })

        await steps(["jp"], "Verify that Membership link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("メンバーシップ特典"),
                t.globalnavfooter('membershipURL'),
                "Assert navigated URL when clicking Membership link", "middle"
            )
        })

        await steps(["sg", "jp", "tw", "id"], "Verify that Sign In link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('signin')),
                t.globalnavfooter('accountURL'),
                "Assert navigated URL when clicking Sign In link", "middle"
            )
        })
    })

    test("7. Bottom navigation links", async ({ basicAuthPage }) => {
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)

        await steps(["sg", "jp", "tw", "my", "id"], "Verify sitemap link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('sitemap')),
                t.globalnavfooter('sitemapURL'),
                "Assert navigated URL when clicking sitemap link", "middle"
            )
        })

        await steps(["sg", "jp", "tw", "my", "id"], "Verify User agreement link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('useragreement')),
                t.globalnavfooter('useragreementURL'),
                "Assert navigated URL when clicking User agreement link", "middle"
            )
        })

        await steps(["sg", "jp", "tw", "my", "id"], "Verify Privacy link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('privacy')),
                t.globalnavfooter('privacyURL'),
                "Assert navigated URL when clicking Privacy link", "middle"
            )
        })

        await steps(["sg", "tw", "my", "id"], "Verify Personal Information Collection Statement link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel(t.globalnavfooter('personalinformationcollectionstatement')),
                t.globalnavfooter('personalinformationcollectionstatementURL'),
                "Assert navigated URL when clicking Personal Information Collection Statement link", "middle"
            )
        })

        await steps(["jp"], "Verify Applicablelaw link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("特定商取引法に基づく表記"),
                t.globalnavfooter('applicablelawURL'),
                "Assert navigated URL when clicking Applicablelaw link", "middle"
            )
        })
    })
})