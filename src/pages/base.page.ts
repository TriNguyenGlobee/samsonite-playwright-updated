import { Page, Locator, expect } from "@playwright/test";
import { step } from "allure-js-commons";
import { Translations } from "../../config/i18n.config";
import { t, extractNumber, PageUtils, delay, splitString, escapeXPathText, isSorted, selectDropdownOption, scrollToTop, lazyLoad, scrollDownUntilVisible } from "../../utils/helpers/helpers";
import { loadTestData } from "../../utils/data";

type RightNavbarItem = 'search' | 'wishlist' | 'login' | 'location' | 'cart' | 'news';

export class BasePage {
    protected readonly page: Page;
    readonly logoImg: Locator;
    readonly shoppingCartButton: Locator;
    readonly headerNavBar: Locator;
    readonly newArrivalsMenuItem: Locator;
    readonly luggageMenuItem: Locator;
    readonly backPacksMenuItem: Locator;
    readonly bagsMenuItem: Locator;
    readonly labelsMenuItem: Locator;
    readonly offersMenuItem: Locator;
    readonly discoverMenuItem: Locator;
    readonly friendsOfSamsoniteMenuItem: Locator;
    readonly saleMenuItem: Locator;
    readonly accessoriesMenuItem: Locator;
    readonly rightNavbar: Locator;
    readonly searchIcon: Locator;
    readonly wishlistIcon: Locator;
    readonly loginIcon: Locator;
    readonly locationIcon: Locator;
    readonly cartIcon: Locator;
    readonly newsIcon: Locator;
    readonly usericon: Locator;
    readonly ginzaFlagshipStore: Locator;
    readonly cartBadge: Locator;
    readonly viewCartButton: Locator;
    readonly prodItem: Locator;
    readonly promotionMsg: Locator;
    readonly ratedProd: Locator;
    readonly bvRatedProd: Locator;
    readonly productTableShow: Locator;
    readonly noAvailableProdMsg: Locator;
    readonly notifyMebutton: Locator;
    readonly addProdToCartButton: Locator;
    readonly underlay: Locator;
    readonly footerLogo: Locator;
    readonly decimalRatingPoint: Locator
    readonly plpProductSizeDropdown: Locator;
    readonly plpProductSizeOption: Locator;

    protected testData: ReturnType<typeof loadTestData>;

    constructor(page: Page) {
        this.page = page;
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.shoppingCartButton = page.locator('//div[@id="shopping_cart_container"]');
        this.headerNavBar = page.locator('//div[contains(@class,"header-content")]//ul[@class="nav navbar-nav"]');
        this.newArrivalsMenuItem = this.headerNavBar.locator(`xpath=.//a[normalize-space(text())="${t.menuItem('newarrivals')}"]`);
        this.luggageMenuItem = this.headerNavBar.locator(`xpath=.//a[normalize-space(text())="${t.menuItem('luggage')}"]`);
        this.backPacksMenuItem = this.headerNavBar.locator(`xpath=.//a[normalize-space(text())="${t.menuItem('backpacks')}"]`);
        this.bagsMenuItem = this.headerNavBar.locator(`xpath=.//a[normalize-space(text())="${t.menuItem('bags')}"]`);
        this.labelsMenuItem = this.headerNavBar.locator(`xpath=.//a[@class="nav-link dropdown-toggle" and normalize-space(text())="${t.menuItem('label')}"]`);
        this.offersMenuItem = this.headerNavBar.locator(`xpath=.//a[normalize-space(text())="${t.menuItem('offers')}"]`);
        this.discoverMenuItem = this.headerNavBar.locator(`xpath=.//a[normalize-space(text())="${t.menuItem('discover')}"]`);
        this.ginzaFlagshipStore = this.headerNavBar.locator(`xpath=.//a[normalize-space(text())="銀座 旗艦店"]`);
        this.friendsOfSamsoniteMenuItem = this.headerNavBar.locator(`xpath=.//a[normalize-space(text())="${t.menuItem('friendofsamsonite')}"]`);
        this.saleMenuItem = this.headerNavBar.locator('xpath=.//a[normalize-space(text())="セール"]');
        this.accessoriesMenuItem = this.headerNavBar.locator(`xpath=.//a[normalize-space(text())="${t.menuItem('accessories')}"]`)
        this.rightNavbar = page.locator('//div[contains(@class,"right navbar-header")]');
        this.searchIcon = this.rightNavbar.locator('xpath=.//button[i[contains(@class,"search")]]');
        this.wishlistIcon = this.rightNavbar.locator('xpath=.//a[i[contains(@class,"heart")]]');
        this.loginIcon = this.rightNavbar.locator(`xpath=.//a[span[contains(text(),"${t.homepage('loginRegister')}")]]`);
        this.locationIcon = this.rightNavbar.locator('xpath=.//a[i[contains(@class,"location")]]');
        this.cartIcon = this.rightNavbar.locator('xpath=.//a[contains(@class,"minicart")]');
        this.newsIcon = this.rightNavbar.locator('xpath=.//a[contains(@class,"news-icon")]');
        this.usericon = this.rightNavbar.locator('xpath=.//div[contains(@class,"user")]');
        this.cartBadge = this.cartIcon.locator('xpath=.//span[@class="minicart-quantity"]');
        this.viewCartButton = page.locator(`//div[@id="miniCartModal"]//a[contains(text(),"View Cart")]`)
        this.prodItem = page.locator(`//div[@class="product-grid row"]//div[@class="product"]`);
        this.promotionMsg = this.prodItem.locator(`xpath=.//div[contains(@class,"product") and contains(@class,"message")]//span`)
        this.ratedProd = this.prodItem.locator(`//div[@class="rating-star"]//div[@class="pr-snippet-rating-decimal" and normalize-space(text())!="0.0"]/ancestor::div[normalize-space(@class)="product-tile"]`)
        this.bvRatedProd = this.page.locator(`//div[@class="bv-inline-rating"]//div[@class="bv_averageRating_component_container"]//div[@class="bv_text" and normalize-space(text())!="0.0"]/ancestor::div[@class="product"]`)
        this.productTableShow = page.locator(`//div[@class="product-grid row"]`)
        this.noAvailableProdMsg = this.productTableShow.locator(`xpath=.//span[normalize-space(text())="${t.homepage('out-of-stock')}"]`)
        this.notifyMebutton = page.locator(`//button[normalize-space(text())="${t.homepage('notifyme')}"]`)
        this.addProdToCartButton = this.prodItem.locator(`xpath=.//button[normalize-space(text())="${t.homepage("addtocart")}"]`)
        this.underlay = page.locator(`//div[@class="underlay"]`)
        this.footerLogo = page.locator(`//div[@class="footer-logo" and .//i]`)
        this.decimalRatingPoint = this.prodItem.locator(`xpath=.//span[@class="bv-rating-decimal"]`);
        this.plpProductSizeDropdown = this.prodItem.locator(`xpath=///div[@data-attr="productSize"]`);
        this.plpProductSizeOption = this.plpProductSizeDropdown.locator(`xpath=.//div[@class="variant-item "]`);

        this.testData = loadTestData();
    }

    // =========================
    // 🚀 Actions
    // =========================
    async goto(url: string) {
        await step(`Go to URL: ${url}`, async () => {
            await this.page.goto(url);
        });
    }

    async click(locator: Locator, description?: string) {
        await step(description || "Click on locator", async () => {
            await PageUtils.waitForPageLoad(this.page)
            await locator.click();
        });
    }

    async jsClick(locator: Locator, description?: string) {
        await step(description || "JS Click on locator", async () => {
            await locator.waitFor({ state: 'attached' });

            await locator.evaluate((el) => {
                el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });
        });
    }

    async type(locator: Locator, text: string, description?: string) {
        await step(description || `Type text: ${text}`, async () => {
            await locator.fill(text);
        });
    }

    async typeByManual(locator: Locator, value: string, description?: string) {
        await step(description || `Type text: ${value}`, async () => {
            await locator.click();
            await delay(500);
            await locator.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A');
            await delay(500);
            await locator.press('Backspace');
            await delay(500);
            await locator.pressSequentially(value, { delay: 30 });
        });
        await locator.press('Tab');
    }

    async typeIfVisible(locator: Locator, text: string, description?: string, timeout: number = 3000): Promise<void> {
        await step(description || `Type text if locator is visible`, async () => {
            try {
                await locator.waitFor({ state: 'visible', timeout })
                await this.type(locator, text)
            } catch {}
        })
    }

    async hover(locator: Locator, description?: string) {
        await step(description || "Hover on locator", async () => {
            await locator.hover();
        });
    }

    async jsHover(locator: Locator, description?: string) {
        await step(description || 'JS Hover on locator', async () => {
            await locator.waitFor({ state: 'attached' });

            await locator.evaluate((el) => {
                el.dispatchEvent(
                    new MouseEvent('mouseover', { bubbles: true, cancelable: true })
                );
                el.dispatchEvent(
                    new MouseEvent('mouseenter', { bubbles: true, cancelable: true })
                );
                el.dispatchEvent(
                    new MouseEvent('mousemove', { bubbles: true, cancelable: true })
                );
            });
        });
    }

    async hoverByMouse(locator: Locator, description?: string) {
        await step(description || "Hover by mouse on locator", async () => {
            const box = await locator.boundingBox();
            if (!box) throw new Error('Cannot get bounding box');

            await this.page.mouse.move(
                box.x + box.width / 2,
                box.y + box.height / 2
            );
        });
    }

    async goBack(pageName: string) {
        await step(`Goback to ${pageName} page`, async () => {
            await delay(500)
            await this.page.goBack();
        });
    }

    async pause() {
        await step("Pause", async () => {
            await this.page.pause();
        });
    }

    /**
     * Input menu item key to click on the menu on the Top-navbar
     * @param menuItemKey 
     * @param description 
     */
    async clickMenuItem(menuItemKey: keyof Translations['menuItem'], description?: string): Promise<void> {
        const menuItemText = t.menuItem(menuItemKey);
        let menuItemLocator = this.headerNavBar.locator(`xpath=.//a[normalize-space(text())="${menuItemText}"]`);

        if (process.env.LOCALE == "kr") {
            menuItemLocator = this.headerNavBar.locator(`xpath=.//a//span[normalize-space(text())="${menuItemText}"]`);
        }

        if (description) {
            console.log(`Click menu: ${description} (${menuItemText})`);
        }

        await menuItemLocator.scrollIntoViewIfNeeded();
        await menuItemLocator.click();

        await PageUtils.waitForDomAvailable(this.page);
    }

    /**
     * Input the menu path to click on level 2 or level 3 category menu
     * @param page 
     * @param menupath 
     * @param description 
     */
    async selectSamsoniteMenuItem(
        page: Page,
        menupath: string,
        description?: string
    ): Promise<void> {
        const rs: SplitResult = splitString(menupath, "->");
        const pathArray: string[] = rs.parts;
        const pathLength: number = rs.count;

        if (pathLength < 2 || pathLength > 3) {
            throw new Error(`Invalid menupath: ${menupath}. Only supports 2 or 3 levels.`);
        }

        const menu1 = pathArray[0].trim();
        const menu2 = pathArray[1].trim();
        const menu3 = pathLength === 3 ? pathArray[2].trim() : null;
        const escapedMenu1 = escapeXPathText(menu1!);
        const escapedMenu2 = escapeXPathText(menu2!);
        const escapedMenu3 = pathLength === 3 ? escapeXPathText(menu3!) : null;

        await delay(3000)

        const menu1Locator = page.locator(`//ul[@class="nav navbar-nav"]//li[a[normalize-space(text())=${escapedMenu1}]]`);

        await menu1Locator.first().hover();
        await delay(1000)

        if (pathLength === 2) {
            const menu2Locator = page.locator(`//ul[@class="nav navbar-nav"]//li[a[normalize-space(text())=${escapedMenu1}]]//li[contains(@class,"category-level-2") and .//a[normalize-space(text())=${escapedMenu2}]]`);
            await menu2Locator.click({ position: { x: 40, y: 15 } });
        } else if (pathLength === 3) {
            const menu3Locator = page.locator(`//ul[@class="nav navbar-nav"]//li[a[normalize-space(text())=${escapedMenu1}]]//li[contains(@class,"category-level-2") and .//a[normalize-space(text())=${escapedMenu2}]]//ul[@role="menu"]//li[contains(@class,"dropdown-item") and .//a[normalize-space(text())=${escapedMenu3}]]`);
            await menu3Locator.hover({ position: { x: 40, y: 15 } })
            await delay(500)
            await menu3Locator.click({ position: { x: 40, y: 15 } });
        }
        if (description) {
            console.log(`Selected menu item: ${menupath} - ${description}`);
        }

        await PageUtils.waitForDomAvailable(page);

        await delay(2000)
    }

    /**
     * Select item from RightNavbarItem to click menu item
     * @param item 
     * @param description 
     */
    async clickRightNavbarItem(item: RightNavbarItem, description?: string): Promise<void> {
        const itemMap: Record<RightNavbarItem, Locator> = {
            search: this.searchIcon,
            wishlist: this.wishlistIcon,
            login: this.loginIcon,
            location: this.locationIcon,
            cart: this.cartIcon,
            news: this.newsIcon,
        };

        const target = itemMap[item];

        await step(description || `Click right navbar item: ${item}`, async () => {
            await target.scrollIntoViewIfNeeded();
            await target.click();
        });
    }

    async goToTrackOrderPage(): Promise<void> {
        await step("Go to Track Order Page", async () => {
            const trackOrderLink = this.page.locator(
                `//div[contains(@class,"right navbar-header")]//a[normalize-space(text())="${t.homepage('trackOder')}"]`
            );

            await step("Hover over Login/Register icon", async () => {
                await this.loginIcon.hover();
            });

            await step("Click on 'Track Order' link", async () => {
                await trackOrderLink.waitFor({ state: 'visible' });
                await trackOrderLink.click();
            });
        });
    }

    async goToLoginRegisterPage(): Promise<void> {
        await step("Go to Login/Register Page", async () => {
            const loginRegisterLink = this.page.locator(
                `//div[contains(@class,"right navbar-header")]//a[normalize-space(text())="${t.homepage('loginRegister')}"]`
            );

            await step("Hover over Login/Register icon", async () => {
                await this.loginIcon.hover();
            });

            await step("Click on 'Login/Register' link", async () => {
                await loginRegisterLink.waitFor({ state: 'visible' });
                await loginRegisterLink.click();
            });
        });
    }

    async goToMyAccountPage(): Promise<void> {
        await step("Go to My Account Page", async () => {
            const myAccountLink = this.page.locator(
                `//div[contains(@class,"right navbar-header")]//a[normalize-space(text())="${t.homepage('myaccount')}"]`
            );

            await step("Hover over Login/Register icon", async () => {
                await this.loginIcon.hover();
            });

            await step("Click on 'My Account' link", async () => {
                await myAccountLink.waitFor({ state: 'visible' });
                await myAccountLink.click();
            });
        });
    }

    async goToCartPage(): Promise<void> {
        await step("Go to Cart Page", async () => {
            await this.click(this.cartIcon, `Click on Cart Icon`)
            await this.viewCartButton.waitFor({ state: 'visible' });
            await this.click(this.viewCartButton, `Click on Viewcart button`)
        });
    }

    async logout(): Promise<void> {
        await step("Logout", async () => {
            const logoutLink = this.page.locator(
                `//div[contains(@class,"right navbar-header")]//a[normalize-space(text())="${t.homepage('logout')}"]`
            );
            await step("Hover over Login/Register icon", async () => {
                await this.usericon.hover();
            });

            await step("Click on 'Logout' link", async () => {
                await logoutLink.waitFor({ state: 'visible' });
                await logoutLink.click();
            });
        });
    }

    async selectProdByIndex(prodIndex: number, description?: string): Promise<void> {
        await step(description || `Click on product at index ${prodIndex}`, async () => {
            await PageUtils.waitForDomAvailable(this.page)
            await this.click(this.prodItem.nth(prodIndex - 1), `Click on product at index ${prodIndex}`)
            await PageUtils.waitForPageLoad(this.page, 20000)
        })
    }

    async selectRatedProd(description?: string): Promise<void> {
        await step(description || `Click on rated product`, async () => {
            await PageUtils.waitForDomAvailable(this.page)
            await this.click(this.ratedProd.first())
        })
    }

    async selectBvRatedProd(description?: string): Promise<void> {
        await step(description || `Click on BV Rated product`, async () => {
            await PageUtils.waitForDomAvailable(this.page)
            await this.click(this.bvRatedProd.first())
        })
    }

    async clickCheckbox(page: Page, labelText: string, description?: string) {
        await step(description || `Click on the checkbox label "${labelText}"`, async () => {
            const labelLocator = page.locator(
                `xpath=(//label[normalize-space(.)="${labelText}" or .//span[normalize-space(text())="${labelText}"]] | //a[normalize-space(.)="${labelText}" or .//span[normalize-space(text())="${labelText}"]] | //label[contains(., "${labelText}")])`
            );

            let target = labelLocator.last();

            if (await labelLocator.first().isVisible()) {
                target = labelLocator.first();
            }

            await PageUtils.waitForPageLoad(page)
            await target.scrollIntoViewIfNeeded();

            await Promise.all([
                target.click({ position: { x: 7, y: 7 } }),
                this.underlay.waitFor({ state: 'hidden', timeout: 20000 })
            ]);
            await delay(5000);

            await PageUtils.waitForPageLoad(page)
            await PageUtils.waitForDomAvailable(page)

            await delay(2000)

            await this.underlay.waitFor({ state: 'hidden', timeout: 20000 })

            await delay(5000);
        });
    }

    async selectPLPFilter(
        page: Page,
        menupath: string,
        description?: string
    ): Promise<void> {
        await step(description || `Select filter on product listing page`, async () => {
            const rs: SplitResult = splitString(menupath, "->");
            const pathArray: string[] = rs.parts;
            const pathLength: number = rs.count;

            if (pathLength != 2) {
                throw new Error(`Invalid menupath: ${menupath}. Only supports 2 levels.`);
            }

            const menu1 = pathArray[0].trim();
            const menu2 = pathArray[1].trim();
            const escapedMenu1 = escapeXPathText(menu1!);
            const escapedMenu2 = escapeXPathText(menu2!);

            const menu1Locator = page.locator(`//div[contains(@class,"filter-wrapper")]//div[normalize-space(text())=${escapedMenu1}]`);
            /*
            await menu1Locator.first().evaluate((el) => {
                el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });*/

            await this.hoverByMouse(menu1Locator.first(), `Hover on filter menu: ${menu1}`)

            await delay(1000)

            const menu2Locator = page.locator(`//div[contains(@class,"filter-wrapper")]//div[normalize-space(text())=${escapedMenu1}]//following-sibling::div//ul//li//a//span[normalize-space(text())=${escapedMenu2} or img[@alt=${escapedMenu2}]]`);
            await menu2Locator.click({ position: { x: 40, y: 15 } });

            await PageUtils.waitForDomAvailable(page);

            await delay(2000)

            await lazyLoad(page)

            await delay(5000);

            await PageUtils.waitForPageLoad(page)
            await PageUtils.waitForDomAvailable(page)

            await delay(2000)

            await this.underlay.waitFor({ state: 'hidden', timeout: 20000 })

            await delay(2000)
        })
    }

    async sortPLPProduct(option: string, description?: string) {
        await step(description || `Sort PLP Product by: ${option}`, async () => {
            const sortByDropdown = this.page.locator(`//div[@class="search-result-content"]//label[normalize-space(text())="${t.bvintegration('sortby')}"]/parent::div`)
            const optionRow = sortByDropdown.locator(`xpath=.//span[normalize-space(text())="${option}"]`)

            //await sortByDropdown.scrollIntoViewIfNeeded()
            await scrollDownUntilVisible(this.page, sortByDropdown)
            await delay(1000)

            await this.hover(sortByDropdown)
            await delay(1000)
            await this.waitFor(optionRow)
            await this.click(optionRow)

            await PageUtils.waitForPageLoad(this.page)
            await PageUtils.waitForDomAvailable(this.page)

            await delay(2000)

            await this.underlay.waitFor({ state: 'hidden', timeout: 20000 })

            await delay(5000)
        })
    }

    // sizeIndex: index of option value in the size dropdown list, starting from 1
    async selectPLPProductSizeByIndex(prodIndex: number, sizeIndex: number, description?: string) {
        await step(description || `Select PLP product size by product index: ${prodIndex}, size index: ${sizeIndex}`, async () => {
            const productSizeDropdown = this.page.locator(`(//div[@class="product-grid row"]//div[@class="product"])[${prodIndex}]//div[@data-attr="productSize"]`)
            const sizeOption = productSizeDropdown.locator(`xpath=.//div[@class="variant-item "][${sizeIndex}]`)
            await productSizeDropdown.scrollIntoViewIfNeeded()
            await this.click(productSizeDropdown, `Click on product size dropdown`)
            await delay(1000)
            await this.click(sizeOption, `Select size option at index ${sizeIndex}`)
            await PageUtils.waitForDomAvailable(this.page)
        })
    }

    // =========================
    // 📦 Helpers
    // =========================
    async getText(locator: Locator, description?: string): Promise<string | null> {
        return await step(description || "Get text from locator", async () => {
            return locator.textContent();
        });
    }

    async isVisible(locator: Locator, description?: string): Promise<boolean> {
        return await step(description || "Check locator visible", async () => {
            return locator.isVisible();
        });
    }

    async waitFor(locator: Locator, description?: string) {
        await step(description || "Wait for locator visible", async () => {
            await locator.waitFor();
        });
    }

    async getLocatorURL(locate: Locator, description?: string): Promise<string | null> {
        return await step(description || "Get Locator URL", async () => {
            const selfHref = await locate.getAttribute('href');

            if (selfHref) {
                return selfHref;
            }

            let link = locate.locator('xpath=.//a').first();
            if (await link.isVisible()) {
                return await link.getAttribute('href');
            }

            link = locate.locator('xpath=./parent::a');
            if (await link.isVisible()) {
                return await link.getAttribute('href');
            }
            return null;
        });
    }

    async getProdCollection(index: number): Promise<string> {
        const prod = this.page.locator(`(//div[@class="product-grid row"]//div[@class="product"])[${index}]//div[@class="product-collection"]`)
        const prodCollection = (await prod.innerText()).trim()
        console.log(`Product collection: ${prodCollection}`)
        return prodCollection
    }

    async getProdName(index: number): Promise<string> {
        const prod = this.page.locator(`(//div[@class="product-grid row"]//div[@class="product"])[${index}]//div[@class="pdp-link"]`)
        const prodName = (await prod.innerText()).trim()
        console.log(`Product Name: ${prodName}`)
        return prodName
    }

    async getProdPrice(index: number): Promise<string> {
        const prod = this.page.locator(`(//div[@class="product-grid row"]//div[@class="product"])[${index}]//span[@class="value"]`)
        const prodPrice = (await prod.innerText()).trim()
        console.log(`Product Price: ${prodPrice}`)
        return prodPrice
    }

    async getCartBadgeValue(): Promise<number> {
        const cartBadgeValue = await this.cartBadge.textContent()

        return await extractNumber(cartBadgeValue!)
    }

    async isAddToCartButtonDisabled(index: number): Promise<boolean> {
        const addToCartButton = this.page.locator(`(//button[normalize-space(text())="${t.homepage('addtocart')}"])[${index}]`)
        const isDisabledExist = await addToCartButton.getAttribute('disabled')

        if (isDisabledExist !== null) {
            return true
        } else return false
    }

    async decodeUrlIfNeeded(url: string): Promise<string> {
        if (!url) return url;

        try {
            if (/% [0 - 9A - Fa - f]{ 2 }/.test(url)) {
                const decoded = decodeURIComponent(url);

                if (decoded !== url) {
                    return decoded;
                }
            }
        } catch (err) {
            console.warn(`[decodeUrlIfNeeded] Cannot decode URL: ${url}`, err);
        }

        return url;
    }

    // Get BV Decimal Rating Point on PLP by index
    async getPLPDecimalRatingPoint(index: number): Promise<string> {
        const prod = this.page.locator(`(//div[@class="product-grid row"]//div[@class="product"])[${index}]//div[@class="bv-inline-rating"]//div[@class="bv_averageRating_component_container"]//div[@class="bv_text"]`)
        const decimalRatingPoint = (await prod.innerText()).trim()
        console.log(`Decimal Rating Point with product index=${index}: ${decimalRatingPoint}`)
        return decimalRatingPoint
    }

    // =========================
    // ✅ Assertions
    // =========================
    async assertVisible(locator: Locator, description?: string) {
        await step(description || "Assert element visible", async () => {
            await expect(locator).toBeVisible({
                timeout: 10000
            });
        });
    }

    async assertHidden(locator: Locator, description?: string) {
        await step(description || "Assert element hidden", async () => {
            await expect(locator.first()).toBeHidden({
                timeout: 20000
            });
        });
    }

    async assertEqual(actual: any, expected: any, description?: string) {
        await step(description || "Assert equal", async () => {
            console.log(`Test data ${description} :`)
            console.log(`Actual - "${actual}"`)
            console.log(`Expected - "${expected}"`)
            expect(actual).toBe(expected);
        });
    }

    async assertAttributeValue(locator: Locator, attributeName: string, value: any, description?: string) {
        await step(description || "Assert Locator attribute value", async () => {
            if (Array.isArray(value)) {
                const receivedValue = await locator.getAttribute(attributeName, { timeout: 2000 })
                console.log(`Attribute received value: "${receivedValue}"`)
                console.log(`Attribute expected value: "${value}"`)

                expect(value).toContain(receivedValue)
            } else {
                expect(locator).toHaveAttribute(attributeName, value);
            }
        })
    }

    async assertText(locator: Locator, text: any, description?: string) {
        await step(description || "Assert Locator text", async () => {
            expect(locator).toHaveText(text);
        })
    }

    async assertUrl(expectedUrl: string | RegExp, description?: string) {
        const currentUrl = await this.page.url();
        const decodedUrl = await this.decodeUrlIfNeeded(currentUrl);

        await step(description || "Check current URL", async () => {
            const urlToCheck = String(decodedUrl);
            if (expectedUrl instanceof RegExp) {
                expect(urlToCheck).toMatch(expectedUrl);
            } else {
                expect(expectedUrl).toContain(urlToCheck);
            }
        });
    }

    async assertArraySorted(locator: Locator, expectedOrder: string[], description?: string) {
        await step(description || "Assert array sorted", async () => {
            const items = await locator.allTextContents();
            expect(items).toEqual(expectedOrder);
        });
    }

    async assertShoppingCartBadgeValue(expectedValue: string, description?: string) {
        await step(description || `Assert shopping cart badge value: ${expectedValue}`, async () => {
            const badge = this.shoppingCartButton.locator('xpath=.//span[@class="shopping_cart_badge"]');
            const badgeValue = await badge.textContent();
            expect(badgeValue).toBe(expectedValue);
        });
    }

    async assertShoppingCartBadgeRemoved(description?: string) {
        await step(description || "Assert Shopping Cart Badge Removed", async () => {
            const badge = this.shoppingCartButton.locator('xpath=.//span[@class="shopping_cart_badge"]');
            await expect(badge).toHaveCount(0);
        });
    }

    async assertPageTitle(expectedTitle: string, description?: string) {
        await step(description || "Assert Page Title", async () => {
            const title = await this.page.title();
            await expect(this.page).toHaveTitle(expectedTitle);
            await expect(title).toBe(expectedTitle);
        })
    }

    /**
     * Check items list for category menu
     * @param baseLocator The base locator containing the <ul>
     * @param ulClass The class of the <ul> to locate (if undefined, use baseLocator directly)
     * @param items The expected items with text and href
     * @param options Additional options:
     *   - twoLinksPerLi: whether each <li> has two <a> tags (default: true)
     *   - lastItemIsTextOnly: whether the last item is text only (default: false)
     *   - checkPictureTag: whether to check for <picture> tag in the first <a> (default: true)
     */
    async assertItemsListForCategoryMenu(
        baseLocator: ReturnType<Page['locator']>,
        ulClass: string | undefined,
        items: { text: string; href: string }[],
        options?: {
            twoLinksPerLi?: boolean;
            lastItemIsTextOnly?: boolean;
            checkPictureTag?: boolean;
        }
    ) {
        await delay(2000)

        const { twoLinksPerLi = true, lastItemIsTextOnly = false, checkPictureTag = true } = options ?? {};

        const ul = ulClass
            ? baseLocator.locator(`xpath=.//ul[contains(@class,"${ulClass}") and @role="menu"]`)
            : baseLocator;

        let lis = ul.locator('xpath=.//li');

        if (ulClass === "new-arrivals") { // New Arrivals menu only
            lis = ul.locator('xpath=.//li[@class="category-level-2 dropdown-item"]');
        }

        await step('Assert number of visible level 2 menu items', async () => {
            console.log("Counted Locator: " + lis)
            await delay(2000)
            const count = await lis.count();

            let visibleCount = 0;
            for (let i = 0; i < count; i++) {
                if (await lis.nth(i).isVisible()) {
                    visibleCount++;
                }
            }

            expect(visibleCount, `<ul> ${ulClass ?? 'root'} should have ${items.length} visible <li>`).toBe(items.length);
        });

        for (let i = 0; i < items.length; i++) {
            const li = lis.nth(i);
            const links = li.locator('xpath=.//a');
            const expected = items[i];

            const isTextOnly = !twoLinksPerLi || (lastItemIsTextOnly && i === items.length - 1);

            if (isTextOnly) {
                await expect(links).toHaveCount(1);
                const a = links.first();
                await expect(a).toHaveAttribute('href', expected.href);
                await expect(a).toContainText(expected.text);
            } else {
                await expect(links).toHaveCount(2);
                const picA = links.nth(0);
                const textA = links.nth(1);

                await expect(picA).toHaveAttribute('href', expected.href);
                await expect(textA).toHaveAttribute('href', expected.href);
                await expect(textA).toContainText(expected.text);

                if (checkPictureTag) {
                    await expect(picA.locator('picture')).toHaveCount(1);
                }
            }
        }
    }

    // Check Locator Inside
    // Assert correct href, text
    // check image? exist
    async assertLocatorInside(locate: Locator, data: LocatorInside, description?: string) {
        await step(description || "Assert href, text and image of Locator", async () => {
            if (data.href) {
                const link = locate.locator('xpath=.//a');
                await expect(link.first()).toHaveAttribute('href', data.href)
            }

            if (data.hasImage) {
                const img = locate.locator('xpath=.//img');
                await expect(img).toHaveCount(1)
                const srcAttr = await img.getAttribute('src') || await img.getAttribute('data-src');
                expect(srcAttr).toMatch(/.+\.(jpg|jpeg|png|webp|svg)/);
            }

            if (data.text) {
                await expect(locate).toContainText(data.text);
            }
        })
    }

    async assertNavigatedURLByClickLocator(page: Page, locate: Locator, url: any, description?: string, button: 'left' | 'middle' | 'right' = 'middle') {
        await step(description || `Assert expected URL is: ${url}`, async () => {
            let link = locate.locator('xpath=.//a').first();

            const isVisible = await link.isVisible()

            await PageUtils.waitForDomAvailable(page)
            await delay(2000)

            if (!isVisible) {
                link = locate
            }

            if (button === 'middle') {
                await this.hover(link)
                const [newPage] = await Promise.all([
                    page.context().waitForEvent('page', { timeout: 60000 }),
                    link.click({ button }),
                ]);

                await newPage.waitForLoadState('domcontentloaded');
                const currentUrl = newPage.url();
                await expect(currentUrl).toContain(url);

                await newPage.close();
            } else {
                console.log(`Now loading .............${button} click on button`)
                await Promise.all([
                    page.waitForURL(url, { timeout: 60000 }),
                    link.click({ button }),
                ]);

                await delay(500)
                const currentUrl = page.url();
                await expect(currentUrl).toContain(url);
            }
        })
    }

    // fieldName: field label, field name
    async assertFieldFeedbackMsg(fieldName: string, msg: string, description?: string) {
        await step(description || `Assert feedback msg for ${fieldName} field`, async () => {
            const feedbackmsg = this.page.locator(`//div[@class="container register-page"]//label[normalize-space(text())="${fieldName}"]//parent::div//div[@class="invalid-feedback"]`)

            await this.assertText(feedbackmsg, msg,
                `Actual msg: ${await feedbackmsg.innerText()},
                Expected msg: ${msg}`
            )
        })
    }

    // dropdownlabel: id, name or locator
    async assertDropdownFeedbackMsg(dropdownlabel: string | Locator, msg: string, description?: string) {
        await step(description || `Assert feedback msg for ${dropdownlabel} dropdown`, async () => {
            let dropdown: Locator;

            if (typeof dropdownlabel === 'string') {
                dropdown = this.page.locator(`select[id="${dropdownlabel}"], select[name="${dropdownlabel}"]`);
            }
            else {
                dropdown = dropdownlabel;
            }

            const feedback = dropdown.locator('xpath=ancestor::div[contains(@class,"form-group")]//div[contains(@class,"invalid-feedback")]');

            const actual = await feedback.innerText();

            await this.assertText(feedback, msg,
                `Actual msg: ${actual},
                Expected msg: ${msg}`
            )
        })
    }

    // Assert PLP Decimal Rating Point Correct Range 0.0 to 5.0
    async assertPLPDecimalRatingPointCorrect(description?: string) {
        await step(description || `Assert PLP Decimal Rating Point Correct`, async () => {
            const totalProds = await this.bvRatedProd.count();

            for (let index = 1; index <= totalProds; index++) {
                const decimalRatingPoint = await this.getPLPDecimalRatingPoint(index);
                const decimalPointNum = parseFloat(decimalRatingPoint);
                const prod = this.page.locator(`(//div[@class="product-grid row"]//div[@class="product"])[${index}]//div[@class="bv-inline-rating"]//div[@class="bv_averageRating_component_container"]//div[@class="bv_text"]`)

                if (isNaN(decimalPointNum)) {
                    expect(prod).not.toBeVisible();
                } else {
                    expect(decimalPointNum).toBeGreaterThanOrEqual(0.0);
                    expect(decimalPointNum).toBeLessThanOrEqual(5.0);
                }
            }
        })
    }

    // Assert PLP All Products Have Minimum Rating Stars After Filtering
    async assertPLPAllProductsHaveMinRatingStars(minRating: number, description?: string) {
        await step(description || `Assert PLP all products have minimum rating stars: ${minRating}`, async () => {
            const totalProds = await this.bvRatedProd.count();
            for (let index = 1; index <= totalProds; index++) {
                const decimalRatingPoint = await this.getPLPDecimalRatingPoint(index);
                const decimalPointNum = parseFloat(decimalRatingPoint);
                expect(decimalPointNum).toBeGreaterThanOrEqual(minRating);
            }
        })
    }

    // Assert PLP Product Sorted by Rating Point
    async assertPLPProductSortedByRatingPoint(order: "asc" | "desc" = "asc", description?: string) {
        await step(description || `Assert PLP product sorted by rating point: ${order}`, async () => {
            const decimalPointArr: number[] = []
            const totalProds = await this.bvRatedProd.count();

            for (let index = 1; index <= totalProds; index++) {
                let currentRating = await this.getPLPDecimalRatingPoint(index)
                decimalPointArr.push(parseFloat(currentRating))
            }

            console.log(`Review point array: ${decimalPointArr.toString()}`)
            expect(isSorted(decimalPointArr, order)).toBe(true)
        })
    }
}

interface LocatorInside {
    href?: string;
    hasImage?: boolean;
    text?: string;
}

interface SplitResult {
    parts: string[];
    count: number;
}