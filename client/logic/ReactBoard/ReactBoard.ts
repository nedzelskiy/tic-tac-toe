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

type RenderFunction = (...props: any) => Promise<void>;

interface IReactBoard {
  setRenderFunction(render: RenderFunction): void;
  paint(): Promise<void>;
}
