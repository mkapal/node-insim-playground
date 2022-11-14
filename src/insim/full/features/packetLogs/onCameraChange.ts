import type { IS_CCH } from 'node-insim/packets';
import { ViewIdentifier } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { log } from './log';

export function onCameraChange(packet: IS_CCH, inSim: InSim) {
  log(
    packet,
    inSim,
    `PLID ${packet.PLID} camera changed - ${ViewIdentifier[packet.Camera]}`,
  );
}
