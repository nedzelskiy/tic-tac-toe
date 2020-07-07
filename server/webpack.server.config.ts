import { normalize } from "path";
import minimist from 'minimist';
import { Mode } from '../common.interfaces';
import { Configuration as WebpackConfiguration } from 'webpack';

const args = minimist(process.argv.slice(2));
const MODE = args.mode === Mode.PRODUCTION ? Mode.PRODUCTION : Mode.DEVELOPMENT;

const webpackConfig: WebpackConfiguration = {
  target: 'node',
  entry: {
    server: normalize(`${process.env.PWD}/server/server.ts`),
  },
  output: {
    path: normalize(`${process.env.PWD}/builds/${MODE}/server/`),
  },
  watchOptions: {
    aggregateTimeout: 20,
  },
  resolve: {
    extensions: ['.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: normalize(`${process.env.PWD}/server/tsconfig.server.json`),
            },
          },
        ],
      },
      {
        test: /\.scss|css$/,
        use: {
          loader: 'ignore-loader',
        },
      },
    ],
  },
};

module.exports = webpackConfig;
