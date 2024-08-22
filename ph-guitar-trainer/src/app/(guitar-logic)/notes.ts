import { randomUUID } from "crypto";

export enum NoteEnum {
	C = "C",
	CSharpDFlat = "C#/Db",
	D = "D",
	DSharpEFlat = "D#/Eb",
	E = "E",
	F = "F",
	FSharpGFlat = "F#/G#",
	G = "G",
	GSharpAFlat = "G#/Ab",
	A = "A",
	ASharpBFlat = "A#/Bb",
	B = "B",
}

// (17.12.2023) dont plan to use this
// but i want to list all possible chord types here
export enum ChordTypes {}

export class Note {
	protected note: NoteEnum;
	private color: string;
	private uuid: string;
	private noteIsNatural: boolean;
	noteName: string;
	noteNameFlat: string | null = null;
	noteNameSharp: string | null = null;

	// ! Basically a kind of doubly linked list implementation
	// ! for all notes
	// A half step up from the current note
	public nextNote: Note = null;

	// A half step down from the current note
	public previousNote: Note = null;
	// static allNotesInOrderFromC: Note[] = [];
	// If the note is not a full note, it is a sharp or flat

	constructor(
		note: NoteEnum,
		color: string,
		isNatural: boolean,
		uuid: string
	) {
		this.note = note;
		this.color = color;
		this.uuid = uuid;
		this.noteIsNatural = isNatural;
		this.noteName = this.note.toString();
	}

	/**
	 * Because i depend on the nextNote and previousNote properties
	 * to be set which i do at the end of this file i have to call this
	 * function after all notes are created to set the noteNameFlat and noteNameSharp
	 */
	initFlatAndSharpNames() {
		if (!this.isNatural) {
			this.noteNameFlat = `${this.halfStepUp().noteName}b`;
			this.noteNameSharp = `${this.halfStepDown().noteName}#`;
		}
	}

	get noteValue(): NoteEnum {
		return this.note;
	}

	get uuidValue(): string {
		return this.uuid;
	}

	// Wether the note is a full note or not
	get isNatural(): boolean {
		return this.noteIsNatural;
	}

	get colorValue(): string {
		return this.color;
	}

	wholeStepUp(): Note {
		if (this.nextNote === null) {
			throw new Error("Note.nextNote is null");
		}
		return this.nextNote.nextNote;
	}

	wholeStepDown(): Note {
		if (this.previousNote === null) {
			throw new Error("Note.previousNote is null");
		}
		return this.previousNote.previousNote;
	}

	halfStepUp(): Note {
		if (this.nextNote === null) {
			throw new Error("Note.nextNote is null");
		}
		return this.nextNote;
	}

	halfStepDown(): Note {
		if (this.previousNote === null) {
			throw new Error("Note.previousNote is null");
		}
		return this.previousNote;
	}

	walkUpHalfSteps(amountHalfSteps: number): Note {
		let currentNote: Note = this;
		for (let i = 0; i < amountHalfSteps; i++) {
			currentNote = currentNote.halfStepUp();
		}
		return currentNote;
	}

	walkUpWholeSteps(amountWholeSteps: number): Note {
		let currentNote: Note = this;
		for (let i = 0; i < amountWholeSteps; i++) {
			currentNote = currentNote.wholeStepUp();
		}
		return currentNote;
	}

	walkDownHalfSteps(amountHalfSteps: number): Note {
		let currentNote: Note = this;
		for (let i = 0; i < amountHalfSteps; i++) {
			currentNote = currentNote.halfStepDown();
		}
		return currentNote;
	}

	walkDownWholeSteps(amountWholeSteps: number): Note {
		let currentNote: Note = this;
		for (let i = 0; i < amountWholeSteps; i++) {
			currentNote = currentNote.wholeStepDown();
		}
		return currentNote;
	}

	/**
	 * Get the major scale of the current note as root
	 *
	 * Major scale in music is defined as:
	 * Root - Whole step - Whole step - Half step - Whole step - Whole step - Whole step - Half step
	 *
	 * @returns An array of notes that make up the major scale
	 */
	getMajorScale(): Note[] {
		var scale: Note[] = [];
		scale.push(this);
		scale.push(this.wholeStepUp());
		scale.push(this.wholeStepUp().wholeStepUp());
		scale.push(this.wholeStepUp().wholeStepUp().halfStepUp());
		scale.push(this.wholeStepUp().wholeStepUp().halfStepUp().wholeStepUp());
		scale.push(
			this.wholeStepUp()
				.wholeStepUp()
				.halfStepUp()
				.wholeStepUp()
				.wholeStepUp()
		);
		scale.push(
			this.wholeStepUp()
				.wholeStepUp()
				.halfStepUp()
				.wholeStepUp()
				.wholeStepUp()
				.wholeStepUp()
		);
		scale.push(
			this.wholeStepUp()
				.wholeStepUp()
				.halfStepUp()
				.wholeStepUp()
				.wholeStepUp()
				.wholeStepUp()
				.halfStepUp()
		);

		return scale;
	}

	/**
	 * Get the minor aolean scale of the current note as root
	 *
	 * Minor scale aolean in music is defined as:
	 * Root - Whole step - Half step - Whole step - half step - Whole step - Whole step
	 *
	 * @returns An array of notes that make up the minor scale
	 */
	getMinorAoleanScale(): Note[] {
		var scale: Note[] = [];

		scale.push(this);
		scale.push(this.wholeStepUp());
		scale.push(this.wholeStepUp().halfStepUp());
		scale.push(this.wholeStepUp().halfStepUp().wholeStepUp());
		scale.push(this.wholeStepUp().halfStepUp().wholeStepUp().wholeStepUp());
		scale.push(
			this.wholeStepUp()
				.halfStepUp()
				.wholeStepUp()
				.wholeStepUp()
				.halfStepUp()
		);
		scale.push(
			this.wholeStepUp()
				.halfStepUp()
				.wholeStepUp()
				.wholeStepUp()
				.halfStepUp()
				.wholeStepUp()
		);
		scale.push(
			this.wholeStepUp()
				.halfStepUp()
				.wholeStepUp()
				.wholeStepUp()
				.halfStepUp()
				.wholeStepUp()
				.wholeStepUp()
		);

		return scale;
	}
}

export const NoteC = new Note(
	NoteEnum.C,
	"#9ABC56",
	true,
	"df84637d-ee6a-43fe-a0d4-839cbd87377d"
);

export const NoteCSharpDFlat = new Note(
	NoteEnum.CSharpDFlat,
	"#AAC46F",
	false,
	"de9b6e8b-5c02-4742-9ac2-c610a2821fb2"
);

export const NoteD = new Note(
	NoteEnum.D,
	"#7558A1",
	true,
	"f4e72cb4-e32a-40f0-8635-1c2b01c22903"
);

export const NoteDSharpEFlat = new Note(
	NoteEnum.DSharpEFlat,
	"#9ABC56",
	false,
	"df84637d-ee6a-43fe-a0d4-839cbd87377d"
);

export const NoteE = new Note(
	NoteEnum.E,
	"#AAC46F",
	true,
	"b3d3002f-d496-44a5-907c-aba5e427e8d0"
);

export const NoteF = new Note(
	NoteEnum.F,
	"#7558A1",
	true,
	"5ab6b554-b31c-4521-9c25-3bf97a7d246d"
);

export const NoteFSharpGFlat = new Note(
	NoteEnum.FSharpGFlat,
	"#9ABC56",
	false,
	"3f908b0c-1ac7-4286-8942-31db66ed287c"
);

export const NoteG = new Note(
	NoteEnum.G,
	"#AAC46F",
	true,
	"8c736369-bf9b-4a55-bd20-b13476899b09"
);

export const NoteGSharpAFlat = new Note(
	NoteEnum.GSharpAFlat,
	"#7558A1",
	false,
	"60512aab-5a9f-44a8-ad8b-6b6fc3737b0f"
);

export const NoteA = new Note(
	NoteEnum.A,
	"#9ABC56",
	true,
	"ae143380-dc63-4d32-87d8-b068fdd09053"
);

export const NoteASharpBFlat = new Note(
	NoteEnum.ASharpBFlat,
	"#AAC46F",
	false,
	"cb1d5a1b-1deb-4ffa-b5d0-824e072c1195"
);

export const NoteB = new Note(
	NoteEnum.B,
	"#7558A1",
	true,
	"a434086c-039c-4b3f-b7ce-523c5ed541e4"
);

NoteC.nextNote = NoteCSharpDFlat;
NoteCSharpDFlat.nextNote = NoteD;
NoteD.nextNote = NoteDSharpEFlat;
NoteDSharpEFlat.nextNote = NoteE;
NoteE.nextNote = NoteF;
NoteF.nextNote = NoteFSharpGFlat;
NoteFSharpGFlat.nextNote = NoteG;
NoteG.nextNote = NoteGSharpAFlat;
NoteGSharpAFlat.nextNote = NoteA;
NoteA.nextNote = NoteASharpBFlat;
NoteASharpBFlat.nextNote = NoteB;
NoteB.nextNote = NoteC;

NoteC.previousNote = NoteB;
NoteCSharpDFlat.previousNote = NoteC;
NoteD.previousNote = NoteCSharpDFlat;
NoteDSharpEFlat.previousNote = NoteD;
NoteE.previousNote = NoteDSharpEFlat;
NoteF.previousNote = NoteE;
NoteFSharpGFlat.previousNote = NoteF;
NoteG.previousNote = NoteFSharpGFlat;
NoteGSharpAFlat.previousNote = NoteG;
NoteA.previousNote = NoteGSharpAFlat;
NoteASharpBFlat.previousNote = NoteA;
NoteB.previousNote = NoteASharpBFlat;

NoteCSharpDFlat.initFlatAndSharpNames();
NoteDSharpEFlat.initFlatAndSharpNames();
NoteFSharpGFlat.initFlatAndSharpNames();
NoteGSharpAFlat.initFlatAndSharpNames();
NoteASharpBFlat.initFlatAndSharpNames();

export const AllNotesInList = [
	NoteC,
	NoteCSharpDFlat,
	NoteD,
	NoteDSharpEFlat,
	NoteE,
	NoteF,
	NoteFSharpGFlat,
	NoteG,
	NoteGSharpAFlat,
	NoteA,
	NoteASharpBFlat,
	NoteB,
];
