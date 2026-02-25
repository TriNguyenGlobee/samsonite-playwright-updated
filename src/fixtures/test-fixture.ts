import { test as base, Page } from "@playwright/test";
import { step } from "allure-js-commons";
import { Config } from "../../config/env.config";
import { createLoginPage } from "../factories/login.factory";
import { startModalWatchdog } from "../../utils/helpers/modalWatchdog";
import { getLocales } from "../../utils/helpers/localeHelper";
import { delay, PageUtils } from "../../utils/helpers/helpers";
import { Eyes, Configuration, BatchInfo } from "@applitools/eyes-playwright";

type MyFixtures = {
  user: { username: string; password: string };
  basicAuthPage: Page;
  basicAuthPageNoWatchdog: Page;
  loggedInPage: Page;
  locale: string;
  eyes: Eyes;
};

export const test = base.extend<MyFixtures>({
  locale: async ({ }, use) => {
    const locales = getLocales();
    await use(locales[0]);
  },

  user: async ({ }, use) => {
    await use(Config.credentials);
  },

  basicAuthPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      ...(Config.basicAuthUser && Config.basicAuthPass
        ? {
          httpCredentials: {
            username: Config.basicAuthUser,
            password: Config.basicAuthPass,
          },
        }
        : {}),

      permissions: [],
    });

    const page = await context.newPage();
    const stopWatchdog = await startModalWatchdog(page);

    await step("Go to base URL", async () => {
      await page.goto(Config.baseURL, { waitUntil: "domcontentloaded" });
    });

    await use(page);

    await stopWatchdog()
    await page.close({ runBeforeUnload: false }).catch(() => { });
    await context.close().catch(() => { });
  },

  basicAuthPageNoWatchdog: async ({ browser }, use) => {
    const context = await browser.newContext({
      ...(Config.basicAuthUser && Config.basicAuthPass
        ? {
          httpCredentials: {
            username: Config.basicAuthUser,
            password: Config.basicAuthPass,
          },
        }
        : {}),
      permissions: [],
    });

    const page = await context.newPage();

    await step("Go to base URL (no watchdog)", async () => {
      await page.goto(Config.baseURL, { waitUntil: "domcontentloaded" });
    });

    await use(page);

    await page.close({ runBeforeUnload: false }).catch(() => { });
    await context.close().catch(() => { });
  },

  loggedInPage: async ({ browser, user }, use) => {
    const context = await browser.newContext({
      ...(Config.basicAuthUser && Config.basicAuthPass
        ? {
          httpCredentials: {
            username: Config.basicAuthUser,
            password: Config.basicAuthPass,
          },
        }
        : {}),

      permissions: [],
    });

    const page = await context.newPage();
    const loginPage = createLoginPage(page);
    const stopWatchdog = await startModalWatchdog(page);

    await step("Go to Main Page", async () => {
      await page.goto(Config.baseURL, { waitUntil: "domcontentloaded" });
      await PageUtils.waitForDomAvailable(page)
    });

    await step("Go to login page", async () => {
      await delay(1500)
      await loginPage.goToLoginRegisterPage();
    });

    await step(`Login with valid account: ${user.username}`, async () => {
      await loginPage.login(user.username, user.password);
    });

    await use(page);

    await stopWatchdog()
    await page.close({ runBeforeUnload: false }).catch(() => { });
    await context.close().catch(() => { });
  },

  eyes: async ({ }, use) => {
    const eyes = new Eyes();

    const config = new Configuration();
    config.setApiKey(process.env.APPLITOOLS_API_KEY!);
    config.setAppName("My Samsonite");
    config.setBatch(new BatchInfo("Samsonite Visual Tests"));

    eyes.setConfiguration(config);

    try {
      await use(eyes);
    } finally {
      await eyes.abortIfNotClosed();
    }
  },
});

export { expect } from "@playwright/test";
