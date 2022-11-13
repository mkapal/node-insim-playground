import type { IS_TINY } from 'node-insim/packets';
import { TinyType } from 'node-insim/packets';

import { log } from '../../log';

export function onTiny(packet: IS_TINY) {
  log.info('Received IS_TINY packet', TinyType[packet.SubT]);
}
