import type { InSim } from "node-insim";
import type { IS_TOC } from "node-insim/packets";

import { log } from "./log";

export function onTakeOverCar(packet: IS_TOC, inSim: InSim) {
  log(
    packet,
    inSim,
    `PLID ${packet.PLID}: UCID ${packet.OldUCID} took over UCID ${packet.NewUCID}`,
  );
}
