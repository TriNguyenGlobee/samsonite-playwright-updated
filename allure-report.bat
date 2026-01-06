@echo off
echo Starting Allure Report server...
start cmd /k "npx http-server ./allure-report -p 8080"
start http://localhost:8080
