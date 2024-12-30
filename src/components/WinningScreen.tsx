"use client";

import { useGameContext } from "@/context/GameContext";
import { usePlayerScores } from "@/hooks/getPlayerScores";
import React from "react";
import { Button } from "./ui/button";
import PodiumStep from "./PodiumStep";

export default function WinningScreen() {
  const { state, dispatch } = useGameContext();
  const { getPlayerScores } = usePlayerScores();

  const incrementRound = () => {
    dispatch({ type: "SET_CURRENT_ROUND", payload: state.currentRound + 1 });
    dispatch({ type: "TOGGLE_WINNERS" });
    dispatch({ type: "RESET_SCORES" });
  };

  const getWinner = () => {
    if (state.players.length === 0)
      return { winners: "What???", highestScore: 0 };
    const playerScores = state.players.map((playerName) => ({
      name: playerName,
      totalScore: getPlayerScores(playerName).totalScore,
    }));

    const highestScore = Math.max(...playerScores.map((p) => p.totalScore));
    const winners = playerScores
      .filter((p) => p.totalScore === highestScore)
      .map((p) => p.name);

    return { winners: winners.join(", "), highestScore };
  };
  const { winners, highestScore } = getWinner();

  // Generate dynamic podium data
  const podium = state.players
    .map((playerName) => ({
      name: playerName,
      score: getPlayerScores(playerName).totalScore,
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <>
      <PodiumStep podium={podium} />
      <div className="mt-4 p-4 bg-primary text-primary-foreground rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Results</h2>
        <p>Round: {state.currentRound}</p>
        <p>Leader: {winners}</p>
        <p>Winning Score: {highestScore}</p>
      </div>
      <Button onClick={incrementRound} className="mt-4">
        Play next round
      </Button>
    </>
  );
}
