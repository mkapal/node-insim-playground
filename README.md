# Node InSim Playground

## Requirements

- Node.js 22
- pnpm
- Live for Speed

## Installation

```shell
pnpm install
```

## Run playground app

### InSim

```shell
pnpm start:insim
```

### OutGauge

```shell
pnpm start:outgauge
```

This app aims to cover as many InSim features as possible.

It connects to `127.0.0.1:29999` by default. You can change the host and port by copying `.env` to `.env.local` and editing the values.

**Features:**

- console logs of all supported InSim info packets
- InSim buttons showing the current LFS state and allowing to send InSim packets
- OutGauge buttons with live car state

### Lint code

```shell
pnpm lint
```

### Format code

```shell
pnpm format
```
