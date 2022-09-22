"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonDeterministicFiniteAutomate = void 0;
const FiniteAutomate_1 = require("./FiniteAutomate");
class NonDeterministicFiniteAutomate extends FiniteAutomate_1.FiniteAutomate {
    constructor(states, initial, final) {
        super(states, initial, final);
    }
}
exports.NonDeterministicFiniteAutomate = NonDeterministicFiniteAutomate;
