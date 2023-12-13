import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MainNavigation from "./LandingPageNavbar";
import { Main } from "next/document";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "ph-Guitar",
	description: "a guitar practice app",
};

export default function LandingPageLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<MainNavigation />
			{children}
			{/* <div className="relative">{children}</div> */}
		</>
	);
}
