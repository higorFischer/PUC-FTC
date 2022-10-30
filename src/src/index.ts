export function runFile({
	file,
	sentence,
	breakOnLog,
}: {
	file: string;
	sentence: string;
	breakOnLog?: boolean;
}) {
	// const result = FileConverter().convert(file);
	// if (!result) return console.log("Arquivo com nome inválido");
	// if (!sentence) return console.log("Sentença não encontrada");
	// const AFN = JFLAPConverter().toAFN(result);
	// console.log(AFN);
	// const AFD = AFNToAFDConverter().BuildByPile(AFN);
	// console.log(AFD);
	// SentenceValidator(AFD, sentence, { breakOnLog });
	// const jflap = JFLAPConverter().toJFLAP(AFD);
	// console.log(FileConverter().toXML(jflap));
}
