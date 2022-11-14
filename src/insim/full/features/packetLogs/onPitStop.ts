import type { IS_PIT } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { log } from './log';

export function onPitStop(packet: IS_PIT, inSim: InSim) {
  log(
    packet,
    inSim,
    `PLID ${packet.PLID} made a pit stop - ${packet.NumStops} stops`,
  );
}
