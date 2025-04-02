import type { InSim } from "node-insim";
import type { IS_MCI } from "node-insim/packets";

import { log } from "./log";

export function onMultiCarInfo(packet: IS_MCI, inSim: InSim) {
  log(
    packet,
    inSim,
    `(${packet.NumC}) Speeds: ${packet.Info.slice(0, 11)
      .map((info) => `${info.PLID}:${info.Speed}`)
      .join(" ")}...`,
  );
}
