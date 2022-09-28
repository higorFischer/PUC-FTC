"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AFNToAFDConverter = void 0;
const DeterministicFiniteAutomate_1 = require("../models/DeterministicFiniteAutomate");
const helpers_1 = require("./helpers");
const AFNToAFDConverter = () => {
    function BuildByPile(AFNClass) {
        const AFN = AFNClass.states;
        const AFD = new Map();
        const pile = new Map();
        pile.set(AFNClass.initial, new Map());
        for (var key of pile) {
            const newState = new Map();
            const state = key[0];
            const transitions = AFN.get(state);
            for (var transition of transitions) {
                var transitionState = transition[1].sort().filter(c => c != "").join(';');
                newState.set(transition[0], transitionState);
                if (!AFN.has(transitionState) && transitionState !== "")
                    AFN.set(transitionState, (0, helpers_1.getMapKeysByValue)(transition[1].sort(), AFN));
                if (!pile.has(transitionState) && transitionState !== "")
                    pile.set(transitionState, new Map());
            }
            AFD.set(state, newState);
        }
        return new DeterministicFiniteAutomate_1.DeterministicFiniteAutomate(AFD, AFNClass.initial, AFNClass.finals);
    }
    function BuildByAFN(AFNClass) {
        const AFN = AFNClass.states;
        const AFD = new Map();
        for (var key of AFN) {
            const newState = new Map();
            const state = key[0];
            const transitions = key[1];
            for (var transition of transitions) {
                var transitionState = transition[1].sort().filter(c => c != "").join(';');
                newState.set(transition[0], transitionState);
                if (!AFN.has(transitionState) && transitionState !== "")
                    AFN.set(transitionState, (0, helpers_1.getMapKeysByValue)(transition[1].sort(), AFN));
            }
            AFD.set(state, newState);
        }
        return new DeterministicFiniteAutomate_1.DeterministicFiniteAutomate(AFD, AFNClass.initial, AFNClass.finals);
    }
    return {
        BuildByPile,
        BuildByAFN
    };
};
exports.AFNToAFDConverter = AFNToAFDConverter;
