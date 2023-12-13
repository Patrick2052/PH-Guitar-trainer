import {
	getMajorScaleOfRoot,
	getBasicChordOfNote,
	Note,
} from "../_guitar/notes";
import { NoteObject } from "../_guitar/notes";
import NoteSquare from "./NoteSquare";

/**
 *
 * The onPinCallback is called once the pin button is pressed
 */
export default function MajorScale({
	root,
	addMarkedNote,
	removeMarkedNote,
	markedNotes,
	notesWithColors,
	pinThisMajorScale,
	isPinned,
}: {
	root: Note;
	addMarkedNote: (note: Note) => void;
	removeMarkedNote: (note: Note) => void;
	markedNotes: Note[];
	notesWithColors?: NoteObject[];
	pinThisMajorScale: () => void;
	isPinned: boolean;
}) {
	let majorScale = getMajorScaleOfRoot(root);
	return (
		<div className={`major-scale ${isPinned && "bg-gray-500 rounded p-4"}`}>
			<section>
				<div className="flex gap-4 items-center phone:flex-col phone:items-start phone:gap-1 phone:mb-6">
					<h3 className={`${isPinned && "text-orange-300"}`}>
						{root} Major Scale
					</h3>
					<button onClick={() => pinThisMajorScale()}>
						<div
							className={`flex flex-row items-center text-gray-400 underline`}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
								/>
							</svg>
							<span>{isPinned ? "Unpin" : "Pin to top"}</span>
						</div>
					</button>

					<button
						className="py-1 px-2 rounded underline text-gray-400"
						onClick={() => {
							let chord = getBasicChordOfNote(root);
							chord.forEach((note) => {
								addMarkedNote?.(note);
							});
						}}
					>
						Highlight basic {root} chord
					</button>

					<button
						onClick={() => {
							majorScale.forEach((note) => {
								removeMarkedNote(note);
							});
						}}
						className="py-1 px-2 rounded underline text-gray-400"
					>
						Unmark all notes in this scale
					</button>
				</div>{" "}
			</section>
			<div className="scale flex overflow-x-auto">
				{majorScale.map((note, index) => {
					let biggerMarginLeft: boolean = [0, 1, 2, 4, 5, 6].includes(
						index
					);
					return (
						<div>
							<button
								key={`note-option-${note}`}
								onClick={() => {
									markedNotes.includes(note)
										? removeMarkedNote(note)
										: addMarkedNote(note);
								}}
								className={`relative ${
									biggerMarginLeft ? "ml-12 w-[6rem]" : "ml-1"
								}`}
							>
								<>
									<NoteSquare
										note={note}
										highlight={markedNotes.includes(note)}
										highlightedColor={
											notesWithColors?.find(
												(n) => n.note === note
											)?.color
										}
										tailwindWidth={
											biggerMarginLeft
												? "w-[6rem]"
												: "w-[6rem]"
										}
									/>
									{index + 1 === 1 && (
										<span className="text-sm text-gray-400">
											root
										</span>
									)}
									{index + 1 === 3 && (
										<span className="text-sm text-gray-400">
											third
										</span>
									)}
									{index + 1 === 5 && (
										<span className="text-sm text-gray-400">
											fifth
										</span>
									)}
									{/* <span>{index + 1}</span> */}
								</>
								<span className="absolute top-[-1.4rem] left-[0px] text-sm text-gray-400">
									{index + 1}
								</span>
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}
