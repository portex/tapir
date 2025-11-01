# Electron Build for Tapir

This project now supports building desktop applications using Electron, which creates native installers including Windows EXE files.

## Prerequisites

Before building, you need to:

1. Copy `.env.example` to `.env` in the root directory
2. Obtain API credentials from [my.telegram.org](https://my.telegram.org)
3. Add your `TELEGRAM_API_ID` and `TELEGRAM_API_HASH` to the `.env` file

## Development

To run the app in Electron development mode:

```bash
npm run electron:dev
```

This will:
- Start the webpack dev server
- Launch Electron pointing to the dev server
- Enable hot reloading for development

## Building

To create production builds:

```bash
npm run electron:build
```

Or use the helper script that checks prerequisites:

```bash
bash deploy/electron-build-test.sh
```

This will:
1. Build the production web bundle
2. Create platform-specific installers

### Build Output

The build artifacts will be created in the `dist-electron/` directory:

- **Windows**: `.exe` installer (NSIS) and portable `.exe`
- **macOS**: `.dmg` and `.zip` files
- **Linux**: `.AppImage` and `.deb` packages

### Windows Build

The Windows build creates two types of executables:
1. **NSIS Installer** - Traditional Windows installer with installation wizard
2. **Portable** - Standalone executable that doesn't require installation

## Features

The Electron build includes:

- ✅ Native window controls
- ✅ System tray integration ready
- ✅ Deep link support for `tg://` protocol
- ✅ Auto-updates (can be configured)
- ✅ Context isolation and sandboxing for security
- ✅ Cross-platform support (Windows, macOS, Linux)

## Configuration

Electron-specific configuration can be found in:
- `package.json` - Under the `build` section
- `electron/main.cjs` - Main process code (uses port 1234 to match webpack dev server)
- `electron/preload.cjs` - Preload script for security

**Note**: The `main` field in `package.json` is set to `electron/main.cjs` for Electron builds. This doesn't affect web builds as they use webpack's entry point.

## Comparison with Tauri

This project also includes Tauri builds. Here's a comparison:

| Feature | Electron | Tauri |
|---------|----------|-------|
| Bundle Size | Larger (~100-150MB) | Smaller (~10-20MB) |
| Memory Usage | Higher | Lower |
| Platform Support | Excellent | Good |
| Web Tech Support | Full Chromium | System WebView |
| Build Speed | Fast | Slower (Rust compilation) |
| Maturity | Very Mature | Growing |

Choose Electron for maximum compatibility and familiar web APIs, or Tauri for smaller bundle size and better performance.
