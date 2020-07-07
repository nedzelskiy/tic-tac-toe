#!/usr/bin/env bash

node node_modules/webpack/bin/webpack.js \
    --config ./server/webpack.server.config.ts \
    --mode=$MODE \
    --watch=$WATCH
