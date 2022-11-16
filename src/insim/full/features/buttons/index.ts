import { ButtonFunction, IS_ISI_ReqI, PacketType } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { drawButtonStyles } from './buttonStyles';
import { drawSendablePacketButtons } from './sendablePackets';
import { drawSmallPacketButtons } from './smallPacketButtons';
import { drawStateButtons } from './stateButtons';
import { drawStateFlagsButtons } from './stateFlagsButtons';
import { drawTinyPacketButtons } from './tinyPacketButtons';

export function drawTestButtons(inSim: InSim) {
  inSim.on(PacketType.ISP_VER, (packet) => {
    if (packet.ReqI === IS_ISI_ReqI.SEND_VERSION) {
      drawButtons(inSim);
    }
  });

  inSim.on(PacketType.ISP_BFN, (packet) => {
    if (packet.SubT === ButtonFunction.BFN_REQUEST) {
      drawButtons(inSim);
    }
  });
}

function drawButtons(inSim: InSim) {
  drawStateButtons(inSim);
  drawStateFlagsButtons(inSim);
  drawButtonStyles(inSim);
  drawTinyPacketButtons(inSim);
  drawSmallPacketButtons(inSim);
  drawSendablePacketButtons(inSim);
}
