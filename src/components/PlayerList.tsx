"use client";

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
    <div className="my-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Players</h2>
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
      <div className="flex flex-wrap gap-2 mt-2">
        {state.players.map((player, index) => (
          <Button
            key={index}
            className="p-0 mr-2 flex items-center bg-primary text-primary-foreground rounded-md px-3 py-1 gap-2"
            onClick={() => removePlayer(index)}
          >
            <X className="h-4 w-4" />
            <span>{player}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
