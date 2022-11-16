import type { IPacket } from 'node-insim/packets';
import { IS_MSL, PacketType } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

export function log(packet: IPacket, inSim: InSim, text: string) {
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
