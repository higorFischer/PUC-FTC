import { xml2js, js2xml } from "xml-js";
import { JFLAP } from "../models/JFLAP";

export const FileReader = () =>{
	const xml =
		`<?xml version="1.0" encoding="UTF-8" standalone="no"?><!--Created with JFLAP 6.1.--><structure>
		<type>fa</type>
		<automaton>
			<!--The list of states.-->
			<state id="1" name="q1">
				<final/>
				<initial/>
			</state>
			<state id="2" name="q2">
			</state>
			<state id="3" name="q3">
				<final/>
			</state>
			<!--The list of transitions.-->
			<transition>
				<from>1</from>
				<to>2</to>
				<read>a</read>
			</transition>
			<transition>
				<from>1</from>
				<to>1</to>
				<read>b</read>
			</transition>
			<transition>
				<from>1</from>
				<to>3</to>
				<read>b</read>
			</transition>
			<transition>
				<from>2</from>
				<to>2</to>
				<read>a</read>
			</transition>
			<transition>
				<from>2</from>
				<to>3</to>
				<read>a</read>
			</transition>
			<transition>
				<from>2</from>
				<to>3</to>
				<read>b</read>
			</transition>
			<transition>
				<from>3</from>
				<to>3</to>
				<read>b</read>
			</transition>
			<transition>
				<from>3</from>
				<to>1</to>
				<read>b</read>
			</transition>
		</automaton>
		</structure>
	`;

	const result = xml2js(xml, { compact: true }) as JFLAP;


	return {
		convert: () =>{
			return result;
		},
		toXML: (json: any) =>{
			return js2xml(json, { compact: true });
		}
	}
}