import { expect } from "@playwright/test";
import { PageUtils, delay, handlePwpModalIfPresent, t } from "../../../../utils/helpers/helpers";
import { CartPage } from "./cart.page";
import { step } from "allure-js-commons";

export class CartPageTW extends CartPage {
    // =========================
    // 🚀 Actions
    // =========================
    async addProductToCartByIndex(index: number | number[]) {
        const indices = Array.isArray(index) ? index : [index];

        for (const i of indices) {
            await PageUtils.waitForPageLoad(this.page)

            const addButton = this.page.locator(`(//div[@class="product-grid row"]//div[normalize-space(@class)="product-tile"]//button[normalize-space(text())="${t.homepage('addtocart')}"])[${i}]`);

            await addButton.scrollIntoViewIfNeeded()

            await delay(300)

            await this.click(addButton, `Add product at index ${i} to cart`)

            await delay(1500)

            await handlePwpModalIfPresent(this.page);

            let isAddOnItemModalVisible = await this.selectAddonItenModal.isVisible()

            if (isAddOnItemModalVisible) {
                await this.click(this.selectAddonItenModalBtn, "Close Select Add-on Item modal")
            }

            await expect(this.minicartRender).toBeVisible({ timeout: 10000 })

            await this.page.mouse.move(150, 150)

            await this.minicartRender.waitFor({ state: 'hidden', timeout: 10000 });
        }
    }

    /**
         * Add "In-stock" products to cart with requied amount
         * @param count 
         */
    async addMultipleProductsToCart(count: number, description?: string) {
        await step(description || "Add multiple products to cart", async () => {
            const addText = t.homepage('addtocart');
            const allButtons = this.page.locator(`//button[normalize-space(text())="${addText}"]`);
            const totalButtons = await allButtons.count();

            let added = 0;
            let index = 1;

            while (added < count && index <= totalButtons) {
                const isDisabled = await this.isAddToCartButtonDisabled(index);
                if (isDisabled) {
                    console.log(`Button #${index} is disabled`);
                    index++;
                    continue;
                }

                await step(`Adding product ${index} to cart`, async () => {
                    const addButton = this.page.locator(`(//button[normalize-space(text())="${addText}"])[${index}]`);

                    try {
                        await addButton.scrollIntoViewIfNeeded();
                        await delay(300);

                        await this.click(addButton, `Add product at index ${index} to cart`);

                        await delay(1500)

                        await handlePwpModalIfPresent(this.page);

                        let isAddOnItemModalVisible = await this.selectAddonItenModal.isVisible()

                        if (isAddOnItemModalVisible) {
                            await this.click(this.selectAddonItenModalBtn, "Close Select Add-on Item modal")
                        }

                        await expect(this.minicartRender).toBeVisible({ timeout: 10000 })

                        await this.page.mouse.move(150, 150)

                        await this.minicartRender.waitFor({ state: 'hidden', timeout: 10000 });

                        added++;
                        console.log(`Added product at #${index} (Total: ${added}/${count})`);
                    } catch (error) {
                        console.warn(`Cannot add product at #${index}:`, error);
                    }
                });

                index++;
            }

            if (added < count) {
                console.warn(
                    `Added ${added}/${count} products to cart`
                );
            } else {
                console.log(`Added ${added}/${count} products to cart`);
            }
        })
    }

    // =========================
    // 📦 Helpers
    // =========================

    async getShippingDiscount(): Promise<string> {
        return "0"
    }

    async getProdCollection(index: number): Promise<string> {
        const prod = this.page.locator(`(//div[@class="product-grid row"]//div[normalize-space(@class)="product-tile"])[${index}]//div[@class="product-collection"]`)
        const prodCollection = (await prod.innerText()).trim()
        console.log(`Product collection Taiwan site: ${prodCollection}`)
        return prodCollection
    }

    async getProdName(index: number): Promise<string> {
        const prod = this.page.locator(`(//div[@class="product-grid row"]//div[normalize-space(@class)="product-tile"])[${index}]//div[@class="pdp-link"]`)
        const prodName = (await prod.innerText()).trim()
        console.log(`Product Name Taiwan site: ${prodName}`)
        return prodName
    }

    async getProdPrice(index: number): Promise<string> {
        const prod = this.page.locator(`(//div[@class="product-grid row"]//div[normalize-space(@class)="product-tile"])[${index}]//span[@class="value"]`)
        const prodPrice = (await prod.innerText()).trim()
        console.log(`Product Price: ${prodPrice}`)
        return prodPrice
    }

    // =========================
    // ✅ Assertions
    // =========================

}
