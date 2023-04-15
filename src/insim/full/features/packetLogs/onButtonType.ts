import type { InSim } from 'node-insim';
import type { IS_BTT } from 'node-insim/packets';

import { log } from './log';

export function onButtonType(packet: IS_BTT, inSim: InSim) {
  log(
    packet,
    inSim,
    `Button text typed: ClickID ${packet.ClickID}, input text: ${packet.Text}`,
  );
}
