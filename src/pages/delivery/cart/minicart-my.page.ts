import { MinicartPage } from "./minicart.page"
import { extractNumber } from "../../../../utils/helpers/helpers"

export class MinicartPageMY extends MinicartPage {

    // =========================
    // 🚀 Actions
    // =========================

    // =========================
    // 📦 Helpers
    // =========================

    async getShippingDiscount(): Promise<string> { return "0" }

    async getAmountFooterCategoryItems(): Promise<number> {return 3}
    
    // =========================
    // ✅ Assertions
    // =========================

}
