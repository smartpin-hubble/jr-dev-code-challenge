import { Action } from "../interfaces/IAction";
import { Cell } from "../interfaces/IBoard";
import { IState } from "../interfaces/IState";

import {
  checkWinner,
  cloneBoard,
  computerPlacePieceRandom,
  getNextPlayer,
  getStartingPlayer,
  initializeBoard,
} from "../utils/game";

const DEFAULT_BOARD_SIZE = 3;

export const INITIAL_STATE: IState = {
  data: {
    canPlayerMove: true,
    lastMove: {
      x: -1,
      y: -1,
    },
    gameType: "PVC",
    boardSize: DEFAULT_BOARD_SIZE,
    board: initializeBoard(DEFAULT_BOARD_SIZE),
    player: Cell.x,
    winner: Cell.empty,
    tie: false,
    startingPlayer: "human",
    winningCells: {}, // looks like { rowID: [matchingColumn, matchingColumn]} e.g. { 1: [0, 1, 2]} or {0: [1], 1: [1], 2: [1]} or {0: [0], 1: [1], 2: [2]}
  },
};

export function gameReducer(currentState: IState, action: Action): IState {
  const { type, data } = action;

  switch (type) {
    case "RESET": {
      const tmp = {
        ...INITIAL_STATE,
        data: {
          ...INITIAL_STATE.data,
          boardSize: currentState.data.boardSize,
          board: initializeBoard(currentState.data.boardSize),
          player: currentState.data.player,
          gameType: currentState.data.gameType,
          startingPlayer: getStartingPlayer(
            currentState.data.startingPlayer,
            currentState.data.gameType
          ),
        },
      };

      if (
        tmp.data.gameType === "PVC" &&
        tmp.data.startingPlayer === "computer"
      ) {
        return gameReducer(tmp, { type: "COMPUTER_PLAY", data: null });
      }

      return tmp;
    }
    case "CELL_CLICK": {
      const board = cloneBoard(currentState.data.board);
      const { x, y } = data;
      const { player: currentPlayer } = currentState.data;

      board[x][y] = currentPlayer;
      return {
        ...currentState,
        data: {
          ...currentState.data,
          board,
          player: getNextPlayer(currentPlayer),
          ...checkWinner(board, x, y),
          canPlayerMove: currentState.data.gameType === "PVP",
          lastMove: {
            x,
            y,
          },
        },
      };
    }
    case "COMPUTER_PLAY": {
      if (currentState.data.gameType === "PVP") {
        return currentState;
      }

      if (currentState.data.winner) {
        return currentState;
      }

      const board = cloneBoard(currentState.data.board);

      const computerMove = computerPlacePieceRandom(
        board,
        currentState.data.player
      );

      return {
        ...currentState,
        data: {
          ...currentState.data,
          board: computerMove.board,
          player: getNextPlayer(currentState.data.player),
          ...checkWinner(computerMove.board, computerMove.x, computerMove.y),
          canPlayerMove: true,
          lastMove: {
            x: computerMove.x,
            y: computerMove.y,
          },
        },
      };
    }
    case "SET_GAME_TYPE": {
      return gameReducer(
        {
          ...currentState,
          data: {
            ...currentState.data,
            gameType: data,
          },
        },
        { type: "RESET", data: null }
      );
    }

    default: {
      throw new Error(`Unknown action ${type}`);
    }
  }
}
