import * as React from 'react';
import { IGame } from '../logic/Game/Game';

let game: IGame;

export function setGameLogic(g: IGame) {
  game = g;
}

export default (Component: React.FC, getProps: (game: IGame, props: any) => object): any => {
  return class WithGameLogic extends React.Component {
    render() {
      return <Component {...this.props} {...getProps(game, this.props)} />
    }
  };
}
