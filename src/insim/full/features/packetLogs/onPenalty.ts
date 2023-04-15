import type { InSim } from 'node-insim';
import type { IS_PEN } from 'node-insim/packets';
import { PenaltyReason } from 'node-insim/packets';
import { PenaltyValue } from 'node-insim/packets';

import { log } from './log';

export function onPenalty(packet: IS_PEN, inSim: InSim) {
  log(
    packet,
    inSim,
    `PLID ${packet.PLID}: penalty ${PenaltyValue[packet.OldPen]} > ${
      PenaltyValue[packet.NewPen]
    } (${PenaltyReason[packet.Reason]})`,
  );
}
