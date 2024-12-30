import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react";
import { ScoreCategory } from "./YahtzeeCategories";

export const upperScoreCategories: ScoreCategory[] = [
  {
    name: "Ones",
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
    name: "One Pair",
    description:
      "Two dice showing the same number. Score the sum of those two dice",
    maxValue: 12,
    example: (
      <>
        <Dice2 />
        <Dice2 />
        <Dice4 />
        <Dice5 />
        <Dice6 /> = 4
      </>
    ),
  },
  {
    name: "Two Pairs",
    description:
      "Two different pairs of dice. Score the sum of dice in those two pairs",
    maxValue: 24,
    example: (
      <>
        <Dice3 />
        <Dice3 />
        <Dice5 />
        <Dice5 />
        <Dice6 /> = 16
      </>
    ),
  },
  {
    name: "Three of a Kind",
    description:
      "Three dice showing the same number. Score the sum of those three dice",
    maxValue: 18,
    example: (
      <>
        <Dice4 />
        <Dice4 />
        <Dice4 />
        <Dice2 />
        <Dice5 /> = 12
      </>
    ),
  },
  {
    name: "Four of a Kind",
    description:
      "Four dice with the same number. Score the sum of those four dice",
    maxValue: 24,
    example: (
      <>
        <Dice6 />
        <Dice6 />
        <Dice6 />
        <Dice6 />
        <Dice1 /> = 24
      </>
    ),
  },
  {
    name: "Small Straight",
    description: "The combination 1-2-3-4-5. Score 30 points",
    isCheckbox: true,
    value: 30,
    example: (
      <>
        <Dice1 />
        <Dice2 />
        <Dice3 />
        <Dice4 />
        <Dice5 /> = 30
      </>
    ),
  },
  {
    name: "Large Straight",
    description: "The combination 2-3-4-5-6. Score 40 points",
    isCheckbox: true,
    value: 40,
    example: (
      <>
        <Dice2 />
        <Dice3 />
        <Dice4 />
        <Dice5 />
        <Dice6 /> = 40
      </>
    ),
  },
  {
    name: "Full House",
    description:
      "Any set of three combined with a different pair. Score 25 points",
    isCheckbox: true,
    value: 25,
    example: (
      <>
        <Dice3 />
        <Dice3 />
        <Dice3 />
        <Dice5 />
        <Dice5 /> = 25
      </>
    ),
  },
  {
    name: "Chance",
    description: "Any combination of dice. Score the sum of all the dice",
    maxValue: 30,
    example: (
      <>
        <Dice1 />
        <Dice2 />
        <Dice3 />
        <Dice4 />
        <Dice6 /> = 16
      </>
    ),
  },
  {
    name: "Yatzy",
    description: "All five dice with the same number. Score 50 points",
    isCheckbox: true,
    value: 50,
    example: (
      <>
        <Dice5 />
        <Dice5 />
        <Dice5 />
        <Dice5 />
        <Dice5 /> = 50
      </>
    ),
  },
];
