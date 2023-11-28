import type { InSim } from 'node-insim';
import type { IS_CNL } from 'node-insim/packets';
import { LeaveReason } from 'node-insim/packets';

import { log } from './log';

export function onConnectionLeave(packet: IS_CNL, inSim: InSim) {
  log(
    packet,
    inSim,
    `Connection left: ${packet.UCID} (${LeaveReason[packet.Reason]})`,
  );
}
