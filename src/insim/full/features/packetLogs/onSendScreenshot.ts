import type { InSim } from 'node-insim';
import type { IS_SSH } from 'node-insim/packets';
import { ScreenshotError } from 'node-insim/packets';

import { log } from './log';

export function onSendScreenshot(packet: IS_SSH, inSim: InSim) {
  log(
    packet,
    inSim,
    `Screenshot '${packet.Name}' - ${ScreenshotError[packet.Error]}`,
  );
}
