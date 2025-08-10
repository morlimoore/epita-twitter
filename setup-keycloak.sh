#!/bin/bash

echo "🚀 EPITA Twitter - Keycloak Setup Script"
echo "========================================"

# Check if Keycloak is running
echo "Checking if Keycloak is running..."
if curl -s http://localhost:8080/auth > /dev/null; then
    echo "✅ Keycloak is running on http://localhost:8080"
else
    echo "❌ Keycloak is not running. Please start Keycloak first."
    echo "   You can download it from: https://www.keycloak.org/downloads"
    exit 1
fi

# Check if APIMan is running
echo "Checking if APIMan is running..."
if curl -s http://localhost:8080/apimanui > /dev/null; then
    echo "✅ APIMan is running on http://localhost:8080/apimanui"
else
    echo "❌ APIMan is not running. Please start APIMan first."
    exit 1
fi

echo ""
echo "📋 Setup Checklist:"
echo "=================="
echo "1. ✅ Keycloak server is running"
echo "2. ✅ APIMan server is running"
echo "3. ⏳ Manual steps required:"
echo "   - Create Keycloak realm 'epita-twitter'"
echo "   - Configure client application"
echo "   - Set up users and roles"
echo "   - Connect to ApacheDS"
echo "   - Configure APIMan OIDC policy"
echo ""
echo "📖 Please follow the detailed instructions in KEYCLOAK_SETUP.md"
echo ""
echo "🔧 Next steps:"
echo "1. Open http://localhost:8080/auth in your browser"
echo "2. Create the 'epita-twitter' realm"
echo "3. Configure the client application"
echo "4. Set up users and roles"
echo "5. Connect to ApacheDS"
echo "6. Configure APIMan OIDC policy"
echo ""
echo "📚 For detailed instructions, see: KEYCLOAK_SETUP.md" 