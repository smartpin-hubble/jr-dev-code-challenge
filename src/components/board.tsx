import React, { ReactElement, useContext, useMemo } from "react";
import { Row } from "./row";
import { GameContext } from "../contexts/game";
import { Cell } from "../interfaces/IBoard";

interface AlertProps {
  tie: boolean;
  winner: Cell;
}

function Alert({ tie, winner }: AlertProps) {
  if (winner) {
    return (
      <div className="flex gap-x-4">
        <strong>Winner</strong> {winner}
        <button className="">New Game</button>
      </div>
    );
  }

  if (tie) {
    return (
      <div className="flex gap-x-4">
        <strong style={{ padding: "1px 0" }}>Tied game</strong>
        <button className="">New Game</button>
      </div>
    );
  }

  return null;
}

export function Board() {
  const {
    state: {
      data: { board, winner, tie },
    },
  } = useContext(GameContext);

  const rows: ReactElement[] = [];

  for (let i = 0; i < board.length; i++) {
    rows.push(<Row key={i} row={board[i]} rowCount={i} />);
  }

  return (
    <>
      <Alert winner={winner} tie={tie} />

      <div className="grid grid-cols-3 grid-rows-3 text-center max-h-[calc(100vh-10rem)] min-h-[calc(100vh-10rem)]">
        {rows.map((r) => r)}
      </div>
    </>
  );
}
