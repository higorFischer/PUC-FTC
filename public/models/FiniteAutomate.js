"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiniteAutomate = void 0;
class FiniteAutomate {
    constructor(states, initial, finals) {
        this.states = states;
        this.initial = initial;
        this.finals = finals;
    }
    isFinal(state) {
        for (var final of this.finals) {
            if (state.includes(final))
                return true;
        }
        return false;
    }
}
exports.FiniteAutomate = FiniteAutomate;
