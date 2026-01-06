import { MinicartPage } from "./minicart.page"

export class MinicartPageTW extends MinicartPage {

    // =========================
    // 🚀 Actions
    // =========================

    // =========================
    // 📦 Helpers
    // =========================
    async getShippingDiscount(): Promise<string> {return "0"}

    async getAmountFooterCategoryItems(): Promise<number> {return 4}

    // =========================
    // ✅ Assertions
    // =========================

}
