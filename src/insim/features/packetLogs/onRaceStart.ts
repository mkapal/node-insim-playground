import type { InSim } from "node-insim";
import type { IS_RST } from "node-insim/packets";

import { lfsRaceLapsToLapsOrHours } from "../../utils";
import { log } from "./log";

export function onRaceStart(packet: IS_RST, inSim: InSim) {
  log(
    packet,
    inSim,
    `${packet.Track}: ${lfsRaceLapsToLapsOrHours(packet.RaceLaps)} (${
      packet.RaceLaps
    }) - qual mins ${packet.QualMins} - wind ${packet.Wind} - ${
      packet.NumP
    } players - weather ${packet.Weather} - ${packet.NumNodes} nodes (1:${
      packet.Split1
    }, 2:${packet.Split2}, 3:${packet.Split3}, F:${packet.Finish})`,
  );
}
