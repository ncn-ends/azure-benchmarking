#!/bin/bash

k6 run benchmark.js --env CONFIG_FILE=benchmark-config.json --env CONTEXT=azfunc && \
k6 run benchmark.js --env CONFIG_FILE=benchmark-config.json --env CONTEXT=azappservice

