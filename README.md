# Tapir — Инструкция по сборке

## Структура проекта
```
tapir/
├── electron/          ← Windows + macOS + Linux
│   ├── main.js
│   ├── package.json
│   ├── icon.ico       ← иконка (Windows)
│   ├── icon.png       ← иконка (macOS/Linux)
│   └── entitlements.mac.plist
└── android/           ← Android APK
    ├── app/
    │   ├── build.gradle
    │   └── src/main/
    │       ├── AndroidManifest.xml
    │       ├── java/com/tapir/app/
    │       │   ├── MainActivity.java
    │       │   └── ScreenShareService.java
    │       └── res/
    │           ├── layout/activity_main.xml
    │           ├── mipmap-*/ic_launcher.png
    │           └── values/styles.xml
    ├── build.gradle
    ├── settings.gradle
    └── gradle.properties
```

---

## 🖥️ Windows / macOS / Linux (Electron)

### Требования
- [Node.js](https://nodejs.org/) 18+
- npm

### Сборка

```bash
cd electron

# Установить зависимости
npm install

# Запустить для проверки
npm start

# Собрать для Windows (.exe installer)
npm run build:win

# Собрать для macOS (.dmg)
npm run build:mac

# Собрать для Linux (AppImage + .deb)
npm run build:linux

# Все платформы сразу
npm run build:all
```

Готовые файлы появятся в папке `electron/dist/`

### ⚠️ Кросс-компиляция
- Windows → можно собрать только .exe
- macOS → можно собрать .dmg и .exe (через wine)
- Linux → можно собрать все

Для сборки под все платформы рекомендуется использовать [GitHub Actions](https://www.electron.build/configuration/publish.html) или CI.

---

## 📱 Android

### Требования
- [Android Studio](https://developer.android.com/studio) или JDK 17+ и Android SDK
- Android SDK с API 34
- `ANDROID_HOME` прописан в переменных окружения

### Сборка через Android Studio
1. Открой Android Studio
2. `File → Open` → выбери папку `android/`
3. Дождись sync Gradle
4. `Build → Generate Signed Bundle / APK`
5. Выбери **APK**, создай/используй keystore
6. Собери Release APK

### Сборка через командную строку

```bash
cd android

# Debug APK (для тестирования, не требует подписи)
./gradlew assembleDebug

# Release APK (потребует keystore)
./gradlew assembleRelease

# Готовый APK будет тут:
# app/build/outputs/apk/debug/app-debug.apk
# app/build/outputs/apk/release/app-release.apk
```

### Установка на телефон (через ADB)
```bash
adb install app/build/outputs/apk/debug/app-debug.apk
```

---

## ✅ Разрешения и функции

| Функция | Electron | Android |
|---|---|---|
| Микрофон (звонки, голос) | ✅ | ✅ |
| Камера (видеозвонки) | ✅ | ✅ |
| Демонстрация экрана | ✅ | ✅ |
| Уведомления | ✅ | ✅ |
| Файлы/вложения | ✅ | ✅ |
| Bluetooth-гарнитура | — | ✅ |

---

## 💡 Советы

- На **macOS** при первом запуске система спросит разрешение на камеру и микрофон — нужно нажать "Разрешить"
- На **Android** при первом запуске всплывут запросы разрешений — принять все
- Для **публикации в Google Play** нужно подписать APK release-ключом и заполнить Store Listing
- Для **App Store (macOS)** нужен Apple Developer аккаунт ($99/год) и прохождение ревью
