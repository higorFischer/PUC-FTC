import { AFNToAFDConverter } from "./services/AFNToAFDConverter";
import { FileReader } from "./services/fileReader";
import { JFLAPConverter } from "./services/JFLAPConverter";
import { SentenceValidator } from "./services/SentenceValidator";

function run() {
	const args = process.argv.reduce((a, b, index) => {
		if (index <= 1) return { ...a };

		const propName = b.split("=")[0];
		const propValue = b.split("=")[1] ?? true;

		return { ...a, [propName]: propValue };
	}, {}) as { file: string; sentence: string; breakOnLog?: boolean };

	runFile(args);
}

function runFile({
	file,
	sentence,
	breakOnLog,
}: {
	file: string;
	sentence: string;
	breakOnLog?: boolean;
}) {
	const result = FileReader().convert(file);

	if (!result) return console.log("Arquivo com nome inválido");
	if (!sentence) return console.log("Sentença não encontrada");

	const AFN = JFLAPConverter().toAFN(result);
	console.log(AFN);
	const AFD = AFNToAFDConverter().BuildByPile(AFN);
	console.log(AFD);
	SentenceValidator(AFD, sentence, { breakOnLog });

	const jflap = JFLAPConverter().toJFLAP(AFD);

	console.log(FileReader().toXML(jflap));
}

run();
