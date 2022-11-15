import type { IS_NPL } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { log } from './log';

export function onNewPlayer(packet: IS_NPL, inSim: InSim) {
  log(
    packet,
    inSim,
    `New player: ${packet.PName}^8 (PLID ${packet.PLID}, UCID ${packet.UCID})`,
  );
}
