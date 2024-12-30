import { useGameContext } from "@/context/GameContext";
import { useScoreCategories } from "@/hooks/useScoreCategories";

export function usePlayerScores() {
  const { state } = useGameContext();
  const { upperScoreCategories, lowerScoreCategories } = useScoreCategories(
    state.yathzee
  );

  const getPlayerScores = (playerName: string) => {
    const upperScore = upperScoreCategories.reduce(
      (sum, category) =>
        sum +
        (state.strikes[playerName]?.[category.name]
          ? 0
          : state.scores[playerName]?.[category.name] || 0),
      0
    );
    const bonus = upperScore >= 63 ? 35 : 0;
    const lowerScore = lowerScoreCategories.reduce(
      (sum, category) =>
        sum +
        (state.strikes[playerName]?.[category.name]
          ? 0
          : state.scores[playerName]?.[category.name] || 0),
      0
    );
    const totalScore = upperScore + bonus + lowerScore;

    return { upperScore, bonus, lowerScore, totalScore };
  };

  return { getPlayerScores };
}
