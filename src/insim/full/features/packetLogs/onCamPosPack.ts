import type { IS_CPP } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { log } from './log';

export function onCamPosPack(packet: IS_CPP, inSim: InSim) {
  log(
    packet,
    inSim,
    `Camera position requested: PLID ${packet.ViewPLID}, FOV ${packet.FOV}`,
  );
}
