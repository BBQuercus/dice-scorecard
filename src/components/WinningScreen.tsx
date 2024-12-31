"use client";

import { useGameContext } from "@/context/GameContext";
import { usePlayerScores } from "@/hooks/getPlayerScores";
import React from "react";
import { Button } from "@/components/ui/button";
import PodiumStep from "@/components/PodiumStep";

interface Player {
  name: string;
  score: number;
}

interface ScoreGroup {
  score: number;
  names: string[];
}

interface PodiumEntry {
  name: string;
  score: number;
}

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
  let isTie = false;
  const podium: PodiumEntry[] = Object.values(
    state.players
      .map(
        (playerName): Player => ({
          name: playerName,
          score: getPlayerScores(playerName).totalScore,
        })
      )
      .reduce((acc: Record<number, ScoreGroup>, { name, score }) => {
        if (!acc[score]) {
          acc[score] = { score, names: [] };
        }
        acc[score].names.push(name);
        return acc;
      }, {})
  )
    .map(({ score, names }): PodiumEntry => {
      if (names.length > 1) {
        isTie = true;
      }
      return {
        name: names.join(", "),
        score,
      };
    })
    .sort((a, b) => b.score - a.score);

  return (
    <>
      <PodiumStep podium={podium} />
      {isTie && (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-sm text-gray-700">
            There was a tie! The rules do not specify what happens in the event
            of a tie. The order is based on the original entry order.
          </h3>
        </div>
      )}
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
