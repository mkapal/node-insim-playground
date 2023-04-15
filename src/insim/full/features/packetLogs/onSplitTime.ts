import type { InSim } from 'node-insim';
import type { IS_SPX } from 'node-insim/packets';

import { log } from './log';

export function onSplitTime(packet: IS_SPX, inSim: InSim) {
  log(
    packet,
    inSim,
    `Split ${packet.Split} time: ${packet.STime} (PLID ${packet.PLID})`,
  );
}
