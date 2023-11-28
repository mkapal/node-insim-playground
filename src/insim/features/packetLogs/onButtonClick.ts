import type { InSim } from 'node-insim';
import type { IS_BTC } from 'node-insim/packets';

import { log } from './log';

export function onButtonClick(packet: IS_BTC, inSim: InSim) {
  log(
    packet,
    inSim,
    `Button clicked: ClickID ${packet.ClickID}, ReqI ${packet.ReqI}`,
  );
}
