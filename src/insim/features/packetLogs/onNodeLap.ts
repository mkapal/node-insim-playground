import type { InSim } from "node-insim";
import type { IS_NLP } from "node-insim/packets";

import { log } from "./log";

export function onNodeLap(packet: IS_NLP, inSim: InSim) {
  log(
    packet,
    inSim,
    `(${packet.NumP}) ${packet.Info.slice(0, 19)
      .map((info) => `${info.PLID}:${info.Position}`)
      .join(" ")}...`,
  );
}
