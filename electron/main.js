const { app, BrowserWindow, session, systemPreferences } = require('electron');
const path = require('path');

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

// Critical: disable autoplay restrictions so WebRTC audio works in calls
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

// WebRTC improvements
app.commandLine.appendSwitch('enable-features', 'WebRTCPipeWireCapturer,WebRtcHideLocalIpsWithMdns');
app.commandLine.appendSwitch('disable-features', 'CrossOriginOpenerPolicyByDefault');
app.commandLine.appendSwitch('enable-webrtc-srtp-aes-gcm');

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
      allowRunningInsecureContent: false,
    },
    backgroundColor: '#17212b',
  });

  // Override User-Agent at session level (HTTP headers)
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] = USER_AGENT;
    callback({ requestHeaders: details.requestHeaders });
  });

  // Handle permission requests
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    const allowed = [
      'media', 'microphone', 'camera', 'display-capture',
      'screen', 'notifications', 'geolocation',
      'clipboard-read', 'clipboard-sanitized-write',
      'audioCapture', 'videoCapture',
    ];
    callback(allowed.includes(permission));
  });

  session.defaultSession.setPermissionCheckHandler((webContents, permission) => {
    const allowed = ['media', 'microphone', 'camera', 'display-capture', 'notifications'];
    return allowed.includes(permission);
  });

  session.defaultSession.setDisplayMediaRequestHandler((request, callback) => {
    callback({ video: 'screen' });
  });

  // Load with User-Agent override (covers navigator.userAgent in JS)
  win.loadURL('https://web.telegram.org/a/', { userAgent: USER_AGENT });

  // Also set on webContents after load to make sure JS sees correct UA
  win.webContents.on('did-finish-load', () => {
    win.webContents.setUserAgent(USER_AGENT);
  });

  win.on('page-title-updated', (event) => {
    event.preventDefault();
  });

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://web.telegram.org')) {
      return { action: 'allow' };
    }
    require('electron').shell.openExternal(url);
    return { action: 'deny' };
  });

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