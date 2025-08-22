"use client";

import { Board } from "@/components/board";
import { GameContext } from "@/contexts/game";
import { gameReducer, INITIAL_STATE } from "@/reducers/game";
import { useReducer } from "react";

export default function Home() {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  const context = {
    state,
    dispatch,
  };

  return (
    <GameContext.Provider value={context}>
      <div className="max-w-7xl  mx-auto px-4 py-8">
        <Board />
      </div>
    </GameContext.Provider>
  );
}
