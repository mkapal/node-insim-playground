import type { InSim } from 'node-insim';
import type { IS_OBH } from 'node-insim/packets';

import { log } from './log';

export function onObjectHit(packet: IS_OBH, inSim: InSim) {
  log(
    packet,
    inSim,
    `PLID ${packet.PLID} hit an object at ${packet.C.Speed} m/s - Object ${packet.Index} [${packet.X}, ${packet.Y}, ${packet.Zbyte}] - time ${packet.Time}`,
  );
}
