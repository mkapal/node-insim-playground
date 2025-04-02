import type { InSim } from "node-insim";
import type { IS_ACR } from "node-insim/packets";
import { AdminCommandResult } from "node-insim/packets";

import { log } from "./log";

export function onAdminCommandReport(packet: IS_ACR, inSim: InSim) {
  log(
    packet,
    inSim,
    `UCID ${packet.UCID} typed ${packet.Text} with result ${
      AdminCommandResult[packet.Result]
    } (admin ${packet.Admin})`,
  );
}
