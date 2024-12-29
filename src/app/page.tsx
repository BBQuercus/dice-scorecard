"use client";

import React from "react";
import { GameProvider } from "@/context/GameContext";
import { Dices } from "lucide-react";
import YahtzeeCounter from "@/components/YahtzeeCounter";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold mb-6">
        <Dices />
        Yahtzee Score Card
      </h1>
      <GameProvider>
        <YahtzeeCounter />
      </GameProvider>
    </div>
  );
}
