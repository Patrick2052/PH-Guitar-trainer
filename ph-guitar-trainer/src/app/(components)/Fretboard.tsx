"use client";

import React from "react";

import {
	NoteC,
	Note,
	NoteASharpBFlat,
	NoteA,
	NoteE,
	NoteB,
	NoteG,
	NoteD,
} from "../(guitar-logic)/notes";

type fret = Note[];

export default function Fretboard({
	amountFrets = 12,
	tuning = [NoteE, NoteB, NoteG, NoteD, NoteA, NoteE],
}: {
	amountFrets?: number;
	tuning?: Note[];
}) {
	// const [fretCount, setFretCount] = React.useState(amountFrets);

	// // the tuning at the same time says how many strings there are.
	// // the tuning should start from the highest string, so the first element is the highest string.
	// // in the default tuning (EADGBE) the first element is the high E string (the highest string).
	// const [tuning, setTuning] = React.useState(tuning);

	// const [strings, setStrings] = React.useState(tuning.map((note) => [note]));

	function getFrets() {
		const frets: fret[] = [];

		for (let fretIndex = 0; fretIndex < amountFrets; fretIndex++) {
			let newFret: fret = [];

			for (let j = 0; j < tuning.length; j++) {
				const stringRootNote = tuning[j];
				newFret.push(stringRootNote.walkUpHalfSteps(fretIndex));
			}

			frets.push(newFret);
		}

		return frets;
	}

	const [frets, setFrets] = React.useState<fret[]>(getFrets());

	React.useEffect(() => {
		setFrets(getFrets());
	}, [amountFrets, tuning]);

	return (
		<div
			id="fretboard" // contains strings and frets
			className="flex flex-row gap-4 justify-center items-center"
		>
			{frets.map((fret, fretIndex) => {
				return (
					<div
						key={`fret-${fretIndex}`}
						className="flex flex-col gap-2 justify-center"
					>
						{fret.map((note, stringIndex) => {
							return (
								<div
									key={`note-${stringIndex}`}
									className="flex justify-center"
								>
									<span className="text-2xl">
										{note.noteValue}
									</span>
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
}
