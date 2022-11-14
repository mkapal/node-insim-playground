import type { IS_SMALL } from 'node-insim/packets';
import { SmallType } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { log } from './log';

export function onSmall(packet: IS_SMALL, inSim: InSim) {
  log(
    packet,
    inSim,
    `Received IS_SMALL packet ${SmallType[packet.SubT]}: ${packet.UVal}`,
  );
}
