import type { IS_VER } from 'node-insim/packets';
import { IS_ISI_ReqI } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { log } from '../../log';

export function onVersion(packet: IS_VER, inSim: InSim) {
  if (packet.ReqI === IS_ISI_ReqI.SEND_VERSION) {
    log.info(
      `Connected to LFS ${packet.Product} ${packet.Version}`,
      inSim.options,
    );
  } else {
    log.info(`Version requested: ${packet.Product} ${packet.Version}`);
  }
}
