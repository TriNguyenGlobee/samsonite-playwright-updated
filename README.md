# 🎭 Playwright Automation Project
- Node.js (>=16)
- Git

## 🚀 Setting Guide
```bash
git clone https://github.com/TriNguyenGlobee/samsonite-playwright.git
cd samsonite-playwright
npm install
npx playwright install
npm install --save mailslurp-client
```

# Generate a single result file to Allure Report
allure generate --single-file allure-results\report-mm-dd-yy --clean 
allure open index.html

## Report
- Generate Allure report
npm run report:generate

- Open Allure report
npm run report:open

- Clear old result (allure-results + allure-report)
npm run report:clean

## With specific folder
- Generate Allure report
npx allure generate ./allure-results --clean -o ./allure-report

- Open Allure report
npx allure open ./allure-report

- Clear old result (allure-results + allure-report)
npm run report:clean+

# Run test
- Run all test:
npm run test

- Run a single test login.test.ts:
npm run test:login

- Run test with specified options: (example)
CMD: run-tests.bat jp stg tests/delivery
Powershell: .\run-tests.bat sg stg tests/delivery
OR:
npx cross-env ENV=stg LOCALE=jp npx playwright test --project=chromium tests/delivery

## Multi test
- Run each locale in turn
npm run test:multi

- Run multiple locales at the same time
npm run test:multiparallel

## Chrome 
- Run test with Chrome (ENV=dev) - default:
npm run test:chrome

- Run test with Chrome (ENV=stg):
npm run test:stg-chrome

## Firefox
- Run test with Firefox (ENV=dev) - default:
npm run test:firefox

- Run test with Firefox (ENV=stg):
npm run test:stg-firefox

## Webkit
- Run test with Webkit (ENV=dev) - default:
npm run test:webkit

- Run test with Webkit (ENV=stg):
npm run test:stg-webkit

## Run test-env.ts
- npx ts-node test-env.ts

## Saninty check
| Locale | Environment | Status | Notes |
|------|------------|--------|------|
| AU | dev / stg | Active | Full sanity |
| ID | dev / stg | Active | Full sanity |
| JP | dev / stg | Active | Full sanity |
| MY | dev / stg | Active | Full sanity |
| PH | dev / stg | Active | Full sanity |
| SG | dev / stg | Active | Full sanity |
| TW | dev / stg | Active | Full sanity |

## BV Integration
| Locale | Environment | Status |
|------|------------|--------|
| AU | dev | Active |
| JP | dev | Active |
| KR | dev | Active | 
| PH | dev | Active |
| SG | dev | Active |

## API KEY
api_key_home=MAILSLURP_API_KEY=sk_NEgxzWosA27kwxTx_UmfDbQZ8XFUnx7yURAJoCPisWewmiJj63YMrkjIaKOrzLx9T3XPjYKeg62huiJx5