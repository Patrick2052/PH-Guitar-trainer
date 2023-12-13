import { Note } from "../_guitar/notes";

export default function NoteSquare({
	note,
	highlight,
	highlightedColor,
	tailwindWidth = "w-fit",
	tailwindBorderStyling = "border-black border",
}: {
	note: Note;
	highlight?: boolean;
	highlightedColor?: string;
	tailwindWidth?: string;
	tailwindBorderStyling?: string;
}) {
	let highlightStyle = `bg-[${highlightedColor}] text-gray-200`;
	return (
		<div
			className={`note-square bg-white ${tailwindBorderStyling} shadow-md ${tailwindWidth} p-4 rounded ${
				highlight ? highlightStyle : ""
			}`}
			style={{
				backgroundColor: highlight ? highlightedColor : "",
			}}
		>
			<span>{note}</span>
		</div>
	);
}
