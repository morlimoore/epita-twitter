@echo off
echo 🚀 EPITA Twitter - Keycloak Setup Script
echo ========================================

echo Checking if Keycloak is running...
curl -s http://localhost:8080/auth >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Keycloak is running on http://localhost:8080
) else (
    echo ❌ Keycloak is not running. Please start Keycloak first.
    echo    You can download it from: https://www.keycloak.org/downloads
    pause
    exit /b 1
)

echo Checking if APIMan is running...
curl -s http://localhost:8080/apimanui >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ APIMan is running on http://localhost:8080/apimanui
) else (
    echo ❌ APIMan is not running. Please start APIMan first.
    pause
    exit /b 1
)

echo.
echo 📋 Setup Checklist:
echo ==================
echo 1. ✅ Keycloak server is running
echo 2. ✅ APIMan server is running
echo 3. ⏳ Manual steps required:
echo    - Create Keycloak realm 'epita-twitter'
echo    - Configure client application
echo    - Set up users and roles
echo    - Connect to ApacheDS
echo    - Configure APIMan OIDC policy
echo.
echo 📖 Please follow the detailed instructions in KEYCLOAK_SETUP.md
echo.
echo 🔧 Next steps:
echo 1. Open http://localhost:8080/auth in your browser
echo 2. Create the 'epita-twitter' realm
echo 3. Configure the client application
echo 4. Set up users and roles
echo 5. Connect to ApacheDS
echo 6. Configure APIMan OIDC policy
echo.
echo 📚 For detailed instructions, see: KEYCLOAK_SETUP.md
pause 