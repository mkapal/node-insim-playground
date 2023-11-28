import type { InSim } from 'node-insim';
import type { IS_III } from 'node-insim/packets';

import { log } from './log';

export function onInSimInfo(packet: IS_III, inSim: InSim) {
  log(packet, inSim, `InSim info message received: ${packet.Msg}`);
}
