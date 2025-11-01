# Руководство по замене иконок приложения Tapir Electron

## Краткий ответ на ваш вопрос

Вам нужно заменить **13 файлов иконок** в папке `/public` (не включая dev-версии).

## Список файлов для замены

### 1. Основные иконки приложения (4 файла)
Эти иконки используются в окне Electron приложения и при создании установщиков:

```
public/icon-192x192.png          - ГЛАВНАЯ иконка (192×192px) ⭐
public/icon-384x384.png          - Средний размер (384×384px)
public/icon-512x512.png          - Большой размер (512×512px)
public/icon-electron-macos.png   - Специальная для macOS
```

### 2. Квадратные варианты иконок (3 файла)
Используются для PWA и некоторых платформ:

```
public/icon-square-192x192.png   - Квадратная 192×192px
public/icon-square-384x384.png   - Квадратная 384×384px
public/icon-square-512x512.png   - Квадратная 512×512px
```

### 3. Веб/Браузерные иконки (5 файлов)
Используются в браузере и для вкладок:

```
public/favicon.ico               - Windows формат иконки
public/favicon-16x16.png         - Маленький размер (16×16px)
public/favicon-32x32.png         - Средний размер (32×32px)
public/apple-touch-icon.png      - Для устройств Apple (180×180px)
public/mstile-150x150.png        - Плитка Windows (150×150px)
```

### 4. Дополнительная копия (1 файл)
```
public/get/icon-electron-macos.png   - Копия для macOS
```

## Файлы, которые НЕ НАДО менять (dev-версии)

```
❌ public/icon-dev-192x192.png
❌ public/icon-dev-384x384.png
❌ public/icon-dev-512x512.png
❌ public/icon-square-dev-192x192.png
❌ public/icon-square-dev-384x384.png
❌ public/icon-square-dev-512x512.png
❌ public/apple-touch-icon-dev.png
```

## Где используются иконки в коде

### 1. Electron конфигурация
- **Файл**: `electron/main.cjs` (строка 19)
  ```javascript
  icon: path.join(__dirname, '../public/icon-192x192.png')
  ```

### 2. Конфигурация сборки
- **Файл**: `package.json` (секция "build")
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

### 3. Service Worker / Push уведомления
- **Файл**: `src/serviceWorker/pushNotification.ts`
  ```typescript
  icon: icon || 'icon-192x192.png',
  badge: 'icon-192x192.png',
  ```

## Инструкция по замене

### Простой способ:
1. Подготовьте новые иконки в нужных размерах
2. Просто замените файлы в папке `public/` на новые с такими же именами
3. Пересоберите приложение: `npm run electron:build`

### Пример команд:
```bash
# Скопируйте ваши новые иконки (замените YOUR_NEW_ICONS на путь к вашим файлам)
cp YOUR_NEW_ICONS/icon-192x192.png public/icon-192x192.png
cp YOUR_NEW_ICONS/icon-384x384.png public/icon-384x384.png
cp YOUR_NEW_ICONS/icon-512x512.png public/icon-512x512.png
# ... и так далее для остальных файлов

# Пересоберите приложение
npm run electron:build
```

## Требования к размерам иконок

| Файл | Размер | Формат | Примечание |
|------|--------|--------|-----------|
| icon-192x192.png | 192×192 | PNG | Основная иконка ⭐ |
| icon-384x384.png | 384×384 | PNG | |
| icon-512x512.png | 512×512 | PNG | |
| icon-electron-macos.png | любой | PNG | Предпочтительно 512×512 или больше |
| icon-square-*.png | соответствующие | PNG | Квадратные варианты |
| favicon.ico | 16×16, 32×32, 48×48 | ICO | Multi-size ICO файл |
| favicon-16x16.png | 16×16 | PNG | |
| favicon-32x32.png | 32×32 | PNG | |
| apple-touch-icon.png | 180×180 | PNG | |
| mstile-150x150.png | 150×150 | PNG | |

## Проверка после замены

После замены иконок проверьте:
1. ✅ Иконка отображается в запущенном Electron приложении
2. ✅ Иконка правильная в установщике Windows (.exe)
3. ✅ Иконка правильная в установщике macOS (.dmg)
4. ✅ Иконка правильная в Linux (.AppImage, .deb)
5. ✅ Favicon отображается в веб-версии

## Важные замечания

1. **Самый важный файл** - это `icon-192x192.png`, он используется везде как основная иконка
2. Все иконки должны быть в формате PNG, кроме `favicon.ico`
3. После замены файлов нужно пересобрать приложение командой `npm run electron:build`
4. Dev-версии иконок (с `-dev` в названии) трогать не нужно
5. Иконки копируются из `public/` в `dist/` при сборке

## Быстрая проверка в режиме разработки

```bash
npm run electron:dev
```

После запуска вы должны увидеть новую иконку в окне приложения.

---

**Итого: 13 файлов для замены в папке `/public`**
