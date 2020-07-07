import { IBoard } from '../Board/Board';
import { BoardCellType } from '../../views/BoardCell/BoardCell';

export default class Checker implements IChecker {
  constructor(private board: IBoard) {}

  isExistsNextMoves(): boolean {
    return !!this.board.getState().find(cellState => cellState === BoardCellType.EMPTY);
  }

  getWinner(): Winner | undefined {
    const boardState = this.board.getState();
    let winner = undefined;
    const winCombinationsIndexes = this.board.getWinCombinationsIndexes();
    Object.keys(winCombinationsIndexes).some(direction => {
      const combination = winCombinationsIndexes[direction];
      const cellType = boardState[combination[0]];
      if (cellType !== BoardCellType.EMPTY) {
        const isMatched: boolean = combination.reduce((res, curr) => {
          return boardState[curr] !== cellType
            ? res + 1
            : res;
        }, 0) < 1;
        if (isMatched) {
          winner = {
            direction,
            marker: boardState[combination[0]],
          };
          return true;
        }
      }
      return false;
    });
    return winner;
  }
}

export interface Winner {
  direction: string;
  marker: BoardCellType;
}

export interface IChecker {
  isExistsNextMoves(): boolean;
  getWinner(): Winner | undefined;
}
