import type { IS_AXO } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { log } from './log';

export function onAutocrossObject(packet: IS_AXO, inSim: InSim) {
  log(
    packet,
    inSim,
    `PLID ${packet.PLID}: 2 sec penalty for hitting an object`,
  );
}
