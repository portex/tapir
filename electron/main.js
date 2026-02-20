const { app, BrowserWindow, session, systemPreferences } = require('electron');
const path = require('path');

// Request permissions on macOS
async function requestMacPermissions() {
  if (process.platform === 'darwin') {
    await systemPreferences.askForMediaAccess('microphone');
    await systemPreferences.askForMediaAccess('camera');
  }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: 'Tapir',
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
      // Allow media access
      allowRunningInsecureContent: false,
    },
    backgroundColor: '#17212b',
  });

  // Handle permission requests (microphone, camera, screen share, notifications)
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    const allowed = [
      'media',
      'microphone',
      'camera',
      'display-capture',
      'screen',
      'notifications',
      'geolocation',
      'clipboard-read',
      'clipboard-sanitized-write',
    ];
    callback(allowed.includes(permission));
  });

  // Handle permission checks
  session.defaultSession.setPermissionCheckHandler((webContents, permission) => {
    const allowed = ['media', 'microphone', 'camera', 'display-capture', 'notifications'];
    return allowed.includes(permission);
  });

  // Handle screen/display capture (for screen sharing)
  session.defaultSession.setDisplayMediaRequestHandler((request, callback) => {
    // Return all available sources for screen sharing
    callback({ video: 'screen' });
  });

  win.loadURL('https://web.telegram.org/a/');

  // Force title to always stay "Tapir" regardless of what the page sets
  win.on('page-title-updated', (event) => {
    event.preventDefault();
  });

  // Open links in the same window
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://web.telegram.org')) {
      return { action: 'allow' };
    }
    require('electron').shell.openExternal(url);
    return { action: 'deny' };
  });

  // Hide menu bar (optional, press Alt to show)
  win.setMenuBarVisibility(false);
}

app.whenReady().then(async () => {
  await requestMacPermissions();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});