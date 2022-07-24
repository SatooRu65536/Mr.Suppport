const {app, BrowserWindow, Menu, ipcMain} = require('electron')
const path = require('path');

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 839,
    height: 513,
    width: 1678,
    height: 1026,
    hasShadow: false,
    alwaysOnTop: true,
    transparent: true,
    resizable: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
      {
        label: '表示確率 0.01UP',
        accelerator: process.platform === 'darwin' ? 'Alt+Cmd+U' : 'Alt+Shift+U',
        click: () => mainWindow.webContents.send('update-counter', 0.01),
      },
      {
        label: '表示確率 0.1UP',
        accelerator: process.platform === 'darwin' ? 'Alt+Cmd+Shift+U' : 'Alt+Shift+U',
        click: () => mainWindow.webContents.send('update-counter', 0.1),
      },
      {
        label: '表示確率 0.01DOWN',
        accelerator: process.platform === 'darwin' ? 'Alt+Cmd+D' : 'Alt+Shift+D',
        click: () => mainWindow.webContents.send('update-counter', -0.01),
      },
      {
        label: '表示確率 0.1DOWN',
        accelerator: process.platform === 'darwin' ? 'Alt+Cmd+Shift+D' : 'Alt+Shift+D',
        click: () => mainWindow.webContents.send('update-counter', -0.1),
      }
      ]
    }

  ])

  Menu.setApplicationMenu(menu);

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.setIgnoreMouseEvents(true);
  // mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  ipcMain.on('counter-value', (_event, value) => {
    console.log(value) // will print value to Node console
  })
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});