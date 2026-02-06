import fs from 'fs';

const FILE_PATH = './excel-report/steps.json';

export type ExcelStep = {
  testcase: string;
  step: string;
  status: 'PASSED' | 'FAILED';
  screenshot?: string;
};

export function logExcelStep(step: ExcelStep) {
  const data = fs.existsSync(FILE_PATH)
    ? JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'))
    : [];

  data.push(step);

  fs.mkdirSync('./excel-report', { recursive: true });
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}