import React, { createContext, useContext, useReducer } from "react";

type GameState = {
  players: string[];
  scores: { [key: string]: number };
  gameStarted: boolean;
  currentRound: number;
};

type GameAction =
  | { type: "SET_PLAYERS"; payload: string[] }
  | { type: "UPDATE_SCORE"; payload: { playerName: string; score: number } }
  | { type: "SET_GAME_STARTED"; payload: boolean }
  | { type: "SET_CURRENT_ROUND"; payload: number };

const initialState: GameState = {
  players: [],
  scores: {},
  gameStarted: false,
  currentRound: 1,
};

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "SET_PLAYERS":
      return { ...state, players: action.payload };
    case "UPDATE_SCORE":
      return {
        ...state,
        scores: {
          ...state.scores,
          [action.payload.playerName]: action.payload.score,
        },
      };
    case "SET_GAME_STARTED":
      return { ...state, gameStarted: action.payload };
    case "SET_CURRENT_ROUND":
      return { ...state, currentRound: action.payload };
    default:
      return state;
  }
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
