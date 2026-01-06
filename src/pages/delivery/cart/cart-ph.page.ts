import { CartPage } from "./cart.page"
import { extractNumber } from "../../../../utils/helpers/helpers"

export class CartPagePH extends CartPage {

    // =========================
    // 🚀 Actions
    // =========================

    // =========================
    // 📦 Helpers
    // =========================
    async getShippingDiscount(): Promise<string> {
        const shippingDiscount_1 = this.page.locator(`//div[contains(@class,"cart-page")]//div[@data-shipping-id="standard"]`)
        let shippingDiscount_1_num: number

        shippingDiscount_1_num = await extractNumber((await shippingDiscount_1.innerText()).trim())

        console.log(`shippingDiscount_1_num: ${shippingDiscount_1_num}`)

        return (shippingDiscount_1_num).toString()
    }

    // =========================
    // ✅ Assertions
    // =========================

}
