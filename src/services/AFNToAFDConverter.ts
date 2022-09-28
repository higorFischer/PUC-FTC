import { DeterministicFiniteAutomate } from "../models/DeterministicFiniteAutomate";
import { NonDeterministicFiniteAutomate } from "../models/NonDeterministicFiniteAutomate";
import { getMapKeysByValue } from "./helpers";

export const AFNToAFDConverter = () => {
	
	function BuildByPile(AFNClass: NonDeterministicFiniteAutomate): DeterministicFiniteAutomate{
		const AFN = AFNClass.states;
		const AFD = new Map<string, Map<string, string>>();
		const pile = new Map<string, Map<string, string[]>>();
		pile.set(AFNClass.initial, new Map<string, string[]>());

		for(var key of pile){
			const newState = new Map<string, string>();

			const state = key[0];
			const transitions = AFN.get(state)!;

			for(var transition of transitions){
				var transitionState = transition[1].sort().filter(c => c != "").join(';');

				newState.set(transition[0], transitionState);

				if(!AFN.has(transitionState) && transitionState !== "")
					AFN.set(transitionState, getMapKeysByValue(transition[1].sort(), AFN));

				if(!pile.has(transitionState) && transitionState !== "")
					pile.set(transitionState,new Map<string, string[]>());
			}
			AFD.set(state, newState);
		}

		return new DeterministicFiniteAutomate(
			AFD,
			AFNClass.initial,
			AFNClass.finals
		)
	}


	function BuildByAFN(AFNClass: NonDeterministicFiniteAutomate): DeterministicFiniteAutomate {
		const AFN = AFNClass.states;
		const AFD = new Map<string, Map<string, string>>();
		for(var key of AFN){
			const newState = new Map<string, string>();

			const state = key[0];
			const transitions = key[1];

			for(var transition of transitions){
				var transitionState = transition[1].sort().filter(c => c != "").join(';');

				newState.set(transition[0], transitionState);

				if(!AFN.has(transitionState) && transitionState !== "")
					AFN.set(transitionState, getMapKeysByValue(transition[1].sort(), AFN));
			}
			AFD.set(state, newState);
		}

		return new DeterministicFiniteAutomate(
			AFD,
			AFNClass.initial,
			AFNClass.finals
		)
	}

	return { 
		BuildByPile,
		BuildByAFN
	}

}