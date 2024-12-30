"use client";

import {
  lowerScoreCategories as lowerScoreCategoriesYahtzee,
  upperScoreCategories as upperScoreCategoriesYahtzee,
} from "@/data/YahtzeeCategories";
import {
  lowerScoreCategories as lowerScoreCategoriesYatzy,
  upperScoreCategories as upperScoreCategoriesYatzy,
} from "@/data/YatzyCategories";

export function useScoreCategories(isYahtzee: boolean) {
  const upperScoreCategories = isYahtzee
    ? upperScoreCategoriesYahtzee
    : upperScoreCategoriesYatzy;

  const lowerScoreCategories = isYahtzee
    ? lowerScoreCategoriesYahtzee
    : lowerScoreCategoriesYatzy;

  return { upperScoreCategories, lowerScoreCategories };
}
