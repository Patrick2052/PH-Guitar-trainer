import React from "react";

export default function ChevronDoubleRight({
	className,
}: {
	className?: string;
}) {
	return (
		<svg
			className={className ? className : `w-6 h-6`}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
			/>
		</svg>
	);
}
