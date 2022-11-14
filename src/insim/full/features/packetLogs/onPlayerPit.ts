import type { IS_PLP } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { log } from './log';

export function onPlayerPit(packet: IS_PLP, inSim: InSim) {
  log(packet, inSim, `Player pitted: PLID ${packet.PLID}`);
}
