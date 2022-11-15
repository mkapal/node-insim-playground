import type { IS_FLG } from 'node-insim/packets';
import { FlagType } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { log } from './log';

export function onFlag(packet: IS_FLG, inSim: InSim) {
  log(
    packet,
    inSim,
    `PLID ${packet.PLID}: ${flag[packet.Flag]} ${
      packet.OffOn ? 'ON' : 'OFF'
    } for PLID ${packet.CarBehind}`,
  );
}

const flag: Record<FlagType, string> = {
  [FlagType.BLUE]: '^6blue flag^8',
  [FlagType.YELLOW]: '^3yellow flag^8',
};
