#!/usr/bin/env bash

node node_modules/webpack/bin/webpack.js \
    --config ./client/webpack.client.config.ts \
    --mode=$MODE \
    --watch=$WATCH
