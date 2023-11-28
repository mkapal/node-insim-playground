import type { InSim } from 'node-insim';
import type { IS_SMALL } from 'node-insim/packets';
import { SmallType } from 'node-insim/packets';

import { log } from './log';

export function onSmall(packet: IS_SMALL, inSim: InSim) {
  log(packet, inSim, `${SmallType[packet.SubT]}: ${packet.UVal}`);
}
