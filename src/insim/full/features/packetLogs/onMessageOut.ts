import type { IS_MSO } from 'node-insim/packets';
import { UserValues } from 'node-insim/packets';

import { log } from '../../log';

export function onMessageOut(packet: IS_MSO) {
  log.info(`Message received (${UserValues[packet.UserType]}): ${packet.Msg} `);
}
