const {InputNeuron, OutputNeuron, HiddenNeuron, Axon} = require("./neuron.js");

exports.NeuralNetwork = class NeuralNetwork {
    constructor() {
        this.neurons = [];
        this._inputNeurons = [];
        this._outputNeurons = [];
        this._hiddenNeurons = [];
        this._axons = [];
        this.createInputs(20);
        this.createOutputs(4);
        this.createHidden(2, 10);
        console.log("network created");
    }
    createInputs(numInputs) {
        //creates input neurons and stores them
        if(typeof numInputs != typeof 1 || !numInputs) return;
        for(let i = 0; i < numInputs; i++) {
            this._inputNeurons.push(new InputNeuron());
        }
    }
    createOutputs(numOutputs) {
        //creates output neurons and stores them
        if(typeof numOutputs != typeof 1 || !numOutputs) return;
        for(let i = 0; i < numOutputs; i++) {
            this._outputNeurons.push(new OutputNeuron());
        }

    }
    createHidden(levels, numPerLevel){
        //creates intermediate neurons
        //also creates linkages between the inputs and outputs
        for(let i = 0; i < levels; i++){
            let thisLevel = [];
            for (let j = 0; j < numPerLevel; j++) {
                let hiddenNeuron = new HiddenNeuron();
                if(i == 0) {
                    //attach this hidden neuron to all of the input neurons
                    this._inputNeurons.forEach((inNeuron) => {
                        this._axons.push(new Axon(inNeuron, hiddenNeuron, this._createRandomWeight()));                        
                    });
                } else if(i >= 1) {
                    this._hiddenNeurons[i - 1].forEach((_hidNeuron) => {
                        this._axons.push(new Axon(_hidNeuron, hiddenNeuron, this._createRandomWeight()));
                    });
                }        
                if(i == levels - 1) {
                    this._outputNeurons.forEach((outNeuron) => {
                        this._axons.push(new Axon(hiddenNeuron, outNeuron, this._createRandomWeight()));
                    });
                }
                thisLevel.push(hiddenNeuron);
            }
            this._hiddenNeurons.push(thisLevel);
        }
    }
    _createRandomWeight() {
        return 2.0 * Math.random() - 1;
    }
}

console.log(new NeuralNetwork());