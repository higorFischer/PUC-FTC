import { AFNToAFDConverter } from "./services/AFNToAFDConverter";
import { FileReader } from "./services/fileReader";
import { JFLAPConverter } from "./services/JFLAPConverter";
import { SentenceValidator } from "./services/SentenceValidator";


function run(){
	const args = process.argv.reduce((a, b, index) => {
		if(index <= 1) return {...a};

		const propName = b.split("=")[0]
		const propValue = b.split("=")[1] ?? true;
		
		return {...a, [propName]: propValue };
		
	}, {}) as { file: string, sentence: string, breakOnLog?: boolean }

	console.log(process.argv, args)
	
	const result = FileReader().convert(args.file);
	const sentence = args.sentence;

	if(!result) return console.log("Arquivo com nome inválido");
	if(!sentence) return console.log("Sentença não encontrada");

	const AFN = JFLAPConverter().toAFN(result);
	const AFD = AFNToAFDConverter().BuildByPile(AFN);
	SentenceValidator(AFD, sentence, { breakOnLog: args.breakOnLog });
	
	const jflap = JFLAPConverter().toJFLAP(AFD);
	
	console.log(FileReader().toXML(jflap));
}

run();