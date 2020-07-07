#!/usr/bin/env bash
MODE=development WATCH=true \
node node_modules/concurrently/bin/concurrently.js \
"sh sh/client.build.sh" \
"sh sh/server.build.sh" \
"sh sh/server.run.sh"
