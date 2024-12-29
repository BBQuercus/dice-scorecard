import { Button } from "@/components/ui/button";
import { useGameContext } from "@/context/GameContext";

export function RoundTracker() {
  const { state, dispatch } = useGameContext();

  const incrementRound = () => {
    dispatch({ type: "SET_CURRENT_ROUND", payload: state.currentRound + 1 });
  };

  return (
    <div className="flex items-center justify-between mb-4 bg-secondary p-2 rounded-md">
      <span className="font-semibold">Round: {state.currentRound}</span>
      <Button onClick={incrementRound} size="sm">
        Next Round
      </Button>
    </div>
  );
}
