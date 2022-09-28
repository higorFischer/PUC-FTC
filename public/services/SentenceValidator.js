"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentenceValidator = void 0;
const SentenceValidator = (AFD, sentence, options) => {
    var _a;
    const { breakOnLog } = options !== null && options !== void 0 ? options : {};
    const states = AFD.states;
    const initial = AFD.initial;
    let currentState = initial;
    const logs = [];
    while (sentence.length > 0) {
        const letter = sentence[0];
        if (!currentState)
            break;
        logs.push({ currentState, sentence });
        currentState = (_a = states.get(currentState)) === null || _a === void 0 ? void 0 : _a.get(letter);
        sentence = sentence.substring(1);
    }
    if (currentState)
        logs.push({ currentState, sentence: !!sentence ? sentence : "λ" });
    console.log(logs.map(log => `[${log.currentState}, ${log.sentence}]`).join(`${breakOnLog ? "\n  v\n" : " |- "}`));
    //TODO: validar quando estado inicial for final
    if (currentState && AFD.isFinal(currentState) && sentence.length === 0)
        console.log("VALID", "( STOPED AT", currentState, ")");
    else
        console.log("INVALID");
};
exports.SentenceValidator = SentenceValidator;
