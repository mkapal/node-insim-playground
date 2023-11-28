import type { InSim } from 'node-insim';
import type { IS_PLL } from 'node-insim/packets';

import { log } from './log';

export function onPlayerLeave(packet: IS_PLL, inSim: InSim) {
  log(packet, inSim, `Player left: PLID ${packet.PLID}`);
}
