import type { InSim } from "node-insim";
import type { IS_MAL } from "node-insim/packets";

import { log } from "./log";

export function onModsAllowed(packet: IS_MAL, inSim: InSim) {
  log(
    packet,
    inSim,
    `UCID ${packet.UCID} - mods allowed (${
      packet.NumM
    }): ${packet.SkinID.join()}`,
  );
}
