import type { InSim } from "node-insim";
import type { IS_PFL } from "node-insim/packets";

import { log } from "./log";

export function onPlayerFlagsChanged(packet: IS_PFL, inSim: InSim) {
  log(
    packet,
    inSim,
    `PLID ${packet.PLID} - player flags changed to ${packet.Flags}`,
  );
}
