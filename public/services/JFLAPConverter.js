"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JFLAPConverter = void 0;
const NonDeterministicFiniteAutomate_1 = require("../models/NonDeterministicFiniteAutomate");
const helpers_1 = require("./helpers");
const JFLAPConverter = () => {
    let AFN;
    let initial;
    let final;
    const buildStates = (object) => {
        AFN = new Map();
        final = [];
        for (var state of object.structure.automaton.state) {
            AFN.set(state._attributes.id, new Map());
            console.log(state);
            if (!!state.initial)
                initial = state._attributes.id;
            if (!!state.final)
                final.push(state._attributes.id);
        }
    };
    const buildTransitions = (object) => {
        var _a;
        for (var trs of object.structure.automaton.transition) {
            const transition = {
                from: trs.from._text,
                trs: trs.read._text,
                to: trs.to._text
            };
            if (!transition.trs)
                continue;
            var afnState = AFN.get(transition.from);
            (0, helpers_1.AddOnMap)(afnState, transition.trs, [(_a = transition.to) !== null && _a !== void 0 ? _a : "λ"]);
        }
    };
    const toAFN = (object) => {
        buildStates(object);
        buildTransitions(object);
        return new NonDeterministicFiniteAutomate_1.NonDeterministicFiniteAutomate(AFN, initial, final);
    };
    const toJFLAP = (AFN) => {
        var states = [];
        var transitions = [];
        var i = 0;
        var ids = new Map();
        for (var state of AFN.states) {
            const id = '' + i++;
            ids.set(state[0], id);
        }
        for (var state of AFN.states) {
            const id = ids.get(state[0]) + '';
            let stateObj = {
                _attributes: {
                    id: id,
                    name: state[0]
                },
                x: "",
                y: ''
            };
            if (state[0] === AFN.initial)
                //@ts-ignore
                stateObj["initial"] = {};
            if (AFN.isFinal(state[0]))
                //@ts-ignore
                stateObj["final"] = {};
            states.push(stateObj);
            for (var transition of [...state[1].entries()]) {
                transitions.push({
                    from: { _text: id },
                    read: { _text: transition[0] },
                    to: { _text: ids.get(transition[1]) },
                });
            }
        }
        return {
            structure: {
                type: "fa",
                automaton: {
                    state: states,
                    transition: transitions
                }
            }
        };
    };
    return { toAFN, toJFLAP };
};
exports.JFLAPConverter = JFLAPConverter;
