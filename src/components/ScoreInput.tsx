"use client";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Toggle } from "@/components/ui/toggle";
import { CircleSlash } from "lucide-react";
import { ScoreCategory } from "@/data/YahtzeeCategories";
import { useGameContext } from "@/context/GameContext";
import { useScoreCategories } from "@/hooks/useScoreCategories";

interface ScoreInputProps {
  playerName: string;
  category: ScoreCategory;
}

function StrikeCheckbox({
  striked,
  toggleStriked,
}: {
  striked: boolean;
  toggleStriked: () => void;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            variant="outline"
            aria-pressed={striked || false}
            onClick={toggleStriked}
            className={`${striked ? " text-gray-400" : ""}`}
          >
            <CircleSlash className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent className="text-sm">
          Strike out this value
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function ScoreInput({ playerName, category }: ScoreInputProps) {
  const { state, dispatch } = useGameContext();
  const { upperScoreCategories, lowerScoreCategories } = useScoreCategories(
    state.yathzee
  );

  const updateScore = (category: string, value: string | boolean) => {
    let numValue: number;
    if (typeof value === "boolean") {
      const categoryObj = [
        ...upperScoreCategories,
        ...lowerScoreCategories,
      ].find((c) => c.name === category);
      numValue = value ? categoryObj?.value || 0 : 0;
    } else {
      numValue = parseInt(value) || 0;
    }

    dispatch({
      type: "UPDATE_SCORE",
      payload: { playerName: playerName, category: category, score: numValue },
    });
  };

  const toggleStriked = (category: string) => {
    dispatch({
      type: "TOGGLE_STRIKE",
      payload: {
        playerName: playerName,
        category: category,
      },
    });
  };

  if (category.isCheckbox) {
    return (
      <div className="flex items-center justify-center h-8 gap-2">
        <Checkbox
          id={category.name}
          disabled={state.strikes[playerName]?.[category.name] === true}
          checked={state.scores[playerName]?.[category.name] > 0}
          onCheckedChange={(checked) => updateScore(category.name, checked)}
        />
        <label
          htmlFor={category.name}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Scored
        </label>
        <StrikeCheckbox
          striked={state.strikes[playerName]?.[category.name]}
          toggleStriked={() => toggleStriked(category.name)}
        />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center h-8 gap-2">
      <Input
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        min={0}
        max={category.maxValue}
        step={category.stepValue}
        disabled={state.strikes[playerName]?.[category.name] === true}
        value={state.scores[playerName]?.[category.name] || undefined}
        onChange={(e) => {
          const inputValue = parseInt(e.target.value || "0", 10);
          if (category.maxValue && inputValue <= category.maxValue) {
            updateScore(category.name, e.target.value);
          }
        }}
        className="w-20 h-8 text-right"
      />
      {category.name !== "Yahtzee Bonus" ? (
        <StrikeCheckbox
          striked={state.strikes[playerName]?.[category.name]}
          toggleStriked={() => toggleStriked(category.name)}
        />
      ) : (
        ""
      )}
    </div>
  );
}
