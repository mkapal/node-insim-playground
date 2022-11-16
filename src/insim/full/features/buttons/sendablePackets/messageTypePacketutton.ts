import { ButtonStyle, IS_MST, IS_Y_MIN } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { buttonTextWithCaption, drawButton } from '../../../ui';
import { getPacketLabel } from '../../../utils';
import { BUTTON_HEIGHT } from '../constants';

export function drawMessageTypePacketButton(inSim: InSim, row: number) {
  drawButton(inSim, {
    Text: buttonTextWithCaption('Message', getPacketLabel(IS_MST, true)),
    ReqI: 1,
    L: 97,
    T: IS_Y_MIN + BUTTON_HEIGHT * row,
    W: 15,
    H: BUTTON_HEIGHT,
    TypeIn: 63,
    BStyle: ButtonStyle.ISB_DARK | ButtonStyle.ISB_CLICK,
    onType: ({ inSim, packet }) => {
      inSim.send(
        new IS_MST({
          Msg: packet.Text,
        }),
      );
    },
  });
}
