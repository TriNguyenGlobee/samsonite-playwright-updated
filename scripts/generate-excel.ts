import ExcelJS from 'exceljs';
import * as fs from 'fs';
import * as path from 'path';

const ALLURE_RESULTS = './allure-results';
const OUTPUT = './excel-report/playwright-report.xlsx';

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

function collectSteps(steps: any[] = [], result: any[] = []) {
    for (const step of steps) {
        if (
            typeof step.name === 'string' &&
            step.name.startsWith('[STEP]')
            //(step.name.startsWith('[STEP]') || step.name.startsWith('[ChSTEP]'))
        ) {
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

function getTestLevelScreenshot(testResult: any): any | null {
    if (!Array.isArray(testResult.attachments)) return null;

    return testResult.attachments.find(
        (a: any) => a.type === 'image/png'
    );
}

async function generateExcel() {
    if (!fs.existsSync(ALLURE_RESULTS)) {
        throw new Error('allure-results folder not found');
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Test Report');

    sheet.columns = [
        { header: 'Test Case', key: 'testCase', width: 45 },
        //{ header: 'Test Status', key: 'testStatus', width: 14 },
        { header: 'Step', key: 'step', width: 55 },
        //{ header: 'Child Step', key: 'childStep', width: 55 },
        { header: 'Step Status', key: 'stepStatus', width: 14 },
        { header: 'Screenshot', key: 'screenshot', width: 22 },
        //{ header: 'Note', key: 'note', width: 55 },
    ];

    sheet.getRow(1).eachCell(cell => {
        cell.font = { bold: true };
    });

    sheet.getColumn('testCase').alignment = {
        wrapText: true,
        vertical: 'middle',
        horizontal: 'center',
    };
    //sheet.getColumn('note').alignment = { wrapText: true };

    let currentTestCase = '';
    let testCaseStartRow = 2;

    let totalTests = 0;
    let passedTests = 0;
    let failedTests = 0;

    const files = fs
        .readdirSync(ALLURE_RESULTS)
        .filter(f => f.endsWith('-result.json'));

    for (const file of files) {
        const data = JSON.parse(
            fs.readFileSync(path.join(ALLURE_RESULTS, file), 'utf-8')
        );

        const testName = data.name;
        const testStatus = data.status;

        totalTests++;
        if (testStatus === 'passed') passedTests++;
        if (testStatus === 'failed' || testStatus === 'broken') failedTests++;

        const steps = collectSteps(data.steps ?? []);

        for (const step of steps) {
            const isParent = step.name.startsWith('[STEP]');
            const stepName = step.name
                .replace('[STEP]', '')
                //.replace('[ChSTEP]', '')
                .trim();

            const note =
                step.status === 'failed'
                    ? step.statusDetails?.message ||
                    data.statusDetails?.message ||
                    ''
                    : '';

            const row = sheet.addRow({
                testCase: testName,
                //testStatus,
                step: isParent ? stepName : '',
                //childStep: !isParent ? stepName : '',
                stepStatus: step.status,
                //note,
            });

            //applyStatusStyle(row.getCell('testStatus'), testStatus);
            applyStatusStyle(row.getCell('stepStatus'), step.status);

            const screenshot = findScreenshotFromStep(step);
            if (screenshot) {
                const imagePath = path.join(ALLURE_RESULTS, screenshot.source);

                if (fs.existsSync(imagePath)) {
                    const imageId = workbook.addImage({
                        filename: imagePath,
                        extension: 'png',
                    });

                    sheet.addImage(imageId, {
                        tl: { col: 3, row: row.number - 1 },
                        ext: { width: 140, height: 120 },
                    });

                    sheet.getRow(row.number).height = 100;
                }
            }

            const rowNumber = row.number;

            if (!currentTestCase) {
                currentTestCase = testName;
                testCaseStartRow = rowNumber;
            }

            if (testName !== currentTestCase) {
                if (rowNumber - 1 > testCaseStartRow) {
                    sheet.mergeCells(
                        `A${testCaseStartRow}:A${rowNumber - 1}`
                    );
                }
                currentTestCase = testName;
                testCaseStartRow = rowNumber;
            }
        }
    }

    const lastRow = sheet.lastRow?.number ?? testCaseStartRow;
    if (lastRow > testCaseStartRow) {
        sheet.mergeCells(`A${testCaseStartRow}:A${lastRow}`);
    }

    /* -------------------- Summary sheet -------------------- */
    const summary = workbook.addWorksheet('Summary');

    summary.columns = [
        { header: 'Metric', key: 'metric', width: 30 },
        { header: 'Count', key: 'count', width: 15 },
    ];

    summary.getRow(1).eachCell(cell => {
        cell.font = { bold: true };
    });

    summary.addRow({ metric: 'Total Test Cases', count: totalTests });
    summary.addRow({ metric: 'Passed', count: passedTests });
    summary.addRow({ metric: 'Failed', count: failedTests });

    applyStatusStyle(summary.getCell('B3'), 'passed');
    applyStatusStyle(summary.getCell('B4'), 'failed');

    fs.mkdirSync('./excel-report', { recursive: true });
    await workbook.xlsx.writeFile(OUTPUT);

    console.log(`Excel report generated: ${OUTPUT}`);
}

generateExcel().catch(console.error);