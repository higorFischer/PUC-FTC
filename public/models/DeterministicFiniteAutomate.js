"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeterministicFiniteAutomate = void 0;
const FiniteAutomate_1 = require("./FiniteAutomate");
class DeterministicFiniteAutomate extends FiniteAutomate_1.FiniteAutomate {
    constructor(states, initial, final) {
        super(states, initial, final);
    }
}
exports.DeterministicFiniteAutomate = DeterministicFiniteAutomate;
