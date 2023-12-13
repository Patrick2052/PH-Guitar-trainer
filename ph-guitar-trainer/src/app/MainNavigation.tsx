import React from "react";
import Link from "next/link";
import HomeIcon from "./(icons)/home-icon";

export default function MainNavigation() {
	return (
		<>
			<div className="">
				<nav className="shadow-lg flex gap-2 my-7 mx-page-side-margin p-4 bg-main-mono-dark bg-opacity-90  backdrop-blur-lg bg-opacity-600 text-slate-100 rounded-full items-center justify-between">
					<ul className="flex gap-2">
						<li className="p-2 rounded text-lg">
							<a href="/">
								<HomeIcon />
							</a>
						</li>
						<li className="p-2 rounded text-lg">
							<a href="/guitar-scales">Digital Fretboard</a>
						</li>
					</ul>
					<ul className="flex gap-2 items-center">
						<li className="rounded-full border border-slate-100 px-4 py-2">
							<Link href="/login">Login</Link>
						</li>
						<li className="rounded-full bg-teal-50 text-main-mono-dark px-4 py-2">
							<Link href="/register">Register</Link>
						</li>
					</ul>
				</nav>
			</div>
		</>
	);
}
