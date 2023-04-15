import type { InSim } from 'node-insim';
import type { Packet } from 'node-insim/packets';
import { IS_MSL, PacketType } from 'node-insim/packets';

export function log(packet: Packet, inSim: InSim, text: string) {
  const prefix = `^7${PacketType[packet.Type]}: ^8`;
  const msg = `${prefix}${text}`;

  if (msg.length >= 128) {
    inSim.send(
      new IS_MSL({
        Msg: `${msg.substring(0, 124)}...`,
      }),
    );
    return;
  }

  inSim.send(
    new IS_MSL({
      Msg: msg,
    }),
  );
}
