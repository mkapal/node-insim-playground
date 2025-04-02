import type { InSim } from "node-insim";
import type { IS_ISM } from "node-insim/packets";
import { MultiplayerHostMode } from "node-insim/packets";

import { log } from "./log";

export function onMultiplayer(packet: IS_ISM, inSim: InSim) {
  if (packet.Host === MultiplayerHostMode.GUEST) {
    log(packet, inSim, `Multiplayer host joined: ${packet.HName}`);
  } else if (packet.Host === MultiplayerHostMode.HOST) {
    log(packet, inSim, `Multiplayer host started ${packet.HName}`);
  }
}
