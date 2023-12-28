"use client";

import React from "react";
import FretboardComponent from "./FretboardComponent";
import { Fretboard } from "../_guitar/fretboard";
import { Note, NoteObject, notes } from "../_guitar/notes";
import NoteSquare from "./NoteSquare";
import ListOfScales from "./ListOfScales";

export default function GuitarApplication() {
	const [fretboard, setFretboard] = React.useState(
		new Fretboard(12, 6, [Note.E, Note.A, Note.D, Note.G, Note.B, Note.E])
	);

	const [markedNotes, setMarkedNotes] = React.useState<Note[]>([]);
	/**
	 * Adds a note to the markedNotes array if the note is not already in the array
	 * it doesn't get added
	 * @param note: Note (enum)
	 */
	const addMarkedNote = (note: Note) => {
		if (!markedNotes.includes(note)) {
			setMarkedNotes((prev) => [...prev, note]);
		}
	};
	/**
	 * Removes a note from the markedNotes array if the note is in the array
	 * it doesn't get removed
	 * @param note: Note (enum)
	 */
	const removeMarkedNote = (note: Note) => {
		if (markedNotes.includes(note)) {
			setMarkedNotes((prev) => prev.filter((n) => n !== note));
		}
	};

	const [tuningInput, setTuningInput] =
		React.useState<string>("E, A, D, G, B, E");

	return (
		<div>
			<section className="mb-12">
				<h2>Tuning</h2>
				<p>
					Here you can change the tuning of the guitar. The default
					tuning is standard tuning (EADGBE) Highest string first -
					lowest string last Comma seperated and in Capital letters
				</p>
				<div>
					<form
						onSubmit={(e) => e.preventDefault()}
						className="flex gap-2 flex-wrap"
					>
						<input
							type="text"
							id="tuning"
							className="border border-black rounded shadow-sm p-1"
							value={tuningInput}
							onChange={(e) => setTuningInput(e.target.value)}
						/>
						<button
							type="submit"
							className="bg-indigo-600 text-white p-2 rounded"
							onClick={() => {
								let newFretboard = new Fretboard(
									fretboard.frets,
									fretboard.strings,
									tuningInput
										.split(",")
										.map((note) => note.trim())
										.map(
											(note) =>
												Note[note as keyof typeof Note]
										)
								);
								setFretboard(newFretboard);
							}}
						>
							Use New Tuning
						</button>
						<button
							className="bg-black text-white p-2 rounded"
							onClick={() => {
								setTuningInput("E, A, D, G, B, E");
								let newFretboard = new Fretboard(
									fretboard.frets,
									fretboard.strings,
									[
										Note.E,
										Note.A,
										Note.D,
										Note.G,
										Note.B,
										Note.E,
									]
								);
								setFretboard(newFretboard);
							}}
						>
							Reset Tuning to Standard (EADGBE)
						</button>
					</form>
				</div>

				<h2>All notes</h2>
				<p>
					Here you have every note in western music. Click on a note
					to mark it on the fretboard
				</p>
				<ul className="flex gap-1 overflow-x-auto">
					{notes.map((note) => (
						<li>
							<button
								key={`note-option-${note.note}`}
								onClick={() => {
									markedNotes.includes(note.note)
										? setMarkedNotes(
												markedNotes.filter(
													(n) => n !== note.note
												)
										  )
										: setMarkedNotes((prev) => [
												...prev,
												note.note,
										  ]);
								}}
							>
								<NoteSquare
									note={note.note}
									highlight={markedNotes.includes(note.note)}
									highlightedColor={note.color}
								/>
							</button>
						</li>
					))}
				</ul>
			</section>

			<section className="mb-4 flex gap-4 flex-wrap">
				<button
					className={`border border-black transition-all rounded shadow-sm p-1 hover:bg-white hover:text-black ${
						markedNotes.length > 0 && "bg-red-600 text-slate-100"
					}`}
					onClick={() => setMarkedNotes([])}
				>
					Clear highlighted notes
				</button>
				<div className="option gap-1 flex items-center">
					<label htmlFor="fret-count">Amount Frets: </label>
					<input
						type="number"
						id="fret-count"
						className="border border-black rounded shadow-sm p-1"
						value={fretboard.frets}
						onChange={(e) => {
							let newFretboard = new Fretboard(
								parseInt(e.target.value)
							);
							setFretboard(newFretboard);
						}}
					/>
				</div>
			</section>

			<FretboardComponent
				fretboard={fretboard}
				setFretboard={setFretboard}
				markedNotes={markedNotes}
				addMarkedNote={addMarkedNote}
				removeMarkedNote={removeMarkedNote}
			/>

			<ListOfScales
				addMarkedNote={addMarkedNote}
				removeMarkedNote={removeMarkedNote}
				markedNotes={markedNotes}
			/>
		</div>
	);
}
