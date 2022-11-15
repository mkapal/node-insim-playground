import type { IS_REO } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { log } from './log';

export function onReorder(packet: IS_REO, inSim: InSim) {
  log(
    packet,
    inSim,
    `Grid reordered (${packet.NumP}) ${packet.PLID.slice(0, 20).join()}...`,
  );
}
