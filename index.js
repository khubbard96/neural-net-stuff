const electron = require('electron');
const Game = require("./snake.js").Game;

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
    win.on('closed', () => {
        win = null;
    });
    startGame();
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

function startGame() {
    const game = new Game();
    game.running = true;
}