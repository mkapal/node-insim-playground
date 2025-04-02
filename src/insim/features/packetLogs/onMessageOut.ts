import type { IS_MSO } from "node-insim/packets";
import { UserType } from "node-insim/packets";

import { log } from "../../log";

export function onMessageOut(packet: IS_MSO) {
  log(`Message received (${UserType[packet.UserType]}): ${packet.Msg}`);
}
