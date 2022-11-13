import type { IS_CNL } from 'node-insim/packets';

import { log } from '../../log';

export function onConnectionLeave(packet: IS_CNL) {
  log.info(`Connection left: UCID ${packet.UCID}`);
}
