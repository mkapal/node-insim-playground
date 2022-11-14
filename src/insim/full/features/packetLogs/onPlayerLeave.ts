import type { IS_PLL } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { log } from './log';

export function onPlayerLeave(packet: IS_PLL, inSim: InSim) {
  log(packet, inSim, `Player left: PLID ${packet.PLID}`);
}
