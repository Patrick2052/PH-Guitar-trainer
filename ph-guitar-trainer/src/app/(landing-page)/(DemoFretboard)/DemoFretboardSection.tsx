"use client";

import React from "react";

import DemoFretboard from "./DemoFretboard";
import { AllNotesInList } from "@/app/(guitar-logic)/notes";
import { defaultTuning } from "@/app/(guitar-logic)/tunings";
import { Note } from "@/app/(guitar-logic)/notes";

export default function DemoFretboardSection() {
	const [amountFrets, setAmountFrets] = React.useState<number>(12);
	const [markedNotes, setMarkedNotes] = React.useState<Note[]>([]);

	function toggleNoteInMarkedNotes(note: Note) {
		if (markedNotes.includes(note)) {
			setMarkedNotes((prev) => prev.filter((n) => n !== note));
		} else {
			setMarkedNotes((prev) => [...prev, note]);
		}
	}

	return (
		<section className="mt-landing-page-flow gap-8 flex flex-col items-center w-full">
			<div>
				<span className="text-xl">Demo</span>
			</div>
			<ul className="flex flex-row gap-1">
				<button
					onClick={() => {
						AllNotesInList.map((note) =>
							toggleNoteInMarkedNotes(note)
						);
					}}
				>
					All
				</button>
				{AllNotesInList.map((note) => {
					return (
						<li>
							<button
								key={`${note.noteValue}-button`}
								onClick={() => {
									if (!markedNotes.includes(note)) {
										setMarkedNotes((prev) => [
											...prev,
											note,
										]);
									} else {
										setMarkedNotes((prev) =>
											prev.filter((n) => n !== note)
										);
									}
								}}
								className={`p-2 bg-[${note.colorValue}] text-xl font-semibold border-teal-500 border-2 text-teal-500 gap-1 w-12 h-12 rounded-full hover:translate-y-[-2px] transition-all hover:shadow-xl`}
							>
								{note.isNatural
									? note.noteName
									: note.noteNameSharp}
							</button>
						</li>
					);
				})}
			</ul>
			<section className="w-full mx-40">
				<DemoFretboard
					amountFrets={amountFrets}
					tuning={defaultTuning}
					markedNotes={markedNotes}
				/>
			</section>

			{/* <button
				onClick={() => {
					setAmountFrets((prev) => (prev += 1));
				}}
			>
				plus
			</button> */}
		</section>
	);
}
