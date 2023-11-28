import type { InSim } from 'node-insim';
import type { IS_PSF } from 'node-insim/packets';

import { log } from './log';

export function onPitStopFinished(packet: IS_PSF, inSim: InSim) {
  log(
    packet,
    inSim,
    `PLID ${packet.PLID} finished a pit stop in ${packet.STime} ms`,
  );
}
