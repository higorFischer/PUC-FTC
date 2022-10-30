import { FiniteAutomate } from "./FiniteAutomate";

export class NonDeterministicFiniteAutomate extends FiniteAutomate<string[]> {
	constructor(
		states: Map<string, Map<string, string[]>>,
		initial: string,
		final: string[]
	) {
		super(states, initial, final)
	}	
}