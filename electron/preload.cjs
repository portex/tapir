const { contextBridge, ipcRenderer } = require('electron');

// Expose minimal APIs to the renderer process
contextBridge.exposeInMainWorld('electron', {
  platform: process.platform,
  onDeepLink: (callback) => {
    ipcRenderer.on('deep-link', (event, url) => callback(url));
  },
});
