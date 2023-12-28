import { Note, noteIterator, type NoteObject, notes } from "./notes";

type GuitarString = NoteObject[];
type FretboardType = GuitarString[];

export class Fretboard {
    strings: number
    frets: number
    // tuning: Note[] = [Note.E, Note.A, Note.D, Note.G, Note.B, Note.E];
    // tuning starts with the highest string
    // tuning: Note[] = [Note.E, Note.B, Note.G, Note.D, Note.A, Note.E];
    tuning: Note[];
    fretboard: FretboardType;

    constructor(amountFrets: number = 12, amountStrings: number = 6, tuning: Note[] = [Note.E, Note.B, Note.G, Note.D, Note.A, Note.E]) {
        // this.tuning = tuning;
        this.strings = amountStrings;
        this.frets = amountFrets;
        this.tuning = tuning;
        this.fretboard = this.createFretboard(this.strings, this.frets);
    }

    createFretboard(amountStrings: number, amountFrets: number, tuning: Note[] = this.tuning): FretboardType {
        let fretboard: FretboardType = [];
        for (let i = 0; i < amountStrings; i++) {
            let root = tuning[i];
            let guitarString: GuitarString = [{note: root, color: notes.find(note => note.note === root).color, id: notes.find(note => note.note === root).id}];
            let iterator = noteIterator(root)[Symbol.iterator]();
            // ! skip root note
            iterator.next();
            for (let i = 0; i < amountFrets; i++) {
                let note: NoteObject = iterator.next().value;
                guitarString.push(note);
            }
            fretboard.push(guitarString);
        }
        return fretboard;
    }

    /**
     * Changes the tuning on this fretboard and updates the fretboard
     * @param tuning: The new tuning for this fretboard as a list of Notes starting with the highest string
     * has to be the same lenght as the amount of strings on this fretboard
     */
    changeTuning(tuning: Note[]) {
        if (tuning.length !== this.strings) {
            throw new Error(`Tuning must have ${this.strings} notes`);
        }
        this.tuning = tuning;
        this.fretboard = this.createFretboard(this.strings, this.frets, tuning);
    }
}