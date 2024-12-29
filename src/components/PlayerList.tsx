import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, X } from "lucide-react";
import { useGameContext } from "@/context/GameContext";

export function PlayerList() {
  const { state, dispatch } = useGameContext();
  const [newPlayer, setNewPlayer] = useState("");

  const addPlayer = () => {
    if (newPlayer.trim() !== "") {
      let uniqueName = newPlayer.trim();
      let count = 1;

      // Check for duplicates and add a suffix if necessary
      while (state.players.includes(uniqueName)) {
        uniqueName = `${newPlayer.trim()} (${count})`;
        count++;
      }

      dispatch({
        type: "SET_PLAYERS",
        payload: [...state.players, uniqueName],
      });
      setNewPlayer("");
    }
  };

  const removePlayer = (index: number) => {
    dispatch({
      type: "SET_PLAYERS",
      payload: state.players.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="py-2">
      <h2 className="text-lg font-semibold mb-2">Players</h2>
      <div className="flex flex-wrap gap-2 mb-2">
        {state.players.map((player, index) => (
          <div
            key={index}
            className="flex items-center bg-primary text-primary-foreground rounded-full px-3 py-1"
          >
            <span>{player}</span>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 p-0"
              onClick={() => removePlayer(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="New player name"
          value={newPlayer}
          onChange={(e) => setNewPlayer(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addPlayer();
          }}
          className="flex-grow"
        />
        <Button onClick={addPlayer}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Player
        </Button>
      </div>
    </div>
  );
}
