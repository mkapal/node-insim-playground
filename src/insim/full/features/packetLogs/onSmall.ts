import type { IS_SMALL } from 'node-insim/packets';
import { SmallType } from 'node-insim/packets';

import { log } from '../../log';

export function onSmall(packet: IS_SMALL) {
  log.info(
    `Received IS_SMALL packet ${SmallType[packet.SubT]}: ${packet.UVal}`,
  );
}
