@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
 echo Install Node.js LTS from https://nodejs.org first.
 pause
 exit /b 1
)
if not exist node_modules (
 call npm ci
 if errorlevel 1 (pause & exit /b 1)
)
echo Website: http://localhost:3000
echo Keep this window open while using the local website.
call npm run dev -- --port 3000
pause
