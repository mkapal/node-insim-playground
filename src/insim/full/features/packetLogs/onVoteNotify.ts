import type { IS_VTN } from 'node-insim/packets';
import { VoteAction } from 'node-insim/packets';

import { log } from '../../log';

export function onVoteNotify(packet: IS_VTN) {
  log.info(
    `Vote action from UCID ${packet.UCID}: ${VoteAction[packet.Action]}`,
  );
}
