import * as React from 'react';
import { BoardCellType } from '../BoardCell/BoardCell';
import BoardCell from '../BoardCell/withLogic/BoardCell';
import './styles.scss';

export interface Props {
  onReady: Function;
  boardCellsState: BoardCellType[];
  winnerDirection?: string;
}

const Board: React.FC<Props> = (props: Props) => {
  React.useEffect(() => {
    props.onReady();
  });
  return (
    <div className="board">
      <hr className={`${props.winnerDirection ? props.winnerDirection : 'hidden'}`} />
      {props.boardCellsState.map((cellState, index) =>
        <BoardCell
          key={index}
          index={index + 1}
          type={cellState}
        />
      )}
    </div>
  )
};

export default Board;
