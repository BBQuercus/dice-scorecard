"use client";

import { InfoBox } from "@/components/InfoBox";
import { ScoreInput } from "./ScoreInput";
import { usePlayerScores } from "@/hooks/getPlayerScores";
import { useScoreCategories } from "@/hooks/useScoreCategories";

interface ScoreCardProps {
  playerName: string;
  isYahtzee: boolean;
}

export function ScoreCard({ playerName, isYahtzee }: ScoreCardProps) {
  const { getPlayerScores } = usePlayerScores();
  const { upperScore, bonus, lowerScore, totalScore } =
    getPlayerScores(playerName);
  const { upperScoreCategories, lowerScoreCategories } =
    useScoreCategories(isYahtzee);

  return (
    <div className="bg-card text-card-foreground rounded-lg border-slate-100 border shadow-md p-4 mb-6">
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Upper Section</h4>
        {upperScoreCategories.map((category) => (
          <div
            key={category.name}
            className="flex items-center justify-between mb-2"
          >
            <div className="flex items-center">
              <span className="mr-2">{category.name}</span>
              <InfoBox
                title={category.name}
                content={category.description}
                example={category.example}
              />
            </div>
            <ScoreInput playerName={playerName} category={category} />
          </div>
        ))}
        <div className="flex justify-between items-center mt-2 pt-2 border-t">
          <span>Upper Score</span>
          <span>{upperScore}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center">
            <span className="mr-2">Bonus</span>
            <InfoBox
              title="Bonus"
              content="If a player scores a total of 63 or more points in these six boxes, a bonus of 35 is added to the upper section score"
            />
          </div>
          <span>{bonus}</span>
        </div>
      </div>

      <div className="mt-4 pt-2 border-t">
        <h4 className="font-semibold mb-2">Lower Section</h4>
        {lowerScoreCategories.map((category) => (
          <div
            key={category.name}
            className="flex items-center justify-between mb-2"
          >
            <div className="flex items-center">
              <span className="mr-2">{category.name}</span>
              <InfoBox
                title={category.name}
                content={category.description}
                example={category.example}
              />
            </div>
            <ScoreInput playerName={playerName} category={category} />
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-2 pt-2 border-t">
        <span>Lower Score</span>
        <span>{lowerScore}</span>
      </div>
      <div className="flex justify-between items-center pt-2">
        <span className="font-semibold">Total Score</span>
        <span className="font-semibold text-lg">{totalScore}</span>
      </div>
    </div>
  );
}
