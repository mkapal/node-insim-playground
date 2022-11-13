import type { IS_CRS } from 'node-insim/packets';

import { log } from '../../log';

export function onCarReset(packet: IS_CRS) {
  log.info(`Car reset: ${packet.PLID}`);
}
