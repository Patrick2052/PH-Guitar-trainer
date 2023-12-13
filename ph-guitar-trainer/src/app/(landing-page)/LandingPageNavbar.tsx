import React from "react";
import Link from "next/link";
import HomeIcon from "../(icons)/home-icon";
import EigthNoteIcon from "../(icons)/8th-note-icon";

import { Dancing_Script } from "next/font/google";

const dancingFont = Dancing_Script({ subsets: ["latin"] });

export default function MainNavigation() {
	return (
		<>
			<header className="fixed z-9999 w-full z-[9999]">
				<nav className=" shadow-lg flex gap-2 my-7 mx-page-side-margin p-4 bg-black bg-opacity-50 border border-slate-100 border-opacity-75  backdrop-blur-md bg-opacity-600 text-slate-100 rounded-full items-center justify-between">
					<span className="flex gap-1 font-bold items-center">
						<EigthNoteIcon className="w-6 h-6" strokeWidth={2} />
						<span
							className={`text-lg font-semibold text-xl ${dancingFont.className}`}
						>
							PH
						</span>
					</span>
					<ul className="flex gap-8 items-center">
						<li className="p-2 rounded text-lg">
							<a href="/guitar-scales">Digital Fretboard</a>
						</li>
						<li className="rounded-full border border-slate-100 px-4 py-2">
							<Link href="/login">Login</Link>
						</li>
						<li className="rounded-full bg-teal-50 text-main-mono-dark px-4 py-2">
							<Link href="/register">Register</Link>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
}
