"use client";

import React from "react";
import PlayingScreen from "@/components/PlayingScreen";
import { useGameContext } from "@/context/GameContext";
import { PlayerList } from "@/components/PlayerList";
import { Button } from "@/components/ui/button";
import { RoundTracker } from "@/components/RoundTracker";
import WinningScreen from "./WinningScreen";
import GameSelector from "./GameSelector";

export default function YahtzeeCounter() {
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
          <Button onClick={startGame}>Start Game</Button>
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
