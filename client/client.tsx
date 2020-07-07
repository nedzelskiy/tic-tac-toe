import * as React from 'react';
import { render } from 'react-dom';
import Game from './logic/Game/Game';
import Board from './logic/Board/Board';
import BoardView from './views/Board/Board';
import { setGameLogic } from './decorators/withGameLogic';
import { BoardCellType } from './views/BoardCell/BoardCell';
import './common.styles.scss';

const boardMountPoint = document.getElementById('board');

async function renderBoard(
  boardCellsState: BoardCellType[],
  winnerDirection?: string,
): Promise<void> {
  return new Promise((res) => {
    render(
        <BoardView
          boardCellsState={boardCellsState}
          winnerDirection={winnerDirection}
          onReady={() => setTimeout(res, 100)}
        />,
      boardMountPoint,
    );
  });
}

const board = new Board();
board.setRenderFunction(renderBoard);
const game = new Game(board, (winner) => {
  if (winner) {
    alert(`Winner is ${winner!.marker.toUpperCase()}`)
  } else {
    alert("It's a DRAW!");
  }
  game.startComputersGame();
});
setGameLogic(game);
game.startComputersGame();
