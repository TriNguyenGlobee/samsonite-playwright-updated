@echo off
REM Usage: run-tests <LOCALE> <ENV> <TEST_PATH>

if "%~1"=="" (
  echo Please provide LOCALE, ENV and TEST_PATH
  echo Example: run-tests jp stg tests/delivery
  exit /b 1
)

set LOCALE=%~1
set ENV=%~2
set TEST_PATH=%~3

echo Running tests with LOCALE=%LOCALE%, ENV=%ENV%, PATH=%TEST_PATH%
npx cross-env LOCALE=%LOCALE% ENV=%ENV% npx playwright test --project=chromium %TEST_PATH% --retries=3
