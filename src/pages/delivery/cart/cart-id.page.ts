import { CartPage } from "./cart.page"
import { extractNumber } from "../../../../utils/helpers/helpers"

export class CartPageID extends CartPage {

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

    // =========================
    // ✅ Assertions
    // =========================

}
