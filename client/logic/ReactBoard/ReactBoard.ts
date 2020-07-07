import { BoardCellType } from '../../views/BoardCell/BoardCell';

export default abstract class ReactBoard implements IReactBoard {
  protected render: RenderFunction;

  protected constructor() {
    this.render = () => Promise.resolve();
  }

  setRenderFunction(render: RenderFunction): void {
    this.render = render;
  }

  abstract async paint(): Promise<void>;

}

type RenderFunction = (boardCellsState: BoardCellType[], winnerDirection?: string) => Promise<void>;

interface IReactBoard {
  setRenderFunction(render: RenderFunction): void;
  paint(): Promise<void>;
}
