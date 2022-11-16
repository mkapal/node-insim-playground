import type { IS_HLV } from 'node-insim/packets';
import { HlvcViolation } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { log } from './log';

export function onHlvc(packet: IS_HLV, inSim: InSim) {
  log(
    packet,
    inSim,
    `Hotlap invalid for PLID ${packet.PLID} at ${packet.Time} - speed ${
      packet.C.Speed
    } m/s - ${HlvcViolation[packet.HLVC]} [${packet.C.X}, ${packet.C.Y}, ${
      packet.C.Zbyte
    }]`,
  );
}
