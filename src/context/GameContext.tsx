import React, { createContext, useContext, useEffect, useReducer } from "react";
import Cookies from "js-cookie";

type GameState = {
  yathzee: boolean;
  players: string[];
  scores: { [playerName: string]: { [category: string]: number } };
  strikes: { [playerName: string]: { [category: string]: boolean } };
  gameStarted: boolean;
  winningScreen: boolean;
  currentRound: number;
};

type GameAction =
  | { type: "TOGGLE_GAME" }
  | { type: "SET_PLAYERS"; payload: string[] }
  | {
      type: "UPDATE_SCORE";
      payload: { playerName: string; category: string; score: number };
    }
  | {
      type: "TOGGLE_STRIKE";
      payload: { playerName: string; category: string };
    }
  | { type: "TOGGLE_WINNERS" }
  | { type: "RESET_SCORES" }
  | { type: "RESET_GAME" }
  | { type: "START_GAME" }
  | { type: "SET_CURRENT_ROUND"; payload: number };

const initialState: GameState = {
  yathzee: Cookies.get("yahtzee") ? JSON.parse(Cookies.get("yahtzee")!) : [],
  players: Cookies.get("players") ? JSON.parse(Cookies.get("players")!) : [],
  scores: {},
  strikes: {},
  gameStarted: false,
  winningScreen: false,
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
    case "TOGGLE_GAME":
      return {
        ...state,
        yathzee: !state.yathzee,
      };
    case "SET_PLAYERS":
      return {
        ...state,
        players: action.payload,
        scores: action.payload.reduce((acc, player) => {
          acc[player] = {};
          return acc;
        }, {} as { [playerName: string]: { [category: string]: number } }),
      };
    case "UPDATE_SCORE":
      console.log(state);
      return {
        ...state,
        scores: {
          ...state.scores,
          [action.payload.playerName]: {
            ...state.scores[action.payload.playerName],
            [action.payload.category]: action.payload.score,
          },
        },
      };
    case "TOGGLE_STRIKE":
      return {
        ...state,
        strikes: {
          ...state.strikes,
          [action.payload.playerName]: {
            ...state.strikes[action.payload.playerName],
            [action.payload.category]:
              !state.strikes[action.payload.playerName]?.[
                action.payload.category
              ],
          },
        },
      };
    case "RESET_SCORES":
      return { ...state, scores: {}, strikes: {} };
    case "RESET_GAME":
      return {
        ...state,
        gameStarted: false,
        winningScreen: false,
        scores: {},
        strikes: {},
        currentRound: 0,
      };
    case "START_GAME":
      return { ...state, gameStarted: true };
    case "TOGGLE_WINNERS":
      return { ...state, winningScreen: !state.winningScreen };
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

  useEffect(() => {
    Cookies.set("players", JSON.stringify(state.players), { expires: 7 });
  }, [state.players]);

  useEffect(() => {
    Cookies.set("yahtzee", JSON.stringify(state.yathzee), { expires: 7 });
  }, [state.yathzee]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
