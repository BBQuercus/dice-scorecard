"use client";

import React from "react";
import { GameProvider } from "@/context/GameContext";
import YahtzeeCounter from "@/components/YahtzeeCounter";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <GameProvider>
        <Logo />
        <YahtzeeCounter />
      </GameProvider>
    </div>
  );
}
