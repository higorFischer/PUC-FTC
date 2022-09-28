import { xml2js, js2xml } from "xml-js";
import { JFLAP } from "../models/JFLAP";
import FS from 'fs';
export const FileReader = () =>{
	let file = 'AFN.jff';

	
	return {
		convert: (fileName: string) =>{
			if(!fileName){
				console.error("= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = ")
				console.error("Nenhum arquivo especificado. será utilizado o defaul AFN.jff....")
				console.error("= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = ")
			} else 
				file = fileName;
			try {

				const result = xml2js(
					FS.readFileSync(file, 'utf8'), { compact: true }
				) as JFLAP;
				return result;
			} catch {
				return null;
			}

		},
		toXML: (json: any) =>{
			return FS.writeFileSync(`AFD-${file}`, `<?xml version="1.0" encoding="UTF-8" standalone="no"?><!-- PUC - AFN->AFD CONVERTER -->\n${js2xml(json, { compact: true, spaces: 2 })}`);
		}
	}
}