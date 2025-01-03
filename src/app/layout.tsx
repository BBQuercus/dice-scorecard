import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dice Score Card - Play Yahtzee/Yatzy with Ease",
  description: "Score card for playing Yahtzee / Yatzy",
  keywords:
    "dice score card, Yahtzee, Yatzy, score tracker, board games, family games, multiplayer games",
  authors: [{ name: "Bastian Eichenberger", url: "bastianeichenberger.ch" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
