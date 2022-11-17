import type { IS_AXM } from 'node-insim/packets';
import { PMOAction } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { log } from './log';

export function onAutocrossMultipleObjects(packet: IS_AXM, inSim: InSim) {
  log(
    packet,
    inSim,
    `Action: ${PMOAction[packet.PMOAction]} - ${packet.NumO} objects - UCID ${
      packet.UCID
    }`,
  );
}
