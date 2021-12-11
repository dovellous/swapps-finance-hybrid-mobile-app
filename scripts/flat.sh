#!/usr/bin/env bash

npx truffle-flattener src/blockchain/contracts/token/BEP20/SwappsBEP20.sol > dist/SwappsBEP20.dist.sol
npx truffle-flattener src/blockchain/contracts/service/ServiceReceiver.sol > dist/ServiceReceiver.dist.sol
