"use client";

import { Button } from "@/components/ui/button";
import { useGameContext } from "@/context/GameContext";

export function RoundTracker() {
  const { state, dispatch } = useGameContext();

  const toggleWinners = () => {
    dispatch({ type: "TOGGLE_WINNERS" });
  };

  return (
    <div className="flex items-center justify-between mb-4 bg-secondary p-2 rounded-md">
      <span className="font-semibold">Round: {state.currentRound}</span>
      <Button onClick={toggleWinners} size="sm">
        Finish round
      </Button>
    </div>
  );
}
