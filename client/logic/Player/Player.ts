import { BoardCellType } from '../../views/BoardCell/BoardCell';

export default class Player implements IPlayer {
  constructor(public readonly marker: BoardCellType) {}

  getMarker(): BoardCellType {
    return this.marker;
  }
}

export interface IPlayer {
  getMarker(): BoardCellType;
}
