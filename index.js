const electron = require('electron');
const Game = require("./snake.js").Game;
const ipc = require("electron").ipcRenderer;

const { app, BrowserWindow } = require('electron');

function createWindow () {
    let win = new BrowserWindow({
        width: 900,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
        }
    });

    win.loadFile('index.html');
    win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
  
app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

