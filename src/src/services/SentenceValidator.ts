import { FiniteAutomate } from "../models/FiniteAutomate";

export const SentenceValidator = (
	AFD: FiniteAutomate<any>,
	sentence: string
) => {
	const states = AFD.states;
	const initial = AFD.initial;

	let currentState = initial;

	const logs = [] as { currentState: string; sentence: string }[];
	while (sentence.length > 0) {
		const letter = sentence[0];
		if (!currentState) break;

		logs.push({ currentState, sentence });
		currentState = states.get(currentState)?.get(letter)!;
		sentence = sentence.substring(1);
	}

	if (currentState)
		logs.push({ currentState, sentence: !!sentence ? sentence : "λ" });

	return {
		logs,
		isValid:
			!!currentState &&
			AFD.isFinal(currentState) &&
			sentence.length === 0,
		currentState,
	};
};
