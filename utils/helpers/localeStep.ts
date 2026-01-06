import { getLocales, shouldRunForLocale } from "./localeHelper";
import { test } from "../../src/fixtures/test-fixture";

const ACTIVE_LOCALES = getLocales();

export async function steps(
    locales: string[],
    name: string,
    fn: () => Promise<void>
) {
    if (shouldRunForLocale(locales, ACTIVE_LOCALES)) {
        await test.step(name, fn);
    } else {
        console.log(`Skipped step '${name}' (LOCALE=${process.env.LOCALE})`);
    }
}
