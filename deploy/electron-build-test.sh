#!/bin/bash

# Electron Build Test Script
# This script helps test the Electron build process

echo "🔍 Checking prerequisites..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found"
    echo "📝 Creating .env from .env.example..."
    cp .env.example .env
    echo "⚠️  Please edit .env and add your TELEGRAM_API_ID and TELEGRAM_API_HASH"
    echo "   Get these from: https://my.telegram.org"
    exit 1
fi

# Check if API credentials are set
if ! grep -q "TELEGRAM_API_ID=." .env || ! grep -q "TELEGRAM_API_HASH=." .env; then
    echo "⚠️  API credentials not configured in .env"
    echo "   Please add your TELEGRAM_API_ID and TELEGRAM_API_HASH"
    echo "   Get these from: https://my.telegram.org"
    exit 1
fi

echo "✅ Prerequisites check passed"
echo ""
echo "🚀 Starting Electron build..."
echo ""

# Run the build
npm run electron:build

echo ""
echo "✅ Build complete!"
echo "📦 Check the dist-electron/ directory for installers"
