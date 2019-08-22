const Game = require("./snake.js").Game;
const Board = require("./snake.js").Board;
const Snake = require("./snake.js").Snake;

window.onload = function () {
    const game = new Game();
    game.window = document;
    let snake = new Snake();
    game.board = new Board(snake);
    game.board.gameInstance = game;
    game.tickAction = function() {
        game.board.placeFood();
        game.board.show();
        snake.advance();
        //snake.show();
    }
    game.running = true;
    game.start();
}