import type { InSim } from "node-insim";
import type { IS_NCN } from "node-insim/packets";

import { log } from "./log";

export function onNewConnection(packet: IS_NCN, inSim: InSim) {
  log(packet, inSim, `New connection: ${packet.UName} (UCID ${packet.UCID})`);
}
