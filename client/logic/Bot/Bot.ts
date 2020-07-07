import Player from '../Player/Player';
import { IBoard } from '../Board/Board';
import { BoardCellType } from '../../views/BoardCell/BoardCell';

export default class Bot extends Player implements IBot {
  board: IBoard;

  constructor(marker: BoardCellType, board: IBoard) {
    super(marker);
    this.board = board;
  }

  doMove(): void {
    const emptyCellsIndexes = this.board.getEmptyCellsIndexes();
    const cellIndex = emptyCellsIndexes[Math.floor(Math.random() * emptyCellsIndexes.length)];
    this.board.updateStateByIndex(cellIndex, this.marker);
  }
}

export interface IBot {
  doMove(): void;
}
