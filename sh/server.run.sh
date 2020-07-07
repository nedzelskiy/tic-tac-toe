#!/usr/bin/env bash

NODE_ENV=$MODE \
node node_modules/nodemon/bin/nodemon.js \
    builds/$MODE/server/server.js \
    --watch builds/$MODE/server/server.js
