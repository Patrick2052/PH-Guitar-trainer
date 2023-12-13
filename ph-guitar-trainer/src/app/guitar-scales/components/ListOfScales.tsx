import MajorScale from "./MajorScale";
import { notes as notesBase, Note } from "../_guitar/notes";
import React from "react";
import { get } from "http";

type MajorScaleRootObject = {
	note: Note;
	isPinned: boolean;
};

export default function ListOfScales({
	addMarkedNote,
	removeMarkedNote,
	markedNotes,
}: {
	addMarkedNote: (note: Note) => void;
	removeMarkedNote: (note: Note) => void;
	markedNotes: Note[];
}) {
	const [majorScales, setMajorScales] =
		React.useState<MajorScaleRootObject[]>();

	function getRootsOfMajorScalesOrderedFromC(): MajorScaleRootObject[] {
		return notesBase.map((note) => {
			return {
				note: note.note,
				isPinned: false,
			};
		});
	}

	React.useEffect(() => {
		let majors = getRootsOfMajorScalesOrderedFromC();
		setMajorScales(majors);
	}, []);

	function pinMajorScale(root: Note) {
		//! reset order first
		let orderedMajors = getRootsOfMajorScalesOrderedFromC();

		setMajorScales((prevMajorScales) => {
			if (!prevMajorScales) return;

			prevMajorScales.map((majorScale) => {
				if (majorScale.isPinned === true) {
					orderedMajors.find(
						(orderedMajor) => orderedMajor.note === majorScale.note
					)!.isPinned = true;
				}
			});

			let thisMajorScale = orderedMajors?.find(
				(scaleObj) => scaleObj.note === root
			);
			if (thisMajorScale === undefined) return;
			thisMajorScale.isPinned
				? (thisMajorScale.isPinned = false)
				: (thisMajorScale.isPinned = true);

			orderedMajors?.sort((a, b) =>
				b.isPinned === a.isPinned ? 0 : a.isPinned ? -1 : 1
			);
			return [...orderedMajors];
		});
	}

	const [showMajorScales, setShowMajorScales] = React.useState<boolean>(true);

	return (
		<>
			<h1>Scales</h1>
			<p>This is a section containing different kinds of scales</p>
			<div className="flex items-center gap-2 mb-1 mt-[2.5rem]">
				<h2 className="m-0">Major Scales</h2>
				<button
					className="grid place-items-center"
					onClick={() =>
						showMajorScales
							? setShowMajorScales(false)
							: setShowMajorScales(true)
					}
				>
					{showMajorScales ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
							/>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
						</svg>
					)}
				</button>
			</div>
			{showMajorScales && (
				<>
					<p className="flex gap-1 flex-wrap">
						Below you can see major scales of a given root. They are
						build from the base set of notes with the pattern:
						<b>
							whole Step, whole Step, half Step, whole Step, whole
							Step, whole Step, half Step
						</b>
					</p>
					<ul className="flex flex-col gap-2">
						{majorScales?.map((majorScaleObject, index, array) => {
							return (
								<li>
									<MajorScale
										key={`major-scale-object-render-2-${majorScaleObject.note}`}
										addMarkedNote={addMarkedNote}
										removeMarkedNote={removeMarkedNote}
										markedNotes={markedNotes}
										root={majorScaleObject.note}
										notesWithColors={notesBase}
										pinThisMajorScale={() =>
											pinMajorScale(majorScaleObject.note)
										}
										isPinned={majorScaleObject.isPinned}
									/>
								</li>
							);
						})}
					</ul>
				</>
			)}
		</>
	);
}
