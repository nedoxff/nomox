# nomox

nomox (short for **no**-**mo**re-**X**) is a project that provides an alternative way of browsing twitter, now infamously called X. it includes a backend written with [express](https://expressjs.com), and a lightweight frontend written with [vite](https://vitejs.dev) and [solid](https://www.solidjs.com).

> [!WARNING]
> nomox is in development. it is currently **not recommended** to use nomox, as any mistake or bug in the backend can result in **permanent account suspension**.

## introduction (the why)

nomox was born out of my hope for twitter's community and my anger towards the official twitter clients. they are big in size, clunky, send a lot of telemetry data and waste a lot of bandwidth making unnecessary API requests — all resulting in a not-so-nice user experience.

## features (the what)

- relatively small bundle size
- **no** promoted content, aka ads
- **no** telemetry and tracking (aside from the necessary API requests)
- a user-friendly API (if you decide to make your own frontend)

## structure (the how)

nomox consists of two modules — [`nomox-untangler`](https://github.com/nedoxff/nomox/tree/main/untangler) (the backend) and [`nomox-viewer`](https://github.com/nedoxff/nomox/tree/main/viewer) (the frontend). the `untangler` provides a straightforward and user-friendly API for accessing twitter's APIs, while the `viewer` provides a pretty UI for nomox's API. you can check more information about these modules in their respective READMEs.

## license & contributing

nomox is licensed under [AGPL-3.0](https://github.com/nedoxff/nomox/blob/main/LICENSE). this means that if you make a fork of nomox (not for PR purposes) and add additional code and/or features, you **must** keep it open-source and keep the same LICENSE file. i would highly appreciate if you contributed to this "main" repository instead, though :​)

contributions are welcome! if you have noticed a bug or have an idea on how to improve the project, please [create an issue](https://github.com/nedoxff/nomox/issues)! 