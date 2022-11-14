import type { IS_CPR } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { log } from './log';

export function onConnectionPlayerRename(packet: IS_CPR, inSim: InSim) {
  log(packet, inSim, `Player renamed: ${packet.PName} (UCID ${packet.UCID})`);
}
