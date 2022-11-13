import type { IS_PLP } from 'node-insim/packets';

import { log } from '../../log';

export function onPlayerPit(packet: IS_PLP) {
  log.info(`Player pitted: PLID ${packet.PLID}`);
}
