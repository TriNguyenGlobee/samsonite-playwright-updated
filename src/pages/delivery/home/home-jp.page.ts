import { t } from "../../../../utils/helpers/helpers";
import { HomePage } from "./home.page";
import { attachment } from "allure-js-commons";
import { test } from "@playwright/test";

export class HomePageJP extends HomePage {
    // =========================
    // 🚀 Actions
    // =========================

    // =========================
    // 📦 Helpers
    // =========================

    // =========================
    // ✅ Assertions
    // =========================
    async assertWhyShopWithUsContent(): Promise<void> {
        await test.step("why shop with us section data: ", async () => {
            await attachment("Official website", t.whyshopwithus('officialwebsite'), "text/plain");
            await attachment("Security shopping", t.whyshopwithus('securityShop'), "text/plain");
            await attachment("Gift", t.whyshopwithus('gift'), "text/plain");
            await attachment("Warranty", t.whyshopwithus('warranty'), "text/plain");
        });

        await this.assertLocatorInside(this.withUsOfficalSite, {
            hasImage: true,
            text: `${t.whyshopwithus('officialwebsite')}`
        })

        await this.assertLocatorInside(this.withUsSafeShopping, {
            hasImage: true,
            text: `${t.whyshopwithus('securityShop')}`
        })

        await this.assertLocatorInside(this.withUsGift, {
            hasImage: true,
            text: `${t.whyshopwithus('gift')}`
        })

        await this.assertLocatorInside(this.withUsWarranty, {
            hasImage: true,
            text: `${t.whyshopwithus('warranty')}`
        })
    }
}