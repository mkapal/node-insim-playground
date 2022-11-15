import type { IS_MCI } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { log } from './log';

export function onMultiCarInfo(packet: IS_MCI, inSim: InSim) {
  log(
    packet,
    inSim,
    `(${packet.NumC}) Speeds: ${packet.Info.slice(0, 9)
      .map((info) => `${info.PLID}:${info.Speed}`)
      .join(' ')}...`,
  );
}
