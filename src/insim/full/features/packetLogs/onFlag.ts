import type { IS_FLG } from 'node-insim/packets';
import { FlagType } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { log } from './log';

export function onFlag(packet: IS_FLG, inSim: InSim) {
  log(
    packet,
    inSim,
    `PLID ${packet.PLID}: ${FlagType[packet.Flag]} flag ${
      packet.OffOn
    } for PLID ${packet.CarBehind}`,
  );
}
