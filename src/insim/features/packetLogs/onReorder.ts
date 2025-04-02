import type { InSim } from "node-insim";
import type { IS_REO } from "node-insim/packets";

import { log } from "./log";

export function onReorder(packet: IS_REO, inSim: InSim) {
  log(packet, inSim, `Grid (${packet.NumP}) ${packet.PLID.join()}`);
}
