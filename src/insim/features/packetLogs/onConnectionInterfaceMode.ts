import type { InSim } from "node-insim";
import type { IS_CIM } from "node-insim/packets";
import {
  GarageInterfaceSubmode,
  InterfaceMode,
  NormalInterfaceSubmode,
  ObjectIndex,
  ShiftUInterfaceSubmode,
} from "node-insim/packets";

import { log } from "./log";

export function onConnectionInterfaceMode(packet: IS_CIM, inSim: InSim) {
  log(
    packet,
    inSim,
    `UCID ${packet.UCID} - interface mode ${
      InterfaceMode[packet.Mode]
    } - submode ${getSubmode(packet.Mode, packet.SubMode)} - selection type ${
      ObjectIndex[packet.SelType]
    }`,
  );
}

function getSubmode(mode: InterfaceMode, submode: number) {
  switch (mode) {
    case InterfaceMode.CIM_NORMAL:
      return NormalInterfaceSubmode[submode];
    case InterfaceMode.CIM_GARAGE:
      return GarageInterfaceSubmode[submode];
    case InterfaceMode.CIM_SHIFTU:
      return ShiftUInterfaceSubmode[submode];
    default:
      return submode;
  }
}
