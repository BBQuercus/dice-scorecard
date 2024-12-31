"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useGameContext } from "@/context/GameContext";

export default function GameSelector() {
  const { state, dispatch } = useGameContext();

  const gameInfo = {
    yahtzee: "Yahtzee is played with 5 dice and has 13 rounds.",
    yatzy: "Yatzy is played with 5 dice and has 15 rounds.",
  };

  const difference =
    "Yahtzee rules and scoring categories are somewhat different from Yatzy. For example, Yahtzee does not have the One Pair and Two Pairs categories. There are also scoring differences for Three / Four of a Kind, Full House, what Small and Large Straights are and Yahtzee bonuses.";

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <Label htmlFor="game-toggle" className="text-lg font-semibold">
          {state.yathzee ? "Yahtzee" : "Yatzy"}
        </Label>
        <Switch
          id="game-toggle"
          className="data-[state=checked]:bg-rose-800 data-[state=unchecked]:bg-indigo-800"
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
