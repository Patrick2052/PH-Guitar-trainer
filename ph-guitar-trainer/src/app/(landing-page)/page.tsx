import Image from "next/image";
import Link from "next/link";
import EigthNoteIcon from "../(icons)/8th-note-icon";

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-between">
			<section
				id="hero-section"
				// className="pt-32 min-h-[60dvh] grid place-items-center bg-gradient-to-br from-transparent via-teal-50 via-25% via-teal-400 via-30% to-transparent w-full"
				className="pt-32 min-h-[60dvh] grid place-items-center hero-bg-animate bg-gradient-to-r
				from-teal-500
				via-violet-400
				to-fuchsia-400
				background-animate w-full"
			>
				<div className="flex flex-col items-center justify-center gap-6">
					<div className="flex flex-col gap-4 items-center justify-center mx-page-side-margin">
						<span className="text-[6rem] font-bold text-center text-slate-50 text-shadow">
							Gain Mastery Over The Fretboard
						</span>
						<p className="flex gap-2 text-lg text-slate-100 opacity-90">
							<EigthNoteIcon className="w-6 h-6" />
							{/* Don't let missing knowledge hold you back from being
							the best guitarist you can be. */}
							Get an overview of the fretboard and learn scales
							and chords.
							<EigthNoteIcon className="w-6 h-6" />
						</p>
					</div>
					<div id="call-to-action-container" className="mt-8">
						<Link
							href="/guitar-scales"
							className="px-10 py-4 
							bg-rose-500							
							bg-opacity-85 backdrop-blur-xl text-slate-50 shadow-lg text-xl font-semibold rounded-full"
						>
							Start Practicing!
						</Link>
					</div>
				</div>
			</section>
			<div className="h-[3000px]"></div>
		</main>
	);
}
