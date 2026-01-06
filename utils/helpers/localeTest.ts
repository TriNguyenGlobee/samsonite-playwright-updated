import { TestInfo } from "@playwright/test";
import { test as base } from "../../src/fixtures/test-fixture";
import { getLocales, shouldRunForLocale } from "./localeHelper";

const ACTIVE_LOCALES = getLocales();

export function tests(
    locales: string[],
    name: string,
    fn: (args: any, testInfo: TestInfo) => Promise<void> | void
) {
    if (shouldRunForLocale(locales, ACTIVE_LOCALES)) {
        base(name, fn);
    } else {
        base.skip(
            name,
            async ({ }: any, testInfo: TestInfo) => {
                console.log(`Skipped test '${testInfo.title}' (LOCALE=${process.env.LOCALE})`);
            }
        );
    }
}
