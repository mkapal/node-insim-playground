import type { InSim } from "node-insim";
import type { Packet } from "node-insim/packets";
import { IS_MSL, IS_MTC, PacketType } from "node-insim/packets";

import { isLocalhost } from "../../utils";

export function log(packet: Packet, inSim: InSim, text: string) {
  const prefix = `^7${PacketType[packet.Type]}: ^8`;
  const msg = `${prefix}${text}`;

  if (msg.length >= 128) {
    inSim.send(
      isLocalhost()
        ? new IS_MSL({
            Msg: `${msg.substring(0, 124)}...`,
          })
        : new IS_MTC({
            UCID: 255,
            Text: `${msg.substring(0, 124)}...`,
          }),
    );
    return;
  }

  inSim.send(
    isLocalhost()
      ? new IS_MSL({
          Msg: msg,
        })
      : new IS_MTC({
          UCID: 255,
          Text: msg,
        }),
  );
}
