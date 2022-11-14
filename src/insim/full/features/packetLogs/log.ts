import type { IPacket } from 'node-insim/packets';
import { IS_MST, PacketType } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

export function log(packet: IPacket, inSim: InSim, text: string) {
  inSim.send(
    new IS_MST({
      Msg: `/echo ^7${PacketType[packet.Type]}: ^8${text}`,
    }),
  );
}
