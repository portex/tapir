# Quick Icon Replacement Reference / Быстрый справочник замены иконок

## TL;DR - Список файлов / File List

### ✅ ЗАМЕНИТЬ / REPLACE (13 files):

```
public/
├── icon-192x192.png ⭐ ГЛАВНАЯ/MAIN
├── icon-384x384.png
├── icon-512x512.png
├── icon-electron-macos.png
├── icon-square-192x192.png
├── icon-square-384x384.png
├── icon-square-512x512.png
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
├── mstile-150x150.png
└── get/
    └── icon-electron-macos.png
```

### ❌ НЕ ТРОГАТЬ / DO NOT TOUCH (dev versions):

```
public/
├── icon-dev-192x192.png
├── icon-dev-384x384.png
├── icon-dev-512x512.png
├── icon-square-dev-192x192.png
├── icon-square-dev-384x384.png
├── icon-square-dev-512x512.png
└── apple-touch-icon-dev.png
```

## Размеры / Sizes

| File | Size | Priority |
|------|------|----------|
| icon-192x192.png | 192×192px | ⭐⭐⭐ HIGH |
| icon-384x384.png | 384×384px | ⭐⭐ MEDIUM |
| icon-512x512.png | 512×512px | ⭐⭐ MEDIUM |
| icon-electron-macos.png | 512×512px+ | ⭐⭐ MEDIUM |
| icon-square-192x192.png | 192×192px | ⭐ LOW |
| icon-square-384x384.png | 384×384px | ⭐ LOW |
| icon-square-512x512.png | 512×512px | ⭐ LOW |
| favicon.ico | 16+32+48px | ⭐ LOW |
| favicon-16x16.png | 16×16px | ⭐ LOW |
| favicon-32x32.png | 32×32px | ⭐ LOW |
| apple-touch-icon.png | 180×180px | ⭐ LOW |
| mstile-150x150.png | 150×150px | ⭐ LOW |

## После замены / After Replacement

```bash
# Сборка / Build
npm run electron:build

# Или только проверка / Or just test
npm run electron:dev
```

## Полная документация / Full Documentation

- 🇷🇺 Русский: [ICON_REPLACEMENT_GUIDE.md](./ICON_REPLACEMENT_GUIDE.md)
- 🇬🇧 English: [ICON_REPLACEMENT_GUIDE_EN.md](./ICON_REPLACEMENT_GUIDE_EN.md)
