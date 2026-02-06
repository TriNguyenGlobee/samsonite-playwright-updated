import { test } from '../../src/fixtures/test-fixture';
import { shouldRunForLocale, getLocales } from './localeHelper';
import { logExcelStep } from './excelLogger';
import { screenshotAndAttach } from './helpers';
import type { Page, TestInfo } from '@playwright/test';

const ACTIVE_LOCALES = getLocales();

export async function stepsWithReport(
  page: Page,
  testInfo: TestInfo,
  locales: string[],
  stepName: string,
  fn: () => Promise<void>
) {
  if (!shouldRunForLocale(locales, ACTIVE_LOCALES)) {
    console.log(`Skipped step '${stepName}' (LOCALE=${process.env.LOCALE})`);
    return;
  }

  const testcase = testInfo.titlePath.join(' > ');

  await test.step(stepName, async () => {
    try {
      await fn();

      logExcelStep({
        testcase,
        step: stepName,
        status: 'PASSED'
      });
    } catch (error) {
      const screenshotPath =
        `./screenshots/${testcase}/${stepName}-FAILED.png`;

      await screenshotAndAttach(page, screenshotPath, stepName);

      logExcelStep({
        testcase,
        step: stepName,
        status: 'FAILED',
        screenshot: screenshotPath
      });

      throw error;
    }
  });
}