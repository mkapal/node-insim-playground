import type { IS_LAP } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { log } from './log';

export function onLapTime(packet: IS_LAP, inSim: InSim) {
  log(
    packet,
    inSim,
    `Lap time: ${packet.LTime} (PLID ${packet.PLID}) - ${packet.LapsDone} lap(s) done`,
  );
}
