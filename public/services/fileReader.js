"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileReader = void 0;
const xml_js_1 = require("xml-js");
const fs_1 = __importDefault(require("fs"));
const FileReader = () => {
    let file = 'AFN.jff';
    return {
        convert: (fileName) => {
            if (!fileName) {
                console.error("= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = ");
                console.error("Nenhum arquivo especificado. será utilizado o defaul AFN.jff....");
                console.error("= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = ");
            }
            else
                file = fileName;
            try {
                const result = (0, xml_js_1.xml2js)(fs_1.default.readFileSync(file, 'utf8'), { compact: true });
                return result;
            }
            catch (_a) {
                return null;
            }
        },
        toXML: (json) => {
            return fs_1.default.writeFileSync(`AFD-${file}`, `<?xml version="1.0" encoding="UTF-8" standalone="no"?><!-- PUC - AFN->AFD CONVERTER -->\n${(0, xml_js_1.js2xml)(json, { compact: true, spaces: 2 })}`);
        }
    };
};
exports.FileReader = FileReader;
