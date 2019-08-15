exports.Axon = class Axon {
    constructor(inNeuron, outNeuron, weight) {
        this._weight = weight;
        this._id = this._createUUID();
        this._inputSource = inNeuron;
        this._outputDestination = outNeuron;
        inNeuron._outputAxons.push(this);
        outNeuron._inputAxons.push(this);
    }

    newRandomWeight() {
        this._weight = 2 * Math.random() - 1;
    }
    newSpecificWeight(x) {
        this._weight = x;
    }
    getID() {
        return this._id;
    }
    setInputNeuron(inNeuron) {
        if (typeof inNeuron == typeof Neuron) {
            this._inputSource = inNeuron;
        }
        else {
            //throw an error idk
        }
    }
    setOutputNeuron(outNeuron) {
        if(typeof outNeuron == typeof Neuron) {
            this._outputDestination = outNeuron
        }
        else {
            //throw error
        }
    }
    _createUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

}
//Neuron class
//a neuron is composed of Axons and a neuron body, and is responsible for supplying information about
//its axons and doing calculations
class Neuron {
    constructor() {
        this._inputAxons = [];
        this._outputAxons = [];
    }
    _sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }

    _sigmoidDerivative(x) {
        return x * (1 - x);
    }
}

exports.InputNeuron = class InputNeuron extends Neuron {
    constructor(...args) {
        super(...args);
    }
}
exports.OutputNeuron = class OutputNeuron extends Neuron {
    constructor(...args) {
        super(...args);
    }
}
exports.HiddenNeuron = class HiddenNeuron extends Neuron {
    constructor(...args) {
        super(...args);
    }
}
exports.SyntheticAxon = class SyntheticAxon extends Axon {
    constructor(...args){
        super(...args);
    }
}
