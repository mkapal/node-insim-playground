import type { IS_TINY } from 'node-insim/packets';
import { TinyType } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { log } from './log';

export function onTiny(packet: IS_TINY, inSim: InSim) {
  log(packet, inSim, TinyType[packet.SubT]);
}
