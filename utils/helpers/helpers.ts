import { Page, Locator } from '@playwright/test';
import { I18n, Translations } from "../../config/i18n.config";
import { test, expect } from '@playwright/test';
import { step } from "allure-js-commons";
import path from 'path';
import { attachment } from 'allure-js-commons';
import fs from 'fs';

/**
 * **************************************************************************
 * **************************************************************************
 * 📦 Helpers
 * {Helper functions}
 * Non-used directly on the site or in test cases
 * These are non-actions
 * **************************************************************************
 * **************************************************************************
 */

/**
 * Wait for page load complete
 */
async function waitForPageLoadComplete(page: Page, timeout: number = 20000): Promise<void> {
  await page.waitForLoadState('domcontentloaded', { timeout });
  await page.waitForLoadState('networkidle', { timeout });
}

async function waitForDomAvailable(page: Page, timeout: number = 10000): Promise<void> {
  await page.waitForLoadState('domcontentloaded', { timeout });
}

async function waitForPageLoad(page: Page, timeout: number = 10000): Promise<void> {
  await page.waitForLoadState('load', { timeout });
}

export const PageUtils = {
  waitForPageLoadComplete,
  waitForDomAvailable,
  waitForPageLoad
};

/**
 * Waits for an element to exist in the DOM.
 */
async function waitForElement(locator: Locator, timeout: number = 5000): Promise<void> {
  await locator.waitFor({ state: 'attached', timeout });
}

/**
 * Waits for an element to be visible (displayed on screen).
 */
async function waitForElementVisible(locator: Locator, timeout: number = 5000): Promise<void> {
  await locator.waitFor({ state: 'visible', timeout });
}

// Group into one exportable utility object
export const DOMUtils = {
  waitForElement,
  waitForElementVisible,
};

/**
 * Generate a new random sequence of numbers along with a timestamp.
 * Format: yyyyMMddHHmmssSSS + random(3 digits)
 */
export function generateReadableTimeBasedId(): string {
  const now: Date = new Date();
  const timestamp: string = now.toISOString().replace(/[-:.TZ]/g, '');
  const random: string = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');
  return `${timestamp}${random}`;
}

export function randomInt(min: number, max: number): number {
    if (min > max) {
        throw new Error('min must be less than or equal to max');
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomFloat(min: number, max: number, decimals = 2): number {
    if (min > max) {
        throw new Error('min must be less than max');
    }
    const num = Math.random() * (max - min) + min;
    return Number(num.toFixed(decimals));
}

export function randomAlphaString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

/**
 * Generate a paragraph with specified number of chars
 * @param length 
 * @returns 
 */
export function generateSentence(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ';
  let result = '';

  for (let i = 0; i < length; i++) {
    const char = chars.charAt(Math.floor(Math.random() * chars.length));
    if (!(char === ' ' && result.endsWith(' '))) {
      result += char;
    }
  }

  return result.trim();
}

/**
 * Generate a random number string
 * @param length 
 * @returns 
 */
export function generateNumberString(length: number): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10); // 0–9
  }
  return result;
}

/**
 * Splits a string by a given delimiter and returns the parts and their count.
 * @param input - The string to split.
 * @param delimiter - The delimiter to split by (default is a space).
 * @returns An object with the parts array and count.
 */

interface SplitResult {
  parts: string[];
  count: number;
}

export function splitString(input: string, delimiter: string = " "): SplitResult {
  const result = input.split(delimiter).map(part => part.trim());
  return {
    parts: result,
    count: result.length
  };
}

/**
 * Pause execution for a given amount of time (ms).
 */
export async function delay(ms: number): Promise<void> {
  await step(`Delay for ${ms} ms`, async () => {
    return new Promise(resolve => setTimeout(resolve, ms));
  })
}

/**
 * Check if the array is sorted in ascending order
 */
export function isSortedAsc(arr: number[] | string[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return false;
    }
  }
  return true;
}

/**
 * Check if the array is sorted in descending order
 */
export function isSortedDesc(arr: number[] | string[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) {
      return false;
    }
  }
  return true;
}

/**
 * Check if the array is sorted (automatically detect ascending or descending)
 * @param order "asc" | "desc"
 */
export function isSorted(arr: number[] | string[], order: "asc" | "desc" = "asc"): boolean {
  return order === "asc" ? isSortedAsc(arr) : isSortedDesc(arr);
}

/**
 * Get a random element from an array
 * @param arr The array to select from
 * @returns A random element from the array
 */
export function getRandomArrayElement<T>(arr: T[]): T {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

/**
 * Return a number extracted from a price string.
 * @param priceText 
 * @returns 
 */
export function extractNumber(priceText: string): number {
  const cleaned = priceText.replace(/[^0-9.,]/g, "");
  const normalized = cleaned.replace(/,/g, "");
  const value = parseFloat(normalized);

  return isNaN(value) ? 0 : value;
}

/**
 * type-safe type for key
 */
export const t = {
  homepage: (key: keyof Translations['homepage']) => I18n.translations.homepage[key],
  loginpage: (key: keyof Translations['loginpage']) => I18n.translations.loginpage[key],
  forgotpasswordpage: (key: keyof Translations['forgotpasswordpage']) => I18n.translations.forgotpasswordpage[key],
  registerpage: (key: keyof Translations['registerpage']) => I18n.translations.registerpage[key],
  membershippage: (key: keyof Translations['membershippage']) => I18n.translations.membershippage[key],
  newarrivalspage: (key: keyof Translations['newarrivalspage']) => I18n.translations.newarrivalspage[key],
  luggagepage: (key: keyof Translations['luggagepage']) => I18n.translations.luggagepage[key],
  backpackspage: (key: keyof Translations['backpackspage']) => I18n.translations.backpackspage[key],
  bagspage: (key: keyof Translations['bagspage']) => I18n.translations.bagspage[key],
  brandpage: (key: keyof Translations['brandpage']) => I18n.translations.brandpage[key],
  accessories: (key: keyof Translations['accessories']) => I18n.translations.accessories[key],
  ourbrandstorypage: (key: keyof Translations['ourbrandstorypage']) => I18n.translations.ourbrandstorypage[key],
  ginzaflagshipstore: (key: keyof Translations['ginzaflagshipstore']) => I18n.translations.ginzaflagshipstore[key],
  sale: (key: keyof Translations['sale']) => I18n.translations.sale[key],
  offers: (key: keyof Translations['offers']) => I18n.translations.offers[key],
  whyshopwithus: (key: keyof Translations['whyshopwithus']) => I18n.translations.whyshopwithus[key],
  mypage: (key: keyof Translations['mypage']) => I18n.translations.mypage[key],
  menuItem: (key: keyof Translations['menuItem']) => I18n.translations.menuItem[key],
  lv2MenuItem: (key: keyof Translations['lv2MenuItem']) => I18n.translations.lv2MenuItem[key],
  minicart: (key: keyof Translations['minicart']) => I18n.translations.minicart[key],
  cartpage: (key: keyof Translations['cartpage']) => I18n.translations.cartpage[key],
  PDP: (key: keyof Translations['PDP']) => I18n.translations.PDP[key],
  wishlist: (key: keyof Translations['wishlist']) => I18n.translations.wishlist[key],
  globalnavfooter: (key: keyof Translations['globalnavfooter']) => I18n.translations.globalnavfooter[key],
  checkoutpage: (key: keyof Translations['checkoutpage']) => I18n.translations.checkoutpage[key],
  bvintegration: (key: keyof Translations['bvintegration']) => I18n.translations.bvintegration[key],
  contactuspage: (key: keyof Translations['contactuspage']) => I18n.translations.contactuspage[key],
};

/**
 * Mask email address for privacy
 * @param email Email đầy đủ
 * @returns Masked email
 */
export function maskEmail(email: string): string {
  const [username, domain] = email.split('@');

  if (username.length < 3) {
    throw new Error('email username must be at least 3 characters long');
  }

  return username.slice(0, 3) + '*****' + '@' + domain;
}

/**
 * Return a random integer between min and max (inclusive)
 * @param min 
 * @param max 
 * @returns 
 */
export function getRandomInt(min: number = 1, max: number = 10): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Return a safe XPath string-literal for text value.
 * - If text contains both ' and " → return a valid concat(...) expression for XPath
 * - If text only contains ' → wrap with "..."
 * - If text only contains " → wrap with '...'
 */
export function escapeXPathText(text: string): string {
  if (!text.includes("'")) {
    return `'${text}'`;
  }
  if (!text.includes('"')) {
    return `"${text}"`;
  }

  const segments = text.split("'");
  const concatParts: string[] = [];

  segments.forEach((seg, idx) => {
    concatParts.push(`'${seg}'`);
    if (idx < segments.length - 1) {
      concatParts.push(`"'"`);
    }
  });

  return `concat(${concatParts.join(", ")})`;
}

/**
 * Return selected value in dropdown
 * @param page 
 * @param selector 
 * @returns 
 */
export async function getDropdownValue(
  page: Page,
  selector: string | Locator,
): Promise<string> {
  const dropdown =
    typeof selector === "string" ? page.locator(selector) : selector;

  const selectedValue = await dropdown.inputValue();

  return selectedValue
}

export async function getOptionIndexByText(page: Page, text: string, selector: string | Locator): Promise<number> {
  const dropdown =
    typeof selector === "string" ? page.locator(selector) : selector;

  await expect(dropdown).toBeVisible();

  const options = dropdown.locator("option");
  const count = await options.count();

  let foundIndex = -1;

  for (let i = 0; i < count; i++) {
    const optionText = (await options.nth(i).innerText()).trim();

    if (optionText === text) {
      foundIndex = i;
      break;
    }
  }

  if (foundIndex === -1) {
    throw new Error(`Not found option with "${text}"`);
  }

  return foundIndex;
}

/**
 * Get decical rating by star offset
 * Return value: 2.5, 4.3, ...
 */
export async function getDecimalRatingStar(page: Page) {
  return await step('Get decimal rating star', async () => {
    const stars = page.locator('.bv_stars_svg_no_wrap svg');
    //const count = await stars.count();

    let rating = 0;

    for (let i = 0; i < 5; i++) {
      const secondStop = stars
        .nth(i)
        .locator('defs linearGradient')

      const x1 = await secondStop.getAttribute('x1');

      if (!x1) continue;

      const percent = parseFloat(x1.replace('%', ''));

      const filledRatio = percent / 100;

      rating += filledRatio;
    }

    return Number(rating.toFixed(2));
  })
}

/**
 * Get decical rating by star offset
 * Return value: 2.5, 4.3, ...
 */
export async function getReviewDecimalRatingStar(page: Page, index: number) {
  return await step('Get reivew decimal rating star', async () => {
    const reviewRow = page.locator(`#reviews_container abbr`)
    const stars = reviewRow.nth(index - 1).locator('svg');
    //const count = await stars.count();

    let rating = 0;

    for (let i = 0; i < 5; i++) {
      const secondStop = stars
        .nth(i)
        .locator('defs linearGradient stop')
        .nth(1);

      const offset = await secondStop.getAttribute('offset');

      if (!offset) continue;

      const percent = parseFloat(offset.replace('%', ''));

      const filledRatio = 1 - percent / 100;

      rating += filledRatio;
    }

    return Number(rating.toFixed(2));
  })
}

export async function screenshotAndAttach(
  page: Page,
  folderPath: string,
  fileName: string
) {
  const dir = path.resolve(folderPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const filePath = path.join(dir, `${fileName}.png`);

  const buffer = await page.screenshot({ path: filePath, fullPage: true });

  await attachment(fileName, buffer, 'image/png');
}

/**
 * Wait until locator has ::before
 * @returns true if has ::before in timeout, else return false
 */
export async function waitForHasBefore(
  locator: Locator,
  timeoutMs: number = 3000,
  pollingMs: number = 100
): Promise<boolean> {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    try {
      const hasBefore = await locator.evaluate(el => {
        const style = window.getComputedStyle(el, '::before');

        if (!style) return false;

        const content = style.getPropertyValue('content');

        return (
          content !== 'none' &&
          content !== '""' &&
          content !== "''"
        );
      });

      if (hasBefore) return true;
    } catch {
    }

    await new Promise(r => setTimeout(r, pollingMs));
  }

  return false;
}


/**
 * **************************************************************************
 * **************************************************************************
 * 🚀 Actions
 * {Common functions/Actions}
 * Perform a action on a site
 * Use above helper functions
 * Used directly on the site or in test cases
 * Maybe used as a action
 * **************************************************************************
 * **************************************************************************
 */

/**
 * Select sidebar menu by js
 */

export async function clickSidebarMenu(page: Page, menuPath: string) {
  // Split menuPath and set value into pathArray
  const rs: SplitResult = splitString(menuPath, "->")
  const pathArray: string[] = rs.parts
  const pathLength: number = rs.count

  let currentScope: Page | Locator = page; // Start from root

  for (let i = 0; i < pathLength; i++) {
    const label = pathArray[i];

    // Find the menu at the current level within the current DOM scope.
    const locator: Locator = currentScope.locator(`xpath =.//span[@class="title" and normalize-space(text())="${label}"]`);

    // Click on the menu at the current level
    await locator.first().click();

    // Wait for the submenu to render before proceeding.
    await page.waitForTimeout(300);

    // Update the scope to search for children within the newly opened branch.
    // Go up to the <li> element of the clicked label, then go down to the child <ul> branch.
    currentScope = locator.locator('xpath=ancestor::li[1]//ul[contains(@class, "page-sidebar-menu")]');
  }
}

/**
 * Combobox: have a input textbox below the combobox option
 * User can input text into textbox then click the displayed option row
 * @param {*} page 
 * @param {string : combobox name label} comboboxName 
 * @param {string : the option value which user want to select} optionValue 
 */
export async function selectComboboxOption(page: Page, comboboxName: string, optionValue: string): Promise<void> {
  // Define the comboxbox element
  const combobox: Locator = page.locator(`//div[label[text()="${comboboxName}"] or div[text()="${comboboxName}"]]//ng-select`)
  const comboboxInput: Locator = page.locator(`//div[label[text()="${comboboxName}"] or div[text()="${comboboxName}"]]//ng-select//input`)

  await page.waitForLoadState('networkidle');

  // Click comboxbox, enter option value into combobox textbox
  await combobox.click();
  await comboboxInput.fill(optionValue)

  // Define the option locator
  const optionXpath = `//ng-dropdown-panel//span[text()="${optionValue}"]`
  const profileValueOption = page.locator(optionXpath);

  // Select the option need to select
  await profileValueOption.click();
}

/**
 * Select an option below the dropdown
 * @param page 
 * @param selector 
 * @param optionValueOrLabel 
 * @param by 
 */
export async function selectDropdownOption(
  page: Page,
  selector: string | Locator,
  optionValueOrLabel: string,
  by: "value" | "label" | "text" = "value",
  description?: string
): Promise<void> {
  await step(description || `Select ${optionValueOrLabel} from ${await selector.toString()}`, async () => {
    const dropdown =
      typeof selector === "string" ? page.locator(selector) : selector;

    await expect(dropdown).toBeVisible();

    if (by === "value") {
      await dropdown.selectOption({ value: optionValueOrLabel });
    } else if (by === "label") {
      await dropdown.selectOption({ label: optionValueOrLabel });
    } else {
      const optionIndex = await getOptionIndexByText(page, optionValueOrLabel, selector)
      await dropdown.selectOption({ index: optionIndex })
    }

    const selectedValue = await dropdown.inputValue();
    console.log(`Selected: ${selectedValue}`);
  })
}

/**
 * Close the modal if it is present on the page.
 * @param page 
 * @returns 
 */
export async function closeModalIfPresent(page: Page): Promise<void> {
  if (page.isClosed()) return;

  const selectors = [
    { name: 'Signup Modal', sel: '//div[@id="staticBackdrop"]//button[contains(@class,"close-signup-popup")]' },
    { name: 'Intent Cart Modal', sel: '//div[@id="mcp-exit-intent-cart"]//button[@class="close-btn"]' },
    { name: 'Popup Container', sel: '//div[@class="popup-container"]//button[@class="close-btn"]' },
    { name: 'Back Drop Label', sel: '//div[@id="staticBackdrop"]//button[@aria-label="Close"]' },
    { name: 'MCP Banner', sel: '//button[@class="mcp-close"]' },
    { name: 'Amazone pay popup', sel: '(//div[@class="window-element"]//div)[1]' },
    { name: 'Header Banner Slide up', sel: '//div[@class="header-banner slide-up"]//button[@class="close"]' },
    { name: 'pwp popup', sel: '//button[@class="close pull-right"]' }
  ];

  for (const modal of selectors) {
    if (page.isClosed()) return;

    const loc = page.locator(modal.sel).first();
    let isVisible = false;

    try {
      isVisible = await loc.isVisible();
    } catch {
      return;
    }

    if (!isVisible) continue;

    console.log(`${modal.name} detected → Closing`);

    try {
      await page.evaluate((selector) => {
        const el = document.evaluate(
          selector,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue as HTMLElement;

        if (el) el.click();
      }, modal.sel);
    } catch {
      return;
    }

    for (let i = 0; i < 10; i++) {
      if (page.isClosed()) return;
      try {
        const stillVisible = await loc.isVisible().catch(() => false);
        if (!stillVisible) break;
      } catch {
        break;
      }
      await new Promise(r => setTimeout(r, 200));
    }
  }
}

/**
 * Close the PWP modal if it is present on the page.
 * @param page 
 */
export async function handlePwpModalIfPresent(page: Page) {
  const modal = page.locator('//div[contains(@class,"modal") and .//span[normalize-space(.)="Popup Tile PWP"]]');
  const closeButton = modal.locator('xpath=.//button[contains(@class,"close")]');

  await delay(2000)

  if (await closeButton.count() > 0 && await closeButton.isVisible()) {
    console.log("PWP Modal detected → Closing it...")
    await closeButton.click()
    await modal.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => { });
  }
}

/**
 * Go to the bottom of the page by scrolling.
 * @param page 
 * @param distance 
 * @param delay 
 */
export async function scrollToBottom(page: Page, distance: number = 100, delay: number = 100): Promise<void> {
  await page.evaluate(
    async ({ scrollDistance, scrollDelay }: { scrollDistance: number; scrollDelay: number }) => {
      await new Promise<void>((resolve) => {
        let totalHeight = 0;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, scrollDistance);
          totalHeight += scrollDistance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, scrollDelay);
      });
    },
    { scrollDistance: distance, scrollDelay: delay }
  );
}

export async function scrollToTop(page: Page) {
  await step('Scroll to top of the page', async () => {
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await delay(500)
  });
}

export async function scrollDownUntilVisible(
  page: Page,
  locator: Locator,
  maxScroll = 15
) {
  await step('Scroll down until locator visible', async () => {
    for (let i = 0; i < maxScroll; i++) {
      if (await locator.isVisible()) return;

      await page.mouse.wheel(0, 800);
      await page.waitForTimeout(300);
    }

    throw new Error('Element not visible after scrolling');
  });
}

/**
 * Lazy load products on the page by scrolling.
 * @param page 
 */
export async function lazyLoad(page: Page) {
  const delayMs = 800;
  const maxScroll = 50;

  for (let i = 0; i < maxScroll; i++) {
    const currentText = await page.locator('.current-products').innerText().catch(() => '0');
    const totalText = await page.locator('.total-products').innerText().catch(() => '0');

    const current = parseInt(currentText.replace(/\D/g, ''), 10) || 0;
    const total = parseInt(totalText.replace(/\D/g, ''), 10) || 0;

    console.log(`lazyLoad: ${current} of ${total}`);

    if (total > 0 && current >= total) {
      console.log('All products loaded');
      break;
    }

    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });

    await page.waitForTimeout(delayMs);
  }

  const rawText = await page.locator('.current-products').innerText();
  const cleanedText = rawText.replace(/[^\d]/g, '');
  const finalCurrent = cleanedText ? parseInt(cleanedText, 10) : 0;

  const finalTotal = parseInt(await page.locator('.total-products').innerText(), 10);

  await expect(finalCurrent).toBe(finalTotal);
}

export async function reload(page: Page) {
  await page.reload()
}

// Click a locator until another locator visible|hidden
export async function clickUntil(
  page: Page,
  clickTarget: Locator,
  conditionTarget: Locator,
  condition: WaitCondition = 'visible',
  options?: {
    maxTries?: number;
    delayMs?: number;
    timeoutMs?: number;
  }
): Promise<void> {
  const {
    maxTries = 10,
    delayMs = 500,
    timeoutMs = 5000,
  } = options || {};

  for (let i = 0; i < maxTries; i++) {
    await clickTarget.click();

    try {
      if (condition === 'visible') {
        await conditionTarget.waitFor({ state: 'visible', timeout: timeoutMs });
        return;
      } else if (condition === 'hidden') {
        await conditionTarget.waitFor({ state: 'hidden', timeout: timeoutMs });
        return;
      }
    } catch (e) { }

    await page.waitForTimeout(delayMs);
  }

  throw new Error(
    `Condition '${condition}' was not met after ${maxTries} clicks and timeout of ${timeoutMs}ms.`
  );
}

export async function openNewTab(page: Page, action: () => Promise<void>): Promise<Page> {
  const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    action(),
  ])

  await newPage.waitForLoadState('domcontentloaded')
  return newPage
}

type WaitCondition = 'visible' | 'hidden';