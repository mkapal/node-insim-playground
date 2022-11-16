import type { IS_CON } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { log } from './log';

export function onCarContact(packet: IS_CON, inSim: InSim) {
  log(
    packet,
    inSim,
    `Contact between PLID ${packet.A.PLID} and ${packet.B.PLID} at closing speed ${packet.SpClose} - A ${packet.A.Speed} m/s - B ${packet.B.Speed} m/s`,
  );
}
