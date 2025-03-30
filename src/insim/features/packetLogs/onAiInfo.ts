import type { InSim } from 'node-insim';
import type { IS_AII } from 'node-insim/packets';

import { log } from './log';

export function onAiInfo(packet: IS_AII, inSim: InSim) {
  log(packet, inSim, `PLID ${packet.PLID}`);
  log(
    packet,
    inSim,
    `OSData.AngVel: [${packet.OSData.AngVel[0]},${packet.OSData.AngVel[1]},${packet.OSData.AngVel[2]}]`,
  );
}
