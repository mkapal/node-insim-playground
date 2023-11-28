import type { InSim } from 'node-insim';
import type { IS_PLA } from 'node-insim/packets';
import { PitLaneFact } from 'node-insim/packets';

import { log } from './log';

export function onPitLane(packet: IS_PLA, inSim: InSim) {
  log(
    packet,
    inSim,
    `PLID ${packet.PLID} pit lane - ${PitLaneFact[packet.Fact]}`,
  );
}
