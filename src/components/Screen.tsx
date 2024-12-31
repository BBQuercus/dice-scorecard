"use client";

import React from "react";
import PlayingScreen from "@/components/PlayingScreen";
import { useGameContext } from "@/context/GameContext";
import { PlayerList } from "@/components/PlayerList";
import { Button } from "@/components/ui/button";
import { RoundTracker } from "@/components/RoundTracker";
import WinningScreen from "@/components/WinningScreen";
import GameSelector from "@/components/GameSelector";
import GeneralInfo from "./GeneralInfo";

export default function Screen() {
  const { state, dispatch } = useGameContext();

  const startGame = () => {
    if (state.players.length < 1) {
      alert("Add a player first :)");
      return;
    }
    dispatch({ type: "START_GAME" });
  };

  return (
    <>
      {!state.gameStarted && (
        <>
          <GameSelector />
          <PlayerList />
          <Button
            className={state.yathzee ? "bg-rose-700" : "bg-indigo-800"}
            onClick={startGame}
          >
            Start Game
          </Button>
          <GeneralInfo />
        </>
      )}
      {state.gameStarted && !state.winningScreen && (
        <>
          <PlayingScreen />
          <RoundTracker />
        </>
      )}
      {state.winningScreen && <WinningScreen />}
    </>
  );
}
