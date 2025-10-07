@echo off
echo 🚀🚀🚀 UNIMORE BOT SETUP - FRESH LAPTOP 🚀🚀🚀
echo.

echo 📋 STEP 1: Checking Python installation...
python --version
if %errorlevel% neq 0 (
    echo ❌ Python not found! Please install Python 3.8+ from python.org
    pause
    exit /b 1
)

echo 📋 STEP 2: Checking pip...
pip --version
if %errorlevel% neq 0 (
    echo ❌ pip not found! Please reinstall Python with pip
    pause
    exit /b 1
)

echo 📋 STEP 3: Installing required packages...
pip install selenium
pip install pandas
pip install webdriver-manager

echo 📋 STEP 4: Checking Chrome browser...
where chrome
if %errorlevel% neq 0 (
    echo ⚠️ Chrome not found in PATH. Please install Google Chrome
    echo You can download it from: https://www.google.com/chrome/
)

echo 📋 STEP 5: Creating project directory...
if not exist "unimore_bot" mkdir unimore_bot
cd unimore_bot

echo 📋 STEP 6: Setup complete!
echo.
echo ✅ READY TO RUN BOT!
echo.
echo 🎯 NEXT STEPS:
echo 1. Copy unimore_realtime_clean.py to this directory
echo 2. Run: python unimore_realtime_clean.py
echo.
echo 💡 REQUIREMENTS SUMMARY:
echo - Python 3.8+ ✅
echo - Selenium package ✅
echo - Pandas package ✅
echo - Google Chrome browser
echo - Stable internet connection
echo - (Optional) Italy VPN for better access
echo.
pause