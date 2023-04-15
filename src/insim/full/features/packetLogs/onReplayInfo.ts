import type { InSim } from 'node-insim';
import type { IS_RIP } from 'node-insim/packets';
import { ReplayError, ReplayMode } from 'node-insim/packets';

import { log } from './log';

export function onReplayInfo(packet: IS_RIP, inSim: InSim) {
  log(
    packet,
    inSim,
    `${ReplayMode[packet.MPR]} ${packet.RName} - ${
      ReplayError[packet.Error]
    } | CTime: ${packet.CTime}`,
  );
}
