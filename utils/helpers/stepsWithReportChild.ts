import { test } from '../../src/fixtures/test-fixture';
import { logExcelStep } from './excelLogger';
import { screenshotAndAttach } from './helpers';
import type { Page, TestInfo } from '@playwright/test';

export async function stepsWithReportChild(
  page: Page,
  testInfo: TestInfo,
  parentStep: string,
  stepName: string,
  fn: () => Promise<void>
) {
  const testcase = testInfo.titlePath.join(' > ');
  const allureStepName = `↳ ${stepName}`;

  await test.step(allureStepName, async () => {
    try {
      await fn();

      logExcelStep({
        testcase,
        step: `${parentStep} > ${stepName}`,
        status: 'PASSED'
      });
    } catch (error) {
      const screenshotPath =
        `./screenshots/${testcase}/${parentStep}-${stepName}-FAILED.png`;

      await screenshotAndAttach(page, screenshotPath, allureStepName);

      logExcelStep({
        testcase,
        step: `${parentStep} > ${stepName}`,
        status: 'FAILED',
        screenshot: screenshotPath
      });

      throw error;
    }
  });
}