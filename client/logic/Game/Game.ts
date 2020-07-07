import Bot from '../Bot/Bot';
import { IBoard } from '../Board/Board';
import Player, { IPlayer } from '../Player/Player';
import Checker, { IChecker, Winner } from '../Checker/Checker';
import { BoardCellType } from '../../views/BoardCell/BoardCell';

export default class Game implements IGame {
  private readonly board: IBoard;
  private readonly gameFinishCallback: GameFinishCallback;

  private checker: IChecker;
  private players: IPlayer[];
  private gameMode: GameMode;
  private currentPlayer: IPlayer | undefined;

  constructor(board: IBoard, gameFinishCallback: GameFinishCallback) {
    this.board = board;
    this.checker = new Checker(board);
    this.gameFinishCallback = gameFinishCallback;
    this.startPlayersGame = this.startPlayersGame.bind(this);
    this.startComputersGame = this.startComputersGame.bind(this);
  }

  private getInitialPlayer(): IPlayer {
    return this.players[0];
  }

  private resetGame(): void {
    this.currentPlayer = undefined;
    this.board.resetBoardState();
  }

  private createPlayers(): void {
    const answer = prompt(
      `${this.gameMode} Mode! Set 'X' for playing Crosses or anything for playing Noughts`,
    );
    if (answer && answer.toLowerCase() === 'x') {
      this.players = [
        new Player(BoardCellType.CROSS),
        this.gameMode === GameMode.PlayerVsPlayer
        ? new Player(BoardCellType.NOUGHT)
        : new Bot(BoardCellType.NOUGHT, this.board)
      ];
    } else {
      this.players = [
        this.gameMode === GameMode.PlayerVsPlayer
        ? new Player(BoardCellType.CROSS)
        : new Bot(BoardCellType.CROSS, this.board),
        new Player(BoardCellType.NOUGHT)
      ];
    }
  }

  private startGame(): void {
    this.resetGame();
    (async () => {
      this.nextRound();
    })();
  }

  getBoard(): IBoard {
    return this.board;
  }

  getCurrentPlayer(): IPlayer {
    return this.currentPlayer
      ? this.currentPlayer
      : this.getInitialPlayer();
  }

  startPlayersGame(): void {
    this.gameMode = GameMode.PlayerVsPlayer;
    this.createPlayers();
    this.startGame();
  }

  startComputersGame(): void {
    this.gameMode = GameMode.PlayerVsComputer;
    this.createPlayers();
    this.startGame();
  }

  async nextRound(): Promise<void> {
    const winner = this.checker.getWinner();
    await this.board.paint(winner ? winner.direction : undefined);
    const isExistsNextMoves = this.checker.isExistsNextMoves();
    if (!winner && isExistsNextMoves) {
      this.currentPlayer = this.currentPlayer
        ? this.players.find(player => player !== this.currentPlayer)
        : this.getInitialPlayer();
      if (this.currentPlayer instanceof Bot) {
        this.currentPlayer.doMove();
        this.nextRound();
      }
      return;
    }
    this.gameFinishCallback(winner);
  }
}

export interface IGame {
  getBoard(): IBoard;
  startPlayersGame(): void;
  startComputersGame(): void;
  nextRound(): Promise<void>;
  getCurrentPlayer(): IPlayer;
}

type GameFinishCallback = (winner: Winner | undefined) => void;

enum GameMode {
  PlayerVsPlayer = 'Player vs Player',
  PlayerVsComputer = 'Player vs Computer',
}
