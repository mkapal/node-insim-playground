import type { InSim } from "node-insim";
import type { IS_NCI } from "node-insim/packets";
import { Language, License } from "node-insim/packets";

import { log } from "./log";

export function onNewConnectionInfo(packet: IS_NCI, inSim: InSim) {
  log(
    packet,
    inSim,
    `New connection info: UCID ${packet.UCID} - IP ${
      packet.IPAddress
    } - language ${Language[packet.Language]} - ${License[packet.License]}`,
  );
}
