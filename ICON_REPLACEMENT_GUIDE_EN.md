# Tapir Electron Application Icon Replacement Guide

## Quick Answer

You need to replace **13 icon files** in the `/public` folder (excluding dev versions).

## Files to Replace

### 1. Main Application Icons (4 files)
These icons are used in the Electron application window and when creating installers:

```
public/icon-192x192.png          - MAIN icon (192×192px) ⭐
public/icon-384x384.png          - Medium size (384×384px)
public/icon-512x512.png          - Large size (512×512px)
public/icon-electron-macos.png   - macOS specific icon
```

### 2. Square Icon Variants (3 files)
Used for PWA and some platforms:

```
public/icon-square-192x192.png   - Square 192×192px
public/icon-square-384x384.png   - Square 384×384px
public/icon-square-512x512.png   - Square 512×512px
```

### 3. Web/Browser Icons (5 files)
Used in browser and for tabs:

```
public/favicon.ico               - Windows icon format
public/favicon-16x16.png         - Small size (16×16px)
public/favicon-32x32.png         - Medium size (32×32px)
public/apple-touch-icon.png      - For Apple devices (180×180px)
public/mstile-150x150.png        - Windows tile (150×150px)
```

### 4. Additional Copy (1 file)
```
public/get/icon-electron-macos.png   - macOS copy
```

## Files NOT to Change (dev versions)

```
❌ public/icon-dev-192x192.png
❌ public/icon-dev-384x384.png
❌ public/icon-dev-512x512.png
❌ public/icon-square-dev-192x192.png
❌ public/icon-square-dev-384x384.png
❌ public/icon-square-dev-512x512.png
❌ public/apple-touch-icon-dev.png
```

## Icon Usage in Code

### 1. Electron Configuration
- **File**: `electron/main.cjs` (line 19)
  ```javascript
  icon: path.join(__dirname, '../public/icon-192x192.png')
  ```

### 2. Build Configuration
- **File**: `package.json` ("build" section)
  ```json
  "win": {
    "icon": "public/icon-192x192.png"
  },
  "mac": {
    "icon": "public/icon-192x192.png"
  },
  "linux": {
    "icon": "public/icon-192x192.png"
  }
  ```

### 3. Service Worker / Push Notifications
- **File**: `src/serviceWorker/pushNotification.ts`
  ```typescript
  icon: icon || 'icon-192x192.png',
  badge: 'icon-192x192.png',
  ```

## Replacement Instructions

### Simple Method:
1. Prepare new icons in the required sizes
2. Simply replace the files in the `public/` folder with new ones having the same names
3. Rebuild the application: `npm run electron:build`

### Example Commands:
```bash
# Copy your new icons (replace YOUR_NEW_ICONS with path to your files)
cp YOUR_NEW_ICONS/icon-192x192.png public/icon-192x192.png
cp YOUR_NEW_ICONS/icon-384x384.png public/icon-384x384.png
cp YOUR_NEW_ICONS/icon-512x512.png public/icon-512x512.png
# ... and so on for other files

# Rebuild the application
npm run electron:build
```

## Icon Size Requirements

| File | Size | Format | Notes |
|------|------|--------|-------|
| icon-192x192.png | 192×192 | PNG | Main icon ⭐ |
| icon-384x384.png | 384×384 | PNG | |
| icon-512x512.png | 512×512 | PNG | |
| icon-electron-macos.png | any | PNG | Preferably 512×512 or larger |
| icon-square-*.png | respective | PNG | Square variants |
| favicon.ico | 16×16, 32×32, 48×48 | ICO | Multi-size ICO file |
| favicon-16x16.png | 16×16 | PNG | |
| favicon-32x32.png | 32×32 | PNG | |
| apple-touch-icon.png | 180×180 | PNG | |
| mstile-150x150.png | 150×150 | PNG | |

## Verification After Replacement

After replacing icons, verify:
1. ✅ Icon displays in the running Electron application
2. ✅ Icon is correct in Windows installer (.exe)
3. ✅ Icon is correct in macOS installer (.dmg)
4. ✅ Icon is correct in Linux (.AppImage, .deb)
5. ✅ Favicon displays in web version

## Important Notes

1. **Most important file** is `icon-192x192.png`, it's used everywhere as the main icon
2. All icons should be in PNG format, except `favicon.ico`
3. After replacing files, you need to rebuild the application with `npm run electron:build`
4. Dev versions of icons (with `-dev` in the name) should not be changed
5. Icons are copied from `public/` to `dist/` during build

## Quick Check in Development Mode

```bash
npm run electron:dev
```

After launching, you should see the new icon in the application window.

---

**Total: 13 files to replace in `/public` folder**
