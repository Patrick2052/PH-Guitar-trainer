import React from "react";
import GuitarApplication from "./components/GuitarApplication";

export default function page() {
	return (
		<main className=" p-4 mx-page-side-margin rounded shadow-xl">
			{/* <span>{fret.tuning.toString()}</span> */}
			<GuitarApplication />
		</main>
	);
}
