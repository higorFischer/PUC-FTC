"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AFNToAFDConverter_1 = require("./services/AFNToAFDConverter");
const fileReader_1 = require("./services/fileReader");
const JFLAPConverter_1 = require("./services/JFLAPConverter");
const SentenceValidator_1 = require("./services/SentenceValidator");
function run() {
    const args = process.argv.reduce((a, b, index) => {
        var _a;
        if (index <= 1)
            return Object.assign({}, a);
        const propName = b.split("=")[0];
        const propValue = (_a = b.split("=")[1]) !== null && _a !== void 0 ? _a : true;
        return Object.assign(Object.assign({}, a), { [propName]: propValue });
    }, {});
    console.log(process.argv, args);
    const result = (0, fileReader_1.FileReader)().convert(args.file);
    const sentence = args.sentence;
    if (!result)
        return console.log("Arquivo com nome inválido");
    if (!sentence)
        return console.log("Sentença não encontrada");
    const AFN = (0, JFLAPConverter_1.JFLAPConverter)().toAFN(result);
    const AFD = (0, AFNToAFDConverter_1.AFNToAFDConverter)().BuildByPile(AFN);
    (0, SentenceValidator_1.SentenceValidator)(AFD, sentence, { breakOnLog: args.breakOnLog });
    const jflap = (0, JFLAPConverter_1.JFLAPConverter)().toJFLAP(AFD);
    console.log((0, fileReader_1.FileReader)().toXML(jflap));
}
run();
