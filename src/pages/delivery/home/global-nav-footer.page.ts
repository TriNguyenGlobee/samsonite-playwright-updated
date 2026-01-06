import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../base.page";
import { t } from "../../../../utils/helpers/helpers";
import { Config } from "../../../../config/env.config";
import { attachment, step } from "allure-js-commons";

export class GlobalNavFooterPage extends BasePage {
    readonly navFooter: Locator;
    readonly emailTextbox: Locator;
    readonly subscribeButton: Locator;
    readonly invalidFeedback: Locator;
    readonly subscribeMsg: Locator;
    readonly supportLinksGroups: Locator;
    readonly ourcompanyLinksGroups: Locator;
    readonly accountLinksGroups: Locator;
    readonly followusLinksGroups: Locator;
    readonly copyright: Locator;

    constructor(page: Page) {
        super(page);
        this.navFooter = page.locator('//footer[@id="footer"]');
        this.emailTextbox = this.navFooter.locator('xpath=.//input[@id="newsletter_email"]')
        this.subscribeButton = this.navFooter.locator(`xpath=.//button[@type="submit"]`)
        this.invalidFeedback = this.navFooter.locator(`xpath=.//div[@class="invalid-feedback"]`)
        this.subscribeMsg = this.navFooter.locator(`xpath=.//div[contains(@class,"subscribe-msg")]`)
        this.supportLinksGroups = this.navFooter.locator(`xpath=.//div[@class="content-asset" and .//h5]//div[normalize-space(text())="${t.globalnavfooter('support')}"]`)
        this.ourcompanyLinksGroups = this.navFooter.locator(`xpath=.//div[@class="content-asset" and .//h5]//div[normalize-space(text())="${t.globalnavfooter('ourcompany')}"]`)
        this.accountLinksGroups = this.navFooter.locator(`xpath=.//div[@class="content-asset" and .//h5]//div[normalize-space(text())="${t.globalnavfooter('account')}"]`)
        this.followusLinksGroups = this.navFooter.locator(`xpath=.//div[@class="col-12 col-sm-7 row"]//div[contains(@class,"col-12 col-sm-3")]//div[@class="content-asset" and .//h5]//div[normalize-space(text())="${t.globalnavfooter('followus')}"]|//div[@class="col-12 col-sm-7 row"]//div[@class="content-asset" and .//h5]//div[normalize-space(text())="${t.globalnavfooter('followus')}"]`)
        this.copyright = this.navFooter.locator(`xpath=.//div[@class="footer-copyright"]`)
    }

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================
    async isMembershipPageDisplayed(): Promise<boolean> {
        try {
            const title = await this.page.title();
            if (!title.includes(t.membershippage('title'))) {
                return false;
            }

            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "MembershipPrivilegePage.html";
            if (!currentUrl.startsWith(expectedUrl)) return false;

            return true;
        } catch (error) {
            console.error('Error checking membership page:', error);
            return false;
        }
    }

    async getLinksGroupsLocatorByLabel(label: string | string []): Promise<Locator> {
        const selectedLocator = this.page.locator(`//footer//li[.//a[normalize-space(text())="${label}"] or .//a//span[normalize-space(text())="${label}"]]`)
        return selectedLocator
    }

    // =========================
    // ✅ Assertions
    // =========================

}
