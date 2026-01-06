import { CartPage } from "./cart.page";

export class CartPageJP extends CartPage {

    // =========================
    // 🚀 Actions
    // =========================

    // =========================
    // 📦 Helpers
    // =========================

    async getShippingDiscount(): Promise<string> {
        return "0"
    }
    // =========================
    // ✅ Assertions
    // =========================

}
