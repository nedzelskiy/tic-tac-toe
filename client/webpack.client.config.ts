import minimist from 'minimist';
import { normalize } from "path";
import { Mode } from '../common.interfaces';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { Configuration as WebpackConfiguration } from 'webpack';

const args = minimist(process.argv.slice(2));
const MODE = args.mode === Mode.PRODUCTION ? Mode.PRODUCTION : Mode.DEVELOPMENT;

const webpackConfig: WebpackConfiguration = {
  entry: {
    client: normalize(`${process.env.PWD}/client/client.tsx`),
  },
  output: {
    path: normalize(`${process.env.PWD}/builds/${MODE}/client/`),
  },
  watchOptions: {
    aggregateTimeout: 20,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: normalize(`${process.env.PWD}/client/tsconfig.client.json`),
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      }
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
};

module.exports = webpackConfig;
