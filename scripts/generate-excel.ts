import ExcelJS from 'exceljs';
import * as fs from 'fs';
import * as path from 'path';

const ALLURE_RESULTS = './allure-results';
const OUTPUT = './excel-report/playwright-report.xlsx';

function sanitizeSheetName(name: string): string {
    return name.replace(/[\\/*?:[\]]/g, '').substring(0, 31);
}

function applyStatusStyle(cell: ExcelJS.Cell, status?: string) {
    if (!status) return;

    const s = status.toUpperCase();

    if (s === 'PASSED') {
        cell.font = { bold: true, color: { argb: 'FF008000' } };
    }

    if (s === 'FAILED' || s === 'BROKEN') {
        cell.font = { bold: true, color: { argb: 'FFFF0000' } };
    }
}

function getSuiteName(data: any): string {
    const subSuite = data.labels?.find((l: any) => l.name === 'subSuite')?.value;
    const suite = data.labels?.find((l: any) => l.name === 'suite')?.value;

    if (subSuite) return subSuite;
    if (suite) return path.basename(suite);

    return 'Unknown Suite';
}

function collectSteps(steps: any[] = [], result: any[] = []) {
    for (const step of steps) {
        if (typeof step.name === 'string' && step.name.startsWith('[STEP]')) {
            result.push(step);
        }

        if (Array.isArray(step.steps)) {
            collectSteps(step.steps, result);
        }
    }
    return result;
}

function findScreenshotFromStep(step: any): any | null {
    if (Array.isArray(step.attachments)) {
        const img = step.attachments.find(
            (a: any) => a.type === 'image/png'
        );
        if (img) return img;
    }

    if (Array.isArray(step.steps)) {
        for (const child of step.steps) {
            const found = findScreenshotFromStep(child);
            if (found) return found;
        }
    }

    return null;
}

async function generateExcel() {
    if (!fs.existsSync(ALLURE_RESULTS)) {
        throw new Error('allure-results folder not found');
    }

    const workbook = new ExcelJS.Workbook();

    const summary = workbook.addWorksheet('Summary');

    summary.columns = [
        { header: 'Page/Features', key: 'feature', width: 40 },
        { header: 'Status (Passed / Failed)', key: 'status', width: 30 },
    ];

    summary.getRow(1).eachCell(cell => {
        cell.font = { bold: true };
    });

    const files = fs
        .readdirSync(ALLURE_RESULTS)
        .filter(f => f.endsWith('-result.json'));

    const latestResults = new Map<string, any>();

    for (const file of files) {
        const data = JSON.parse(
            fs.readFileSync(path.join(ALLURE_RESULTS, file), 'utf-8')
        );

        const key = data.historyId || data.testCaseId;
        if (!key) continue;

        if (!latestResults.has(key)) {
            latestResults.set(key, data);
        } else {
            const existing = latestResults.get(key);
            if ((data.start ?? 0) > (existing.start ?? 0)) {
                latestResults.set(key, data);
            }
        }
    }

    const suiteMap = new Map<
        string,
        {
            sheet: ExcelJS.Worksheet;
            passed: number;
            failed: number;
        }
    >();

    let totalPassed = 0;
    let totalFailed = 0;

    for (const data of latestResults.values()) {
        const testStatus: string = data.status;
        const rawSuiteName = getSuiteName(data);
        const sheetName = sanitizeSheetName(rawSuiteName);

        if (!suiteMap.has(sheetName)) {
            const sheet = workbook.addWorksheet(sheetName);

            sheet.columns = [
                { header: 'Test Case', key: 'testCase', width: 45 },
                { header: 'Step', key: 'step', width: 55 },
                { header: 'Step Status', key: 'stepStatus', width: 14 },
                { header: 'Screenshot', key: 'screenshot', width: 22 },
            ];

            sheet.getRow(1).eachCell(cell => {
                cell.font = { bold: true };
            });

            sheet.getColumn(1).alignment = {
                wrapText: true,
                vertical: 'middle',
                horizontal: 'center',
            };

            suiteMap.set(sheetName, {
                sheet,
                passed: 0,
                failed: 0,
            });
        }

        const suiteData = suiteMap.get(sheetName)!;
        const sheet = suiteData.sheet;

        const testName: string = data.name;
        const steps = collectSteps(data.steps ?? []);

        let startRow = 0;

        for (const step of steps) {
            const cleanStepName = step.name.replace('[STEP]', '').trim();

            const row = sheet.addRow({
                testCase: testName,
                step: cleanStepName,
                stepStatus: step.status,
            });

            applyStatusStyle(row.getCell('stepStatus'), step.status);

            if (step.status === 'passed') {
                suiteData.passed++;
                totalPassed++;
            }

            if (step.status === 'failed' || step.status === 'broken') {
                suiteData.failed++;
                totalFailed++;
            }

            const screenshot = findScreenshotFromStep(step);

            const isFinalState = step.name.includes('[FINAL STATE]');

            if (screenshot) {
                if (isFinalState && testStatus === 'passed') {
                    continue;
                }

                const imagePath = path.join(
                    ALLURE_RESULTS,
                    screenshot.source
                );

                if (fs.existsSync(imagePath)) {
                    const imageId = workbook.addImage({
                        filename: imagePath,
                        extension: 'png',
                    });

                    sheet.addImage(imageId, {
                        tl: { col: 3, row: row.number - 1 },
                        ext: { width: 140, height: 110 },
                    });

                    sheet.getRow(row.number).height = 95;
                }
            }

            if (!startRow) startRow = row.number;
        }

        const lastRow = sheet.lastRow?.number ?? startRow;
        if (lastRow > startRow && startRow !== 0) {
            sheet.mergeCells(`A${startRow}:A${lastRow}`);
        }
    }

    for (const [sheetName, data] of suiteMap.entries()) {
        const row = summary.addRow({
            feature: sheetName,
            status: `${data.passed} Passed / ${data.failed} Failed`,
        });

        row.getCell(1).value = {
            text: sheetName,
            hyperlink: `#'${sheetName}'!A1`,
        };

        if (data.failed > 0) {
            row.eachCell(cell => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFFFC7CE' },
                };
                cell.font = { bold: true, color: { argb: 'FF9C0006' } };
            });
        }
    }

    const totalRow = summary.addRow({
        feature: 'TOTAL',
        status: `${totalPassed} Passed / ${totalFailed} Failed`,
    });

    totalRow.eachCell(cell => {
        cell.font = { bold: true };
    });

    fs.mkdirSync('./excel-report', { recursive: true });
    await workbook.xlsx.writeFile(OUTPUT);

    console.log(`Excel report generated: ${OUTPUT}`);
}

generateExcel().catch(console.error);