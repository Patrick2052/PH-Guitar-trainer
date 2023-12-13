"use client";

import { Fretboard } from "../_guitar/fretboard";
import React, { Dispatch, SetStateAction } from "react";
import {
	getBasicChordOfNote,
	getMajorScaleOfRoot,
	notes as notesBase,
	Note,
	NoteObject,
} from "../_guitar/notes";

import MajorScale from "./MajorScale";
import NoteSquare from "./NoteSquare";

export default function FretboardComponent({
	fretboard,
	setFretboard,
	markedNotes,
	addMarkedNote,
	removeMarkedNote,
}: {
	fretboard: Fretboard;
	setFretboard: Dispatch<SetStateAction<Fretboard>>;
	markedNotes: Note[];
	addMarkedNote: (note: Note) => void;
	removeMarkedNote: (note: Note) => void;
}) {
	// const [markedNotes, setMarkedNotes] = React.useState<Note[]>([]);
	// const addMarkedNote = (note: Note) => {
	// 	if (!markedNotes.includes(note)) {
	// 		setMarkedNotes((prev) => [...prev, note]);
	// 	}
	// };
	// const removeMarkedNote = (note: Note) => {
	// 	if (markedNotes.includes(note)) {
	// 		setMarkedNotes((prev) => prev.filter((n) => n !== note));
	// 	}
	// };

	const [notes, setNotes] = React.useState<NoteObject[]>(notesBase);

	return (
		<>
			<section id="fretboard-section">
				<div
					id="fretboard"
					className="scale border-4 border-yellow-600 flex flex-col gap-3 justify-evenly bg-[#fff] rounded shadow-xl py-4 overflow-x-auto"
				>
					<div
						id="fret-count"
						className="grid border-b pb-3 border-b-black"
						style={{
							gridTemplateColumns: `repeat(${
								fretboard.frets + 1
							}, 1fr)`,
						}}
					>
						{Array.from({ length: fretboard.frets + 1 }).map(
							(_, index) => {
								let highlight: boolean = [
									3, 5, 7, 9, 12, 15, 17, 19, 21, 24,
								].includes(index);
								return (
									<div
										className={`w-full justify-center flex min-w-[70px]`}
									>
										<span
											className={`rounded-full flex text-[1.5rem] justify-center items-center w-10 h-10 p-2 ${
												highlight
													? "bg-slate-700 text-slate-200 font-bold"
													: ""
											}`}
										>
											{index}
										</span>
									</div>
								);
							}
						)}
					</div>
					{fretboard.fretboard.map((guitarString) => (
						<div
							key={`guitar-string-${guitarString[0].note}`}
							className={`string grid`}
							style={{
								gridTemplateColumns: `repeat(${
									fretboard.frets + 1
								}, 1fr)`,
							}}
						>
							{guitarString.map((note, index) => {
								let isMarked = markedNotes.includes(note.note);

								return index === 0 ? (
									// ! First note of the string
									<div
										className={`border-r-8 border-r-black min-w-[70px] ${
											isMarked
												? `bg-[${note.color}] font-bold text-gray-200`
												: ""
										}`}
										style={{
											backgroundColor: isMarked
												? note.color
												: "",
										}}
									>
										<span className="text-gray-400 text-center  min-w-[70px]">
											{note.note}
										</span>
									</div>
								) : (
									// ! Rest of the notes of the string
									<div
										key={`guitar-string-note-${note.note}-${index}`}
										className={`note-container flex items-center justify-center w-full m-auto border-r border-l border-l-black border-r-black ${
											isMarked
												? `bg-[${note.color}] font-bold text-gray-200`
												: ""
										}`}
										style={{
											backgroundColor: isMarked
												? note.color
												: "",
										}}
									>
										<span className=" text-center min-w-[70px]">
											{note.note}
										</span>
									</div>
								);
							})}
						</div>
					))}
				</div>
			</section>
		</>
	);
}
