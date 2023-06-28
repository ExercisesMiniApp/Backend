# Backend for VK Mini App
[![Tests](https://github.com/ExercisesMiniApp/Backend/actions/workflows/tests.yml/badge.svg)](https://github.com/ExercisesMiniApp/Backend/actions/workflows/tests.yml)
[![Format](https://github.com/ExercisesMiniApp/Backend/actions/workflows/format.yml/badge.svg)](https://github.com/ExercisesMiniApp/Backend/actions/workflows/format.yml)

## Installation

```bash
$ yarn install
```
#### Install docker compose. See [docs](https://docs.docker.com/compose/install/)

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod

# in the Docker container
$ yarn docker:up
```

## Test

```bash
# all tests
$ yarn test

# tests coverage
$ yarn test:cov
```
