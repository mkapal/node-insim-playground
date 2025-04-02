import type { InSim } from "node-insim";
import type { IS_SLC } from "node-insim/packets";

import { log } from "./log";

export function onSelectedCar(packet: IS_SLC, inSim: InSim) {
  log(
    packet,
    inSim,
    `UCID ${packet.UCID} selected car ${packet.CName} - ReqI ${packet.ReqI}`,
  );
}
