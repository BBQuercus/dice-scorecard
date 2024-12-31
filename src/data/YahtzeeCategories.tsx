import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react";
import { ScoreCategory } from "@/data/ScoreCategory";

export const upperScoreCategories: ScoreCategory[] = [
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

export const lowerScoreCategories: ScoreCategory[] = [
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
