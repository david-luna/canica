"use strict";

import { join } from "path";
import { app, protocol, BrowserWindow, ipcMain } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";
import { bootstrapModule, connectWindow } from "annotatron";
import { BackendModule } from "./backend/backend.module";

const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "canica", privileges: { secure: true, standard: true } },
]);

// Bootstrap the backend module
bootstrapModule(BackendModule, ipcMain);

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    show: false,
    width: 800,
    height: 600,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env
        .ELECTRON_NODE_INTEGRATION as unknown as boolean,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      // Preload script for communication
      preload: join(__dirname, "../public/preload.js"),
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("canica");
    // Load the index.html when not in development
    win.loadURL("canica://./index.html");
  }

  // Connect window to the main thread
  connectWindow(win);
  // And listen for the show command
  const commandsChannel = "annotatron:commands";
  const showWindow = (event: unknown, data: { type: string }) => {
    if (data.type === "show-window") {
      win.show();
      ipcMain.off(commandsChannel, showWindow);
    }
  };
  ipcMain.on(commandsChannel, showWindow);
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
