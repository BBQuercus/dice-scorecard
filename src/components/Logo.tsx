"use client";

import React from "react";
import { Dices } from "lucide-react";
import { useGameContext } from "@/context/GameContext";

export default function Logo() {
  const { state, dispatch } = useGameContext();

  const resetGame = () => {
    dispatch({ type: "RESET_GAME" });
  };

  return (
    <div onClick={resetGame} className="mb-6 flex gap-2 items-center">
      <Dices />
      <h1 className="text-2xl font-bold ">
        {state.yathzee ? "Yahtzee" : "Yatzy"} Score Card
      </h1>
    </div>
  );
}
