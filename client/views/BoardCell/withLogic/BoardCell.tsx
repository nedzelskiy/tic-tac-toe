import * as React from 'react';
import Bot from '../../../logic/Bot/Bot';
import withGameLogic from '../../../decorators/withGameLogic';
import BoardCellView, { BoardCellType, Props as BoardCellViewProps } from '../BoardCell';

export interface Props extends BoardCellViewProps {}

const BoardCell: React.FC<Props> = (props: Props) => (
  <BoardCellView {...props} />
);

export default withGameLogic(BoardCell, (game, props: Props) => {
  return ({
    onClick: props.type === BoardCellType.EMPTY
      ? () => {
          const player = game.getCurrentPlayer();
          if (!(player instanceof Bot)) {
            game.getBoard().updateStateByIndex(props.index - 1, player.getMarker());
            game.nextRound();
          }
        }
      : undefined,
    index: props.index,
  } as Props);
});
