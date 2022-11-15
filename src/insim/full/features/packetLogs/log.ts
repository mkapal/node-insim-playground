import type { IPacket } from 'node-insim/packets';
import { IS_MSL, PacketType } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

export function log(packet: IPacket, inSim: InSim, text: string) {
  inSim.send(
    new IS_MSL({
      Msg: `^7${PacketType[packet.Type]}: ^8${text}`,
    }),
  );
}
