# Node InSim Playground

## Requirements

- Node.js 18
- Yarn 1
- LFS
- Node InSim library built in `../node-insim/dist`

## Installation

```shell
yarn
```

## Example apps

### Minimal example

This example app connects to `127.0.0.1:29999` and logs the LFS version it has connected to.

```shell
yarn start:insim:minimal
```

### Full example

This app aims to cover as many InSim features as possible.  It connects to `127.0.0.1:29999` by default.

**Features:**

- console logs of all supported InSim info packets
- InSim buttons showing the current LFS state and allowing to send InSim packets

```shell
yarn start:insim:full
```

### Lint code

```shell
yarn lint
```

### Format code

```shell
yarn format
```
