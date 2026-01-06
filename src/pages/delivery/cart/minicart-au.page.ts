import { MinicartPage } from "./minicart.page"
import { extractNumber } from "../../../../utils/helpers/helpers"

export class MinicartPageAU extends MinicartPage {

    // =========================
    // 🚀 Actions
    // =========================

    // =========================
    // 📦 Helpers
    // =========================

    async getShippingDiscount(): Promise<string> {
        const shippingDiscount_1 = this.page.locator(`(//div[@data-shipping-id="default-shipping"]//span)[2]`)

        let shippingDiscount_1_num: number

        shippingDiscount_1_num = await extractNumber((await shippingDiscount_1.innerText()).trim())

        console.log(`shippingDiscount_1_num: ${shippingDiscount_1_num}`)

        return (shippingDiscount_1_num).toString()
    }

    async getAmountFooterCategoryItems(): Promise<number> {return 4}
    
    // =========================
    // ✅ Assertions
    // =========================

}
