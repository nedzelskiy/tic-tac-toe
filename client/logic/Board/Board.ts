import ReactBoard from '../ReactBoard/ReactBoard';
import { BoardCellType } from '../../views/BoardCell/BoardCell';

export default class Board extends ReactBoard implements IBoard {
  private state: BoardCellType[];
  private readonly winCombinationsIndexes: WinCombinationsIndexes = {
    row1: [0, 1, 2],
    row2: [3, 4, 5],
    row3: [6, 7, 8],
    col1: [0, 3, 6],
    col2: [1, 4, 7],
    col3: [2, 5, 8],
    crossToDown: [0, 4, 8],
    crossToUp: [2, 4, 6],
  };

  constructor() {
    super();
    this.resetBoardState();
  }

  resetBoardState(): void {
    this.state = Array.from(Array(9), () => BoardCellType.EMPTY);
  }

  getWinCombinationsIndexes(): WinCombinationsIndexes {
    return this.winCombinationsIndexes;
  }

  getState(): BoardCellType[] {
    return this.state;
  }

  getEmptyCellsIndexes(): number[] {
    return this.state
      .map((cellState, index) => cellState === BoardCellType.EMPTY ? index : null)
      .filter(index => typeof index === 'number') as number[];
  }

  updateStateByIndex(index: number, newCellType: BoardCellType): void {
    this.state[index] = newCellType;
  }

  async paint(winnerDirection?: string): Promise<void> {
    return this.render(this.getState(), winnerDirection);
  }
}

export interface IBoard {
  resetBoardState(): void;
  getState(): BoardCellType[];
  getEmptyCellsIndexes(): number[];
  paint(winnerDirection?: string): Promise<void>;
  getWinCombinationsIndexes(): WinCombinationsIndexes;
  updateStateByIndex(index: number, newCellType: BoardCellType): void;
}

interface WinCombinationsIndexes {
  [direction: string]: number[];
}
