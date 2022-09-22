"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiniteAutomateConverter = void 0;
const helpers_1 = require("./services/helpers");
class FiniteAutomateConverter {
    constructor(initialState, finalState) {
        this.initialState = initialState;
        this.finalState = finalState;
    }
    buildStates(object) {
        this.AFN = new Map();
        for (var state of object.structure.automaton.state)
            this.AFN.set(state._attributes.id, new Map());
    }
    buildTransitions(object) {
        var _a;
        for (var trs of object.structure.automaton.transition) {
            const transition = {
                from: trs.from._text,
                trs: trs.read._text,
                to: trs.to._text
            };
            var afnState = this.AFN.get(transition.from);
            (0, helpers_1.AddOnMap)(afnState, transition.trs, [(_a = transition.to) !== null && _a !== void 0 ? _a : "λ"]);
        }
    }
    BuildAFNFromJFLAP(object) {
        this.buildStates(object);
        this.buildTransitions(object);
        return this.AFN;
    }
}
exports.FiniteAutomateConverter = FiniteAutomateConverter;
