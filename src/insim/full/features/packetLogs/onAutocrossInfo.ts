import type { IS_AXI } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { log } from './log';

export function onAutocrossInfo(packet: IS_AXI, inSim: InSim) {
  log(
    packet,
    inSim,
    `${packet.LName} - ${packet.NumO} objects, ${packet.NumCP} checkpoints, AXStart: ${packet.AXStart}`,
  );
}
