import type { InSim } from "node-insim";
import type { IS_CPP } from "node-insim/packets";
import { ViewIdentifier } from "node-insim/packets";

import { log } from "./log";

export function onCamPosPack(packet: IS_CPP, inSim: InSim) {
  log(
    packet,
    inSim,
    `Camera position requested: PLID ${packet.ViewPLID} - ${
      ViewIdentifier[packet.InGameCam]
    } - FOV ${packet.FOV} [${packet.X},${packet.Y},${packet.Z}]`,
  );
}
