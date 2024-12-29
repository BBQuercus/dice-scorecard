import React from "react";
import YahtzeePlayer from "@/components/YahtzeePlayer";
import { useGameContext } from "@/context/GameContext";
import { PlayerList } from "@/components/PlayerList";
import { Button } from "@/components/ui/button";
import { RoundTracker } from "./RoundTracker";

export default function YahtzeeCounter() {
  const { state, dispatch } = useGameContext();

  const getWinner = () => {
    if (Object.keys(state.scores).length === 0) return null;
    const highestScore = Math.max(...Object.values(state.scores));
    const winners = Object.entries(state.scores).filter(
      ([_, score]) => score === highestScore
    );
    return winners.map(([name, _]) => name).join(", ");
  };

  return (
    <>
      {!state.gameStarted && (
        <>
          <PlayerList />
          <Button
            onClick={() =>
              dispatch({ type: "SET_GAME_STARTED", payload: true })
            }
          >
            Start Game
          </Button>
        </>
      )}
      {state.gameStarted && (
        <>
          <YahtzeePlayer />
          <RoundTracker />
        </>
      )}
      {state.currentRound > 1 && (
        <div className="mt-6 p-4 bg-primary text-primary-foreground rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Current Standing</h2>
          <p>Round: {state.currentRound - 1}</p>
          <p>Leader: {getWinner()}</p>
          <p>Winning Score: {Math.max(...Object.values(state.scores), 0)}</p>
        </div>
      )}
    </>
  );
}
