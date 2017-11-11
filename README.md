PES League Editor
=========================

[![Build Status](https://travis-ci.org/tstirrat/pesleagues.svg?branch=master)](https://travis-ci.org/tstirrat/pesleagues) [![Coverage Status](https://coveralls.io/repos/github/tstirrat/pesleagues/badge.svg)](https://coveralls.io/github/tstirrat/pesleagues)

Edit players, teams, leagues online.

*Work in progress*

Running locally
-------------------------

1. Serve + watch functions locally:

  ```sh
  cd functions
  yarn watch

  # in a separate terminal
  firebase serve --only hosting,functions
  ```

  **Note:** we only care about the functions emulation on port 5001 here.

2. Start the livereload front-end server:

  ```sh
  yarn start
  ```

  Now access at http://localhost:3000/


Running tests
-------------------------

- UI: `yarn test`
- Functions: `cd functions && yarn test`
