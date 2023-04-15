import type { InSim } from 'node-insim';
import type { IS_RES } from 'node-insim/packets';

import { log } from './log';

export function onResult(packet: IS_RES, inSim: InSim) {
  log(
    packet,
    inSim,
    `${packet.PName}^8 (PLID ${packet.PLID}) - result ${packet.ResultNum}`,
  );
}
