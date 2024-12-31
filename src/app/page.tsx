"use client";

import React from "react";
import { GameProvider } from "@/context/GameContext";
import Screen from "@/components/Screen";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <GameProvider>
        <Logo />
        <Screen />
      </GameProvider>
    </div>
  );
}
