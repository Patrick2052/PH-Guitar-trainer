import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainNavigation from "./MainNavigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "ph-Guitar",
	description: "a guitar practice app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			{/* <MainNavigation /> */}
			<body className={inter.className}>{children}</body>
		</html>
	);
}
