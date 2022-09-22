import { AFNToAFDConverter } from "./services/AFNToAFDConverter";
import { FileReader } from "./services/fileReader";
import { JFLAPConverter } from "./services/JFLAPConverter";
import { SentenceValidator } from "./services/SentenceValidator";

const result = FileReader().convert();

const AFN = JFLAPConverter().toAFN(result);
console.log("AFN (δ)", AFN)
const AFD = AFNToAFDConverter().BuildByPile(AFN);
console.log("AFD (δ)", AFD)

SentenceValidator(AFD, "");

const jflap = JFLAPConverter().toJFLAP(AFD);

console.log(FileReader().toXML(jflap));
