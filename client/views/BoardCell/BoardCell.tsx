import * as React from 'react';
import './styles.scss';

export interface Props {
  index: number;
  type?: BoardCellType;
  onClick?: (event: React.SyntheticEvent) => void;
}

const BoardCell: React.FC<Props> = (props: Props) =>
  <div
    className={`board-cell ${props.type}`}
    onClick={props.onClick}
  />;

export enum BoardCellType {
  EMPTY = 'empty',
  CROSS = 'cross',
  NOUGHT = 'nought',
}

BoardCell.defaultProps = {
  type: BoardCellType.EMPTY,
  onClick: () => {},
};

export default BoardCell;
