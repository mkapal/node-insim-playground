import type { InSim } from 'node-insim';
import type { IS_UCO } from 'node-insim/packets';
import { UCOAction } from 'node-insim/packets';

import { log } from './log';

export function onUserControlObject(packet: IS_UCO, inSim: InSim) {
  log(
    packet,
    inSim,
    `PLID ${packet.PLID} ${UCOAction[packet.UCOAction]} | C: [${packet.C.X}, ${
      packet.C.Y
    }, ${packet.C.Zbyte}] at ${packet.C.Speed} m/s | Info: [${packet.Info.X}, ${
      packet.Info.Y
    }, ${packet.Info.Zbyte}] Index ${packet.Info.Index} - Flags ${
      packet.Info.Flags
    }`,
  );
}
