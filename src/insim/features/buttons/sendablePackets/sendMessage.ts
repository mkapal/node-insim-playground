import type { InSim } from 'node-insim';
import { ButtonStyle } from 'node-insim/packets';

import { buttonTextWithCaption, drawButton } from '../../../ui';
import { BUTTON_HEIGHT, TOP_OFFSET } from '../constants';

export function drawMessageButtons(inSim: InSim, row: number) {
  drawButton(inSim, {
    Text: buttonTextWithCaption('Message', 'sendMessage'),
    ReqI: 1,
    L: 97,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 15,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_DARK | ButtonStyle.ISB_CLICK,
    TypeIn: 127,
    onType: ({ packet }) => {
      inSim.sendMessage(packet.Text);
    },
  });
}
