import type { IS_CSC } from 'node-insim/packets';
import { CSCAction } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { log } from './log';

export function onCarStateChange(packet: IS_CSC, inSim: InSim) {
  log(
    packet,
    inSim,
    `PLID ${packet.PLID} - car state changed to ${
      CSCAction[packet.CSCAction]
    } - [${packet.C.X},${packet.C.Y},${packet.C.Zbyte}] - time ${packet.Time}`,
  );
}
