import { UUID, randomUUID } from "crypto";

/**
 * A util function to advance an iterator by a given number of steps
 * 
 */
function advanceIterator(iterator: Generator, steps: number) {
    for (let i = 0; i < steps; i++) {
      iterator.next();
    }
  }

export enum Note {
    C = "C",
    Csharp = "C#/Db",
    D = "D",
    Dsharp = "D#/Eb",
    E = "E",
    F = "F",
    Fsharp = "F#/Gb",
    G = "G",
    Gsharp = "G#/Ab",
    A = "A",
    Asharp = "A#/Bb",
    B = "B"
}

export type majorScale = [Note, Note, Note, Note, Note, Note, Note, Note]

export type NoteObject = {
    note: Note;
    color: string;
    id: string;
    is_full_note: boolean;
}

/**
 * An array of all the notes in the chromatic scale
 */
export const notes: NoteObject[] = [
    {
        "note": Note.C,
        "color": "#9ABC56",
        "id": "df84637d-ee6a-43fe-a0d4-839cbd87377d",
	"is_full_note": true
    },
    {
        
        "note": Note.Csharp,
        "color": "#AAC46F",
        "id": "de9b6e8b-5c02-4742-9ac2-c610a2821fb2",
	"is_full_note": false
    },
    {
        "note": Note.D,
        "color": "#7558A1",
        "id": "f4e72cb4-e32a-40f0-8635-1c2b01c22903",
	"is_full_note": true
    },
    {
        
        "note": Note.Dsharp,
        "color": "#836EAA",
        "id": "6cda5c3b-933d-43a7-82bf-82f36cc3e5a6",
	"is_full_note": false

    },
    {
        "note": Note.E,
        "color": "#5B7DC0",
        "id": "b3d3002f-d496-44a5-907c-aba5e427e8d0",
	"is_full_note": true
    },
    {
        "note": Note.F,
        "color": "#E05659",
        "id": "5ab6b554-b31c-4521-9c25-3bf97a7d246d",
	"is_full_note": true
    },
    {
        
        "note": Note.Fsharp,
        "color": "#E47378",
        "id": "3f908b0c-1ac7-4286-8942-31db66ed287c",
	"is_full_note": false
    },
    {
        "note": Note.G,
        "color": "#2D467B",
        "id": "8c736369-bf9b-4a55-bd20-b13476899b09",
	"is_full_note": true
    },
    {
        
        "note": Note.Gsharp,
        "color": "#95ccdb",
        "id": "60512aab-5a9f-44a8-ad8b-6b6fc3737b0f",
	"is_full_note": false
    },
    {
        "note": Note.A,
        "color": "#E88D49",
        "id": "ae143380-dc63-4d32-87d8-b068fdd09053",
	"is_full_note": true
    },
    {
        
        "note": Note.Asharp,
        "color": "#b5b6e6",
        "id": "cb1d5a1b-1deb-4ffa-b5d0-824e072c1195",
	"is_full_note": false
    },
    {
        "note": Note.B,
        "color": "#533c82",
        "id": "a434086c-039c-4b3f-b7ce-523c5ed541e4",
	"is_full_note": true
    }
]


export const noteIterator = (startNote: Note = Note.C) => ({
    [Symbol.iterator]: function*() {
        let index = notes.findIndex(noteObject => noteObject.note === startNote);
        if (index === -1) {
            throw new Error("Invalid start note");
        }
        while (true) {
            yield notes[index % notes.length];
            index++;
        }
    }
});

function WholeStep(noteIterator: Generator): Note {
    noteIterator.next()
    return noteIterator.next().value.note
}

function HalfStep(noteIterator: Generator): Note {
    return noteIterator.next().value.note
}


export function getMajorScaleOfRoot(note: Note): majorScale {
    const iterable = noteIterator(note)
    const iterator = iterable[Symbol.iterator]()
    const scale = []

    let root = iterator.next().value.note
    scale.push(root)
    // whole step
    scale.push(WholeStep(iterator))
    // whole step
    scale.push(WholeStep(iterator))
    // half step
    scale.push(HalfStep(iterator))
    // whole step
    scale.push(WholeStep(iterator))
    // whole step
    scale.push(WholeStep(iterator))
    // whole step
    scale.push(WholeStep(iterator))
    // half step
    scale.push(HalfStep(iterator))

    return scale
}

/**
 * Returns the 1st third and 5th of the major scale of a note
 */
export function getBasicChordOfNote(note: Note) {
    const majorScale = getMajorScaleOfRoot(note)

    return [majorScale[0], majorScale[2], majorScale[4]]
}
