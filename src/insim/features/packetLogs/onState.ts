import type { InSim } from 'node-insim';
import type { IS_STA } from 'node-insim/packets';

import { log } from './log';

export function onState(packet: IS_STA, inSim: InSim) {
  log(packet, inSim, 'Game state changed');
}
