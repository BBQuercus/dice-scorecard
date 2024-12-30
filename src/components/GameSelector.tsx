"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useGameContext } from "@/context/GameContext";

export default function GameSelector() {
  const { state, dispatch } = useGameContext();

  const gameInfo = {
    yahtzee:
      "Yahtzee is played with 5 dice and has 13 rounds. It includes a bonus for scoring 63 or more points in the upper section.",
    yatzy:
      "Yatzy is played with 5 dice and has 15 rounds. It does not have an upper section bonus, but includes additional scoring categories.",
  };

  const difference =
    "The main difference is that Yatzy has two additional scoring categories (Chance and Yatzy) and no upper section bonus, while Yahtzee has a bonus for the upper section.";

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <Label htmlFor="game-toggle" className="text-lg font-semibold">
          {state.yathzee ? "Yahtzee" : "Yatzy"}
        </Label>
        <Switch
          id="game-toggle"
          checked={state.yathzee}
          onCheckedChange={() => dispatch({ type: "TOGGLE_GAME" })}
        />
      </div>
      <p className="mb-4 text-gray-700">
        {state.yathzee ? gameInfo.yahtzee : gameInfo.yatzy}
      </p>
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          Main Difference:
        </h3>
        <p className="text-sm text-gray-700">{difference}</p>
      </div>
    </div>
  );
}
