const NeuralNetwork = require("./neuralnet.js").NeuralNetwork;
const SyntheticAxon = require("./neuron.js").SyntheticAxon;

exports.Snake = class Snake {
    constructor(length, board) {
        this.length = length || 1;
        this.brain = undefined;
        this.body = [[0,0]];
        this.board = board;
        this.direction = 0;
    }
    advance() {
        if(!this.brain) {
            console.log("snake has no brain.");
            return;
        }
        if(this.checkForFood()) this.growForward();
        else {
            let newBody = [];
            for(let i = 0; i < this.body.length; i++) {
                if(i == 0) {
                    newBody.push(this._getNextCoord());
                } else {
                    newBody.push(this.body[i - 1]);
                }
            }
            this.body = newBody;
        }
    }
    show() {

    }
    hide() {

    }
    checkForFood() {
        return (this._coordEquals(this._getNextCoord(),this.board.foodLocation));
    }
    growForward() {
        this.body.unshift(this._getNextCoord());
    }
    checkSurroundings() {

    }
    //private/util methods//
    _getNextCoord() {
        let head = this.body[0];
        let nextHead;
        if(this.direction == 0) {
            nextHead = this._addCoord(head, [1,0]);
        } else if (this.direction == 1) {
            nextHead = this._addCoord(head, [0,1]);
        } else if(this.direction == 2) {
            nextHead = this._addCoord(head, [-1,0]);
        } else if(this.direction == 3) {2
            nextHead = this._addCoord(head, [0,-1]);
        }
        return nextHead;
    }
    _addCoord(c1,c2) {
        return [c1[0] + c2[0], c1[1] + c2[1]];
    }
    _coordEquals(c1, c2){
        return c1[0] == c2[0] && c1[1] == c2[1];
    }
    _makeBrain() {
        if(this.brain) return;
        this.brain = new NeuralNetwork();
        //create synthetic axons
        for(let i = 0; this.brain._inputNeurons.length / 3; i++) {
            let 
        }
    }
}
exports.Board = class Board {
    constructor() {
        this.height = 20;
        this.width = 20;
        this.foodLocation = [0,0];
        this.snake = undefined;
    }
    placeFood() {

    }
    addSnake(snake) {
        this.snake = new Snake(1, this);
        this.snake.show();
    }
    removeSnake() { 
        this.snake.hide();
        this.snake = undefined;
    }
}



exports.Game = class Game {
    constructor() {
        this.running = false;
    }
}
