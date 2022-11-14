import type { IS_CRS } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { log } from './log';

export function onCarReset(packet: IS_CRS, inSim: InSim) {
  log(packet, inSim, `Car reset: ${packet.PLID}`);
}
