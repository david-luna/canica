import { join } from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';
import { bootstrapModule, connectWindow } from 'annotatron';
import { Application } from './application';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('electron-reload')(__dirname, {
  electron: join(__dirname,'..' ,'node_modules', '.bin', 'electron')
});

// Do the bootstrap
bootstrapModule(Application, ipcMain);

// Global params
const environment = process.env.NODE_ENV
const isDev = environment === 'development';

// Renderer windows factory
const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      contextIsolation: true,
      // turn off remote
      enableRemoteModule: false,
      // Preload script
      preload: join(__dirname, '../assets/preload.js'),
    }
  });

  if (isDev) {
    // Open the DevTools.
    // and load the index.html of the server.
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    // and load the index.html of the app.
    mainWindow.loadFile(join(__dirname, '../src/index.html'));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // connect to the main process
  connectWindow(mainWindow);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
