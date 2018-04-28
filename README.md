# PEShead

[![Build Status](https://travis-ci.org/tstirrat/peshead.svg?branch=master)](https://travis-ci.org/tstirrat/peshead) [![Coverage Status](https://coveralls.io/repos/github/tstirrat/peshead/badge.svg)](https://coveralls.io/github/tstirrat/peshead)

A Progressive Web App to find and compare PES 2018 players.

_Work in progress_

Immediate goals:

* Compare players
  * Show form arrow effects on player stats (especially while comparing)
  * Compare players with different myClub levels
* Be mobile friendly (responsive layout, offline support, fast, cache data often)

Eventual goals (help wanted):

* Show team information e.g. tactics, positions
* Show player progress (form and stat changes for each live update/data pack)
* Edit players, leagues, teams and export to PC/PS4

## Running locally

```sh
# install tmux
./start-all
```

Or, manually start things:

1.  Serve + watch functions locally:

```sh
cd functions
yarn watch

# in a separate terminal
yarn server
```

**Note:** we only care about the functions emulation on port 5001 here.

2.  Start the livereload front-end server:

```sh
yarn start
```

Now access at http://localhost:3000/

## Running tests

* UI: `yarn test`
* Functions: `cd functions && yarn test`
