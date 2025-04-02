import type { InSim } from "node-insim";
import type { IS_CPR } from "node-insim/packets";

import { log } from "./log";

export function onConnectionPlayerRename(packet: IS_CPR, inSim: InSim) {
  log(packet, inSim, `Player renamed: ${packet.PName}^8 (UCID ${packet.UCID})`);
}
