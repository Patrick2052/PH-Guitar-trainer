import Image from "next/image";
import Link from "next/link";
import EigthNoteIcon from "../(icons)/8th-note-icon";
import ChevronDoubleRight from "../(icons)/chevron-double-right";
import EyeIcon from "../(icons)/eye-icon";
import Adjustments from "../(icons)/adjustments";
import DemoFretboardSection from "./(DemoFretboard)/DemoFretboardSection";

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
						<span className="text-[3rem] lg:text-[6rem] font-bold text-center text-slate-50 text-shadow">
							Gain Mastery Over The Fretboard
						</span>
						<p className="flex gap-2 text-lg text-slate-300 font-medium opacity-80 max-w-[90%] lg:max-w-[60%] text-center items-center">
							<EigthNoteIcon className="w-8 h-8" />
							{/* Don't let missing knowledge hold you back from being
							the best guitarist you can be. */}
							A tool to help you on your guitar learning journey,
							to connect the dots between notes, scales and
							chords. It is exactly what I was looking for but
							couldn't find. So I build it myself.
							<EigthNoteIcon className="w-8 h-8" />
						</p>
					</div>
					<div id="call-to-action-container" className="mt-8">
						<Link
							href="/guitar-scales"
							className="px-10 py-4 
							bg-rose-500							
							bg-opacity-85 backdrop-blur-xl text-slate-50 shadow-lg text-xl font-semibold rounded-full hover:border-2 border-rose-500 hover:text-rose-500 hover:bg-slate-50 hover:bg-opacity-60 hover:backdrop-blur-xl transition-all duration-300 ease-in-hover:out"
						>
							Start Practicing!
						</Link>
					</div>
				</div>
			</section>

			<section className="w-full mt-landing-page-flow">
				<ul className="flex flex-row flex-wrap justify-evenly gap-8 mx-page-side-margin">
					<li className="min-w-[20rem] card flex-grow items-center justify-center  shadow-xl bg-slate-100 hover:text-teal-500 text-slate-600 transition-all rounded-3xl p-8 max-w-[30%] border-2 hover:border-teal-500 border-opacity-75">
						<div className="flex flex-col gap-4 justify-center items-center">
							<span className="flex justify-center">
								<Adjustments className="w-12 h-12" />
							</span>
							<span className="text-3xl font-bold text-center">
								Digital Fretboard
							</span>
							<p className="text-center">
								Mark notes and scales on the fretboard
							</p>
						</div>
					</li>
					<li className="min-w-[20rem] card flex-grow items-center justify-center  shadow-xl bg-slate-100 hover:text-teal-500 text-slate-600 transition-all rounded-3xl p-8 max-w-[30%] border-2 hover:border-teal-500 border-opacity-75">
						<div className="flex flex-col gap-4 justify-center items-center">
							<span className="flex justify-center">
								<ChevronDoubleRight className="w-12 h-12" />
							</span>
							<span className="text-3xl font-bold text-center">
								Fretboard Trainer
							</span>
							<p className="text-center">
								(coming soon) Practice finding notes, scales and
								chords with the fretboard trainer.
							</p>
						</div>
					</li>
					<li className="min-w-[20rem] card flex-grow items-center justify-center  shadow-xl bg-slate-100 hover:text-teal-500 text-slate-600 transition-all rounded-3xl p-8 max-w-[30%] border-2 hover:border-teal-500 border-opacity-75">
						<div className="flex flex-col gap-4 justify-center items-center">
							<span className="flex justify-center">
								<EyeIcon className="w-12 h-12" />
							</span>
							<span className="text-3xl font-bold text-center">
								Chord and Scale visualization
							</span>
							<p className="text-center">
								Find orientation on the fretboard by seeing
								where the cords and notes are.
							</p>
						</div>
					</li>
				</ul>
			</section>

			<DemoFretboardSection />

			<section
				id="about"
				className="flex gap-4 flex-col items-center mt-landing-page-flow"
			>
				<span className="font-bold text-4xl text-slate-950">
					A free fretboard visualization tool
				</span>
				<p className="max-w-[50vw] text-center text-slate-400 flex gap-1 items-center">
					- PH -
				</p>
			</section>
			{/* <div className="h-[3000px]"></div> */}
		</main>
	);
}
