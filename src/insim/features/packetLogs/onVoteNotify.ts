import type { InSim } from "node-insim";
import type { IS_VTN } from "node-insim/packets";
import { VoteAction } from "node-insim/packets";

import { log } from "./log";

export function onVoteNotify(packet: IS_VTN, inSim: InSim) {
  log(
    packet,
    inSim,
    `Vote action from UCID ${packet.UCID}: ${VoteAction[packet.Action]}`,
  );
}
