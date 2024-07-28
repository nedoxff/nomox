# `nomox-untangler`

this module simplifies access to internal and not-so-internal twitter APIs, providing a custom API and object models which serve as an "abstraction" that should remain stable despite any changes in twitter's APIs.

## running

- `git clone https://github.com/nedoxff/nomox`
- `cd untangler`
- `npm install && npm run start` (configuration is not possible yet)
- the server will start listening on `localhost:3000`, you're done :​)

## support

> [!NOTE]
> this is not the documentation for the API. it's not written yet.

currently, these endpoints are implemented:

- POST `/login`
- GET `/user`
  - `/self`
  - `/id/:id`
  - `/name/:name`
- GET `/timeline`
  - `/home`
- `/tweet`
  - PUT `/:id/like`
  - PUT `/:id/unlike`
  - PUT `/:id/bookmark`
  - PUT `/:id/unbookmark`

every endpoint except `/login` requires an `Authorization` header.

## used in this project

- [`express`](https://expressjs.com) for http request handling
- [`typia`](https://typia.io) for schema validation
- [`biome`](https://biomejs.dev) for writing pretty code
- [`pino`](https://github.com/pinojs/pino) for logging
- ...and other great projects listed in [`package.json`](./package.json) :​)
