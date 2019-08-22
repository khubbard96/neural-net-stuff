const NeuralNetwork = require("./neuralnet.js").NeuralNetwork;
const SyntheticAxon = require("./neuron.js").SyntheticAxon;

exports.Snake = class Snake {
    constructor(length, board) {
        this.length = length || 1;
        this.brain = new NeuralNetwork();
        this.body = [[2,0],[1,0],[0,0],[-1,0]];
        this.board = board;
        this.direction = 1;
        this.inputAxons = [];
    }
    head() {
        return this.body[0];
    }
    _createInputAxons() {
        let inputNeurons = this.brain._inputNeurons;
    }
    advance() {
        if(!this.brain) {
            console.log("snake has no brain.");
            return;
        }
        /*first thing we need to pick a direction*/
        //get surroundings information
        let surroundings = this.checkSurroundings();

        //pass to neural network
        let i = 0;
        this.inputAxons.forEach((a) => {
            a.setInput(surroundings[i]);
            i++;
        });
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
    hide() {

    }
    checkForFood() {
        return (this._coordEquals(this._getNextCoord(),this.board.foodLocation));
    }
    growForward() {
        this.body.unshift(this._getNextCoord());
    }
    checkSurroundings() {
        debugger;
        let self = this;
        let idx = 0;
        let results = {walls: {}, snake: {}, food: -1};
        /* 0 - east, 1 - southeast, 2 - south, 3 - southwest, 4 - west, 5 - northwest, 6 - north, 7 - northeast */
        let directionMap = 
        {
            "east": [1, 0], //east
            "southeast": [1, 1], //southeast
            "south": [0, 1], //south
            "southwest": [-1, 1], //southwest
            "west": [-1, 0], //west
            "northwest": [-1, -1], //northwest
            "north": [0, -1], //north
            "northeast": [1, -1] //northeast
        }
        Object.entries(directionMap).forEach((kv) => {
            results.walls[kv[0]] = self._checkWall(kv[1]);
            results.snake[kv[0]] = self._checkSelf(kv[1]);
        });
        results.food = this._checkFood();

        console.log(results);
    }
    availableCells() {
        let availableCells = []
        for(let h = 0; h < this.board.height; h++)
            for(let w = 0; w < this.board.width; w++)
                if(!this._coordIn([w,h], this.body)) availableCells.push([w,h]);
        return availableCells;
    }
    //private/util methods//
    _checkWall(direction) {
        let head = this.head();
        let checkingCoord = this._addCoord(head, direction);
        let prevCoord = head;
        while(
            (!direction[0] || direction[0] && (checkingCoord[0] >= 0 && checkingCoord[0] < 20)) &&
            (!direction[1] || direction[1] && (checkingCoord[1] >= 0 && checkingCoord[1] < 20))            
        ) {
            prevCoord = checkingCoord;
            checkingCoord = this._addCoord(checkingCoord, direction);            
        }
        return this._distBetweenCoord(head, prevCoord);
    }
    _checkFood(direction) {
/*         let head = this.head();
        let checkingCoord = head;
        while(checkingCoord[0] > 0 && checkingCoord[0] < this.board.blockDimension && checkingCoord[1] > 0 && checkingCoord[1] < this.board.blockDimension) {
            checkingCoord = this._addCoord(checkingCoord, direction);
            if(this._coordEquals(checkingCoord, this.board.foodLocation)) return this._distBetweenCoord(head, this.board.foodLocation);                 
        } */
        return this._distBetweenCoord(this.head(), this.board.foodLocation);
        //return Number.MAX_SAFE_INTEGER;
    }
    _checkSelf(direction) {
        let head = this.head();
        let checkingCoord = head;
/*  */  
        return Number.MAX_SAFE_INTEGER;
    }
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
    _distBetweenCoord(c1, c2) {//distance formula
        return Math.sqrt(
            Math.pow(c1[0] - c2[0], 2) +
            Math.pow(c1[1] - c2[1], 2)
        );
    }
    _coordIn(c1, coordSet) {
        for(let i = 0; i < coordSet.length; i++){
            if(this._coordEquals(coordSet[i], c1)) return coordSet[i];
        }
        return false;
    }
    _makeBrain() {
        if(this.brain) return;
        this.brain = new NeuralNetwork();
        //create synthetic axons
        for(let i = 0; this.brain._inputNeurons.length / 3; i++) {
            //let 
        }
    }
}
exports.Board = class Board {
    constructor(_snake) {
        this.height = 20;
        this.width = 20;
        this.foodLocation = undefined;
        this.snake = _snake;
        this.snake.board = this;
        this.gameInstance = undefined;
        this.canvas = undefined;
        this.blockDimension = 20;
    }
    placeFood() {
        if(!this.foodLocation) {
            let availableCells = this.snake.availableCells();
            let idx = Math.floor((Math.random() * availableCells.length));
            this.foodLocation = availableCells[idx];
        }
    }
    show() {
        if(!this.canvas) {
            this.canvas = this.gameInstance.window.getElementById("gameBoard");
        }
        let ctx = this.canvas.getContext("2d");
        ctx.clearRect(0,0,this.canvas.width, this.canvas.height);

        ctx.fillStyle = "#FF0000";
        ctx.fillRect(
            this.foodLocation[0] * this.blockDimension + 1, 
            this.foodLocation[1] * this.blockDimension + 1,
            this.blockDimension - 2,
            this.blockDimension - 2      
        );

        ctx.fillStyle = "#FFFFFF";
        let snake = this.snake;
        for(let i = 0; i < this.snake.body.length; i++) {
            ctx.fillRect(
                snake.body[i][0] * this.blockDimension + 1, 
                snake.body[i][1] * this.blockDimension + 1, 
                this.blockDimension - 2,
                this.blockDimension - 2   
            );
        }
    }
    removeSnake() { 
        this.snake.hide();
        this.snake = undefined;
    }
    tickAction(game) {
        this.getDrawingElement();
        this.snake.checkSurroundings();
        this.snake.advance();
        console.log("tick");
    }
    getDrawingElement() {
/*         if(this.canvas) return this.canvas;
        let canvas = this.gameInstance.window.getElementById("gameBoard");
        this.canvas = canvas.getContext("2d");
        return this.canvas; */


    }
    snakeOffBoard() {
        return this.snake.head()[0] < 0 || this.snake.head()[0] > this.width || this.snake.head()[1] < 0 || this.snake.head()[1] > this.height;
    }
}



exports.Game = class Game {
    constructor() {
        this.running = false;
        this.gameSpeed = 4; //ticks per second
        this.gameTime = 0;
        this.checkRate = 100;
        this.board = undefined;
        this.window = undefined;
        this.tickAction = undefined;
    }
/*     startSimulation() {
        if(!this.board) return;
        this.board.gameInstance = this;
        let msBetweenTicks = 1000 / this.gameSpeed;
        let self = this;

    }*/
    tick() {
/*         if(!this.board) return;
        this.board.tickAction(this);
        if(this.board.snakeOffBoard()) clearInterval(this.gameLoop); */

    }
    start() {
        if(!this.board || !this.window || !this.tickAction) return;
        this.startTime = new Date().getTime();
        let self = this;
        this.gameLoop = setInterval(() => {
            let thisTime = new Date().getTime();
            if(thisTime % self.startTime >= (1000 / this.gameSpeed)) {
                self.tickAction();
            }
        },this.checkRate);
    }
    stop() {
        clearInterval(this.gameLoop);
    }
}
//# sourceURL=snake.js