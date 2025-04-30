import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pokemon Platinum Portfolio",
  description: "A personal portfolio website inspired by Pokemon Platinum",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${pressStart2P.className}`}>
        {children}
      </body>
    </html>
  );
}
