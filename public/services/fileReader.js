"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileReader = void 0;
const xml_js_1 = require("xml-js");
const FileReader = () => {
    const xml = `<?xml version="1.0" encoding="UTF-8" standalone="no"?><!--Created with JFLAP 6.1.--><structure>
		<type>fa</type>
		<automaton>
			<!--The list of states.-->
			<state id="0" name="q0">
				<x>76.0</x>
				<y>126.0</y>
			</state>
			<state id="1" name="q1">
				<x>196.0</x>
				<y>75.0</y>
			</state>
			<state id="2" name="q2">
				<x>214.0</x>
				<y>216.0</y>
				<final/>
			</state>
			<state id="3" name="q3">
				<x>351.0</x>
				<y>126.0</y>
				<final/>
				<initial/>

			</state>
			<!--The list of transitions.-->
			<transition>
				<from>3</from>
				<to>2</to>
				<read>b</read>
			</transition>
			<transition>
				<from>3</from>
				<to>1</to>
				<read>a</read>
			</transition>
			<transition>
				<from>1</from>
				<to>3</to>
				<read>a</read>
			</transition>
			<transition>
				<from>1</from>
				<to>1</to>
				<read>a</read>
			</transition>
			<transition>
				<from>0</from>
				<to>2</to>
				<read>a</read>
			</transition>
			<transition>
				<from>0</from>
				<to>1</to>
				<read>b</read>
			</transition>
			<transition>
				<from>2</from>
				<to>0</to>
				<read/>
			</transition>
			<transition>
				<from>0</from>
				<to>3</to>
				<read>b</read>
			</transition>
			<transition>
				<from>0</from>
				<to>1</to>
				<read>a</read>
			</transition>
		</automaton>
		</structure>
	`;
    const result = (0, xml_js_1.xml2js)(xml, { compact: true });
    return {
        convert: () => {
            return result;
        },
        toXML: (json) => {
            return (0, xml_js_1.js2xml)(json, { compact: true });
        }
    };
};
exports.FileReader = FileReader;
