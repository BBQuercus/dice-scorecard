"use client";

import React, { useState } from "react";
import { useGameContext } from "@/context/GameContext";
import { ScoreCard } from "@/components/ScoreCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function YahtzeePlayer() {
  const { state } = useGameContext();
  const [currentPlayer, setCurrentPlayer] = useState<string | null>(
    state.players.length > 0 ? state.players[0] : null
  );

  return (
    <>
      <Tabs
        value={currentPlayer || ""}
        onValueChange={(value) => setCurrentPlayer(value)}
        className="mb-6"
      >
        <TabsList className="h-full bg-card text-card-foreground rounded-lg border-slate-100 border shadow-md p-2 flex flex-wrap gap-2 overflow-x-visible">
          {state.players.map((player) => (
            <TabsTrigger
              key={player}
              value={player}
              className="text-sm font-semibold px-4 py-2 rounded-lg transition-colors hover:bg-slate-100 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {player}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {currentPlayer && (
        <div>
          <ScoreCard key={currentPlayer} playerName={currentPlayer} />
        </div>
      )}
    </>
  );
}
