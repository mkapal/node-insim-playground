import type { IS_RES } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { log } from './log';

export function onResult(packet: IS_RES, inSim: InSim) {
  log(
    packet,
    inSim,
    `PLID ${packet.PLID} (${packet.PName}) - result ${packet.ResultNum}`,
  );
}
