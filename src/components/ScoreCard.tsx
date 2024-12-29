import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { InfoBox } from "@/components/InfoBox";
import { useGameContext } from "@/context/GameContext";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react";

interface ScoreCategory {
  name: string;
  description: string;
  isCheckbox?: boolean;
  stepValue?: number;
  maxValue?: number;
  value?: number;
  example?: React.ReactNode;
}

const upperScoreCategories: ScoreCategory[] = [
  {
    name: "Aces",
    description: "The sum of dice with the number 1",
    stepValue: 1,
    maxValue: 5,
    example: (
      <>
        <Dice1 />
        <Dice1 />
        <Dice1 />
        <Dice3 />
        <Dice4 /> = 3
      </>
    ),
  },
  {
    name: "Twos",
    description: "The sum of dice with the number 2",
    stepValue: 2,
    maxValue: 10,
    example: (
      <>
        <Dice2 />
        <Dice2 />
        <Dice2 />
        <Dice5 />
        <Dice6 /> = 6
      </>
    ),
  },
  {
    name: "Threes",
    description: "The sum of dice with the number 3",
    stepValue: 3,
    maxValue: 15,
    example: (
      <>
        <Dice3 />
        <Dice3 />
        <Dice3 />
        <Dice3 />
        <Dice4 /> = 12
      </>
    ),
  },
  {
    name: "Fours",
    description: "The sum of dice with the number 4",
    stepValue: 4,
    maxValue: 20,
    example: (
      <>
        <Dice4 />
        <Dice4 />
        <Dice5 />
        <Dice5 />
        <Dice5 /> = 8
      </>
    ),
  },
  {
    name: "Fives",
    description: "The sum of dice with the number 5",
    stepValue: 5,
    maxValue: 25,
    example: (
      <>
        <Dice1 />
        <Dice1 />
        <Dice2 />
        <Dice2 />
        <Dice5 /> = 5
      </>
    ),
  },
  {
    name: "Sixes",
    description: "The sum of dice with the number 6",
    stepValue: 6,
    maxValue: 30,
    example: (
      <>
        <Dice3 />
        <Dice3 />
        <Dice6 />
        <Dice6 />
        <Dice6 /> = 18
      </>
    ),
  },
];

const lowerScoreCategories: ScoreCategory[] = [
  {
    name: "Three of a Kind",
    description: "At least three dice the same. Sum of all dice",
    maxValue: 30,
    example: (
      <>
        <Dice2 />
        <Dice3 />
        <Dice4 />
        <Dice4 />
        <Dice4 /> = 17
      </>
    ),
  },
  {
    name: "Four of a Kind",
    description: "At least four dice the same. Sum of all dice",
    maxValue: 30,
    example: (
      <>
        <Dice4 />
        <Dice5 />
        <Dice5 />
        <Dice5 />
        <Dice5 /> = 24
      </>
    ),
  },
  {
    name: "Full House",
    description: "Three of one number and two of another for 25 points",
    isCheckbox: true,
    value: 25,
    example: (
      <>
        <Dice3 />
        <Dice3 />
        <Dice3 />
        <Dice6 />
        <Dice6 /> = 25
      </>
    ),
  },
  {
    name: "Small Straight",
    description: "Four sequential dice for 30 points",
    isCheckbox: true,
    value: 30,
    example: (
      <>
        <Dice2 />
        <Dice2 />
        <Dice3 />
        <Dice4 />
        <Dice5 /> = 30
      </>
    ),
  },
  {
    name: "Large Straight",
    description: "Five sequential dice for 40 points",
    isCheckbox: true,
    value: 40,
    example: (
      <>
        <Dice1 />
        <Dice2 />
        <Dice3 />
        <Dice4 />
        <Dice5 /> = 40
      </>
    ),
  },
  {
    name: "Yahtzee",
    description: "All five dice the same for 50 points",
    isCheckbox: true,
    value: 50,
    example: (
      <>
        <Dice6 />
        <Dice6 />
        <Dice6 />
        <Dice6 />
        <Dice6 /> = 50
      </>
    ),
  },
  {
    name: "Chance",
    description: "Sum of all dice",
    maxValue: 30,
    example: (
      <>
        <Dice1 />
        <Dice1 />
        <Dice3 />
        <Dice4 />
        <Dice5 /> = 14
      </>
    ),
  },
  {
    name: "Yahtzee Bonus",
    description: "Score 100 for each additional Yahtzee",
    stepValue: 100,
    maxValue: 1300,
    example: (
      <>
        3 times <Dice4 />
        <Dice4 />
        <Dice4 />
        <Dice4 />
        <Dice4 /> = 200
      </>
    ),
  },
];

interface ScoreCardProps {
  playerName: string;
}

export function ScoreCard({ playerName }: ScoreCardProps) {
  const { state, dispatch } = useGameContext();

  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [striked, setStriked] = useState<{ [key: string]: boolean }>({});

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
    setScores({ ...scores, [category]: numValue });
  };

  const toggleStriked = (category: string) => {
    setStriked((prev) => ({ ...prev, [category]: !prev[category] }));
    if (!striked[category]) {
      setScores((prev) => ({ ...prev, [category]: 0 }));
    }
  };

  const upperScore = upperScoreCategories.reduce(
    (sum, category) =>
      sum + (striked[category.name] ? 0 : scores[category.name] || 0),
    0
  );
  const bonus = upperScore >= 63 ? 35 : 0;
  const lowerScore = lowerScoreCategories.reduce(
    (sum, category) =>
      sum + (striked[category.name] ? 0 : scores[category.name] || 0),
    0
  );
  const totalScore = upperScore + bonus + lowerScore;

  useEffect(() => {
    dispatch({ type: "UPDATE_SCORE", payload: { playerName, totalScore } });
  }, [totalScore]);

  const renderScoreInput = (category: ScoreCategory) => {
    const strikeCheckbox = (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Checkbox
              checked={striked[category.name] || false}
              onCheckedChange={() => toggleStriked(category.name)}
            />
          </TooltipTrigger>
          <TooltipContent className="text-sm">
            Strike out this value
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    if (category.isCheckbox) {
      return (
        <div className="flex items-center justify-center h-8 gap-2">
          <Checkbox
            id={category.name}
            disabled={striked[category.name] === true}
            checked={scores[category.name] > 0}
            onCheckedChange={(checked) => updateScore(category.name, checked)}
          />
          <label
            htmlFor={category.name}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Scored
          </label>
          {strikeCheckbox}
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center h-8 gap-2">
        <Input
          type="number"
          min={0}
          max={category.maxValue}
          step={category.stepValue}
          disabled={striked[category.name] === true}
          value={
            striked[category.name] === true ? 0 : scores[category.name] || ""
          }
          onChange={(e) => {
            const inputValue = parseInt(e.target.value || "0", 10);
            if (inputValue <= category.maxValue) {
              updateScore(category.name, e.target.value);
            }
          }}
          className="w-20 h-8 text-right"
        />
        {category.name !== "Yahtzee Bonus" ? strikeCheckbox : ""}
      </div>
    );
  };

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
            {renderScoreInput(category)}
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
            {renderScoreInput(category)}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4 pt-2 border-t">
        <span className="font-semibold">Total Score</span>
        <span className="font-semibold text-lg">{totalScore}</span>
      </div>
    </div>
  );
}
