import { DeterministicFiniteAutomate } from "../models/DeterministicFiniteAutomate";
import { FiniteAutomate } from "../models/FiniteAutomate";


interface SentenceOptions {
	breakOnLog?: boolean
}

export const SentenceValidator = (AFD: FiniteAutomate<any>, sentence: string, options?: SentenceOptions) => {
	const { breakOnLog } = options ?? {};

	const states = AFD.states;
	const initial = AFD.initial;

	let currentState = initial;

	const logs = []
	while(sentence.length > 0){
		const letter = sentence[0];
		if(!currentState) break;

		logs.push({ currentState, sentence });
		currentState = states.get(currentState)?.get(letter)!;
		sentence = sentence.substring(1);
	}

	if(currentState) logs.push({ currentState, sentence: !!sentence ? sentence : "λ"  });

	console.log(logs.map(log => `[${log.currentState}, ${log.sentence}]`).join(`${breakOnLog ? "\n  v\n" : " |- "}`))

	//TODO: validar quando estado inicial for final
	if(currentState && AFD.isFinal(currentState) && sentence.length === 0)
		console.log("VALID", "( STOPED AT",currentState,")" );
	else
		console.log("INVALID");
}
