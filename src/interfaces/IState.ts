import { Cell, IBoard } from "./IBoard";
import { IMove } from "./IMove";
import { playerType } from "./playerType";

export interface IState {
  data: {
    startingPlayer: playerType;
    gameType: "PVP" | "PVC";
    lastMove: IMove;
    canPlayerMove: boolean;
    boardSize: number;
    board: IBoard;
    player: Cell.x | Cell.o;
    winner: Cell;
    tie: boolean;
    winningCells: {
      [key: number]: number[];
    }; // looks like { rowID: [matchingColumn, matchingColumn]} e.g. { 1: [0, 1, 2]} or {0: [1], 1: [1], 2: [1]} or {0: [0], 1: [1], 2: [2]}
  };
}
