import type { IS_MCI } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { log } from './log';

export function onMultiCarInfo(packet: IS_MCI, inSim: InSim) {
  log(
    packet,
    inSim,
    `(${packet.NumC}) ${packet.Info.slice(0, 3)
      .map((info) => `${info.PLID}[${info.X},${info.Y}]`)
      .join(' ')}...`,
  );
}
