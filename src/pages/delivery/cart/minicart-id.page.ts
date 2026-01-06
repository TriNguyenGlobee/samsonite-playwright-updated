import { MinicartPage } from "./minicart.page"
import { extractNumber } from "../../../../utils/helpers/helpers"

export class MinicartPageID extends MinicartPage {

    // =========================
    // 🚀 Actions
    // =========================

    // =========================
    // 📦 Helpers
    // =========================

    async getShippingDiscount(): Promise<string> { return "0" }

    async getPromotionDiscount(): Promise<string> {
        const shipping = this.page.locator(`.applied-promotion-discount`)

        return (await shipping.first().innerText()).trim()
    }

    async getAmountFooterCategoryItems(): Promise<number> {return 4}
    
    // =========================
    // ✅ Assertions
    // =========================

}
