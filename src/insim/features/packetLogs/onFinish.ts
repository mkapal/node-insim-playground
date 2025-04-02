import type { InSim } from "node-insim";
import type { IS_FIN } from "node-insim/packets";

import { log } from "./log";

export function onFinish(packet: IS_FIN, inSim: InSim) {
  log(
    packet,
    inSim,
    `PLID ${packet.PLID} finished after ${packet.TTime} ms and ${packet.LapsDone} laps`,
  );
}
