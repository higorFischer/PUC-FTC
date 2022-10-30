import React, { useState } from "react";
import { JFLAP } from "./src/models/JFLAP";
import { js2xml, xml2js } from "xml-js";
import { JFLAPConverter } from "./src/services/JFLAPConverter";
import { NonDeterministicFiniteAutomate } from "./src/models/NonDeterministicFiniteAutomate";
import { useRef } from "react";
import { AFNToAFDConverter } from "./src/services/AFNToAFDConverter";
import { SentenceValidator } from "./src/services/SentenceValidator";
import { DeterministicFiniteAutomate } from "./src/models/DeterministicFiniteAutomate";

export default function App() {
	const [selectedFile, setSelectedFile] = useState<any>();
	const [AFN, setAFN] = useState({} as NonDeterministicFiniteAutomate);
	const [AFD, setAFD] = useState({} as DeterministicFiniteAutomate);
	const [isValid, setIsValid] = useState(false);
	const [error, setError] = useState(false);
	const [validation, setValidation] = useState(
		{} as {
			logs: { currentState: string; sentence: string }[];
			currentState: string;
			isValid: boolean;
		}
	);
	const inputRef = useRef<any>();

	const changeHandler = (event: any) => {
		setError(false);
		const file = event.target.files[0];
		setSelectedFile(file);
		if (file.name.indexOf(".jff") >= 0) {
			const fr = new FileReader();
			fr.readAsText(file, "UTF-8");

			fr.onload = (evt) => {
				handleSubmission(evt.target?.result);
			};
			fr.onerror = () => {
				setError(true);
			};
		} else {
			setError(true);
		}
	};

	const handleSubmission: any = (xml: string) => {
		const result: JFLAP = xml2js(xml, {
			compact: true,
		}) as JFLAP;
		const AFN = JFLAPConverter().toAFN(result);
		setAFN(AFN);
		const AFD = AFNToAFDConverter().BuildByPile(AFN);
		setAFD(AFD);
		setIsValid(true);
		console.log(AFD);
	};

	const handleValidation = () => {
		const inputValue = inputRef.current.value as string;
		setValidation(SentenceValidator(AFD, inputValue));
	};

	const downloadAFD = () => {
		const jflap = JFLAPConverter().toJFLAP(AFD);
		const csv = `<?xml version="1.0" encoding="UTF-8" standalone="no"?><!-- PUC - AFN->AFD CONVERTER -->\n${js2xml(
			jflap,
			{ compact: true, spaces: 2 }
		)}`;
		var downloadLink = document.createElement("a");
		var blob = new Blob(["\ufeff", csv]);
		var url = URL.createObjectURL(blob);
		downloadLink.href = url;
		downloadLink.download = `AFD.csv`;

		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};

	return (
		<div style={{ display: "flex" }}>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignContent: "center",
					width: "20vw",
					borderRight: "1px dashed red",
					paddingRight: "8px",
				}}
			>
				<div style={{ height: "20vh" }}>
					<input type="file" name="file" onChange={changeHandler} />
					<p>Filename: {selectedFile?.name}</p>
					{error && (
						<h4 style={{ color: "red" }}>
							!!!Arquivo inválido!!!!
						</h4>
					)}
					<button onClick={downloadAFD}>Download AFD</button>
					<div>Intial: {AFN?.initial}</div>
					<div>Final: {AFN?.finals?.map((final) => `${final},`)}</div>
				</div>
				<div
					style={{
						display: "flex",
					}}
				>
					<div
						style={{
							width: "200px",
							border: "1px solid black",
							borderRadius: "4px",
							padding: "4px",
							textAlign: "center",
							overflowY: "auto",
							height: "calc(100vh - 30vh)",
							marginRight: "8px",
						}}
					>
						<div>Transition Matrix (AFN) </div>
						{isValid && (
							<div
								style={{
									borderTop: "1px solid gray",
								}}
							>
								{[...AFN?.states?.keys()].map((state) => {
									return [
										...AFN?.states?.get(state)!.keys(),
									].map((transition) => {
										return (
											<div
												key={state + transition}
												style={{
													borderBottom:
														"1px solid gray",
												}}
											>
												<div>From: {state}</div>
												<div>With: {transition}</div>
												<div>
													To:{" "}
													{AFN?.states
														.get(state)
														?.get(transition)
														?.map((c) => `${c}, `)}
												</div>
											</div>
										);
									});
								})}
							</div>
						)}
					</div>
					<div
						style={{
							width: "200px",
							border: "1px solid black",
							borderRadius: "4px",
							padding: "4px",
							textAlign: "center",
							overflowY: "auto",
							height: "calc(100vh - 30vh)",
						}}
					>
						<div>Transition Matrix (AFD) </div>
						{isValid && (
							<div
								style={{
									borderTop: "1px solid gray",
								}}
							>
								{[...AFD?.states?.keys()].map((state) => {
									return [
										...AFD?.states?.get(state)!.keys(),
									].map((transition) => {
										return (
											<div
												key={state + transition}
												style={{
													borderBottom:
														"1px solid gray",
												}}
											>
												<div>From: {state}</div>
												<div>With: {transition}</div>
												<div>
													To:{" "}
													{AFD.states
														.get(state)!
														.get(transition)}
												</div>
											</div>
										);
									});
								})}
							</div>
						)}
					</div>
				</div>
			</div>
			<div style={{ padding: "0 8px" }}>
				<input ref={inputRef} />
				<button onClick={handleValidation}> Test </button>
				{validation.isValid ? (
					<h4 style={{ color: "green" }}>
						VALID, stoped at {validation.currentState}
					</h4>
				) : (
					<h4 style={{ color: "red" }}>INVALID</h4>
				)}
				<h3>
					{validation?.logs?.map((log, index) => {
						return `${index !== 0 ? " |- " : ""}[${
							log.currentState
						}, ${log.sentence}]`;
					})}
				</h3>
			</div>
		</div>
	);
}
