# Node InSim Playground

## Requirements

- Node.js 18
- Yarn 1
- LFS

## Installation

```shell
yarn
```

## Run playground app

```shell
yarn start
```

This app aims to cover as many InSim features as possible.

It connects to `127.0.0.1:29999` by default. You can change the host and port by copying `.env` to `.env.local` and editing the values.

**Features:**

- console logs of all supported InSim info packets
- InSim buttons showing the current LFS state and allowing to send InSim packets

### Lint code

```shell
yarn lint
```

### Format code

```shell
yarn format
```
