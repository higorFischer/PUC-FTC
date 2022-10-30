import { FiniteAutomate } from "../models/FiniteAutomate";
import { JFLAP, State, Transition } from "../models/JFLAP";
import { NonDeterministicFiniteAutomate } from "../models/NonDeterministicFiniteAutomate";
import { AddOnMap } from "./helpers";

export const JFLAPConverter = () => {
	let AFN!: Map<string, Map<string, string[]>>;
	let initial: string;
	let final: string[];

	const buildStates = (object: JFLAP) => {
		AFN = new Map<string, Map<string, string[]>>();
		final = [];

		for (var state of object.structure.automaton.state) {
			AFN.set(state._attributes.id, new Map<string, string[]>());

			if (!!state.initial) initial = state._attributes.id;

			if (!!state.final) final.push(state._attributes.id);
		}
	};

	const buildTransitions = (object: JFLAP) => {
		for (var trs of object.structure.automaton.transition) {
			const transition = {
				from: trs.from._text,
				trs: trs.read._text,
				to: trs.to._text,
			};
			if (!transition.trs) continue;

			var afnState = AFN.get(transition.from);
			AddOnMap<string>(afnState!, transition.trs, [transition.to ?? "λ"]);
		}
	};

	const toAFN = (object: JFLAP): NonDeterministicFiniteAutomate => {
		buildStates(object);
		buildTransitions(object);
		return new NonDeterministicFiniteAutomate(AFN, initial, final);
	};

	const toJFLAP = (AFN: FiniteAutomate<any>): JFLAP => {
		var states = [] as State[];
		var transitions = [] as Transition[];
		var i = 0;
		var ids = new Map<string, string>();

		for (var state of AFN.states) {
			const id = "" + i++;
			ids.set(state[0], id);
		}

		for (var state of AFN.states) {
			const id = ids.get(state[0]) + "";
			let stateObj = {
				_attributes: {
					id: id,
					name: state[0],
				},
				x: "",
				y: "",
			} as State;

			if (state[0] === AFN.initial) stateObj["initial"] = {};
			if (AFN.isFinal(state[0])) stateObj["final"] = {};

			states.push(stateObj);
			for (var transition of [...state[1].entries()]) {
				transitions.push({
					from: { _text: id },
					read: { _text: transition[0]! },
					to: { _text: ids.get(transition[1])! },
				});
			}
		}

		return {
			structure: {
				type: "fa",
				automaton: {
					state: states,
					transition: transitions,
				},
			},
		} as JFLAP;
	};

	return { toAFN, toJFLAP };
};
