import type { InSim } from 'node-insim';
import type { IS_VER } from 'node-insim/packets';
import { IS_ISI_ReqI } from 'node-insim/packets';

import { log } from './log';

export function onVersion(packet: IS_VER, inSim: InSim) {
  if (packet.ReqI === IS_ISI_ReqI.SEND_VERSION) {
    log(
      packet,
      inSim,
      `Connected to LFS ${packet.Product} ${packet.Version} at ${inSim.options.Host}:${inSim.options.Port}`,
    );
  } else {
    log(
      packet,
      inSim,
      `Version requested: ${packet.Product} ${packet.Version}`,
    );
  }
}
