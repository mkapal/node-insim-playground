import {
  ButtonStyle,
  ButtonTextColour,
  IS_SSH,
  TypeIn,
} from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { buttonTextWithCaption, drawButton } from '../../../ui';
import { getPacketLabel } from '../../../utils';
import { BUTTON_HEIGHT, TOP_OFFSET } from '../constants';

export function drawSendScreenshotPacketButton(inSim: InSim, row: number) {
  let reqI = 1;

  drawButton(inSim, {
    Text: buttonTextWithCaption(
      'Screenshot file name',
      getPacketLabel(IS_SSH, true),
    ),
    ReqI: 1,
    L: 97,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 15,
    H: BUTTON_HEIGHT,
    TypeIn: 95,
    BStyle: ButtonStyle.ISB_DARK | ButtonStyle.ISB_CLICK,
    onType: ({ inSim, packet }) => {
      inSim.send(
        new IS_SSH({
          ReqI: reqI,
          Name: packet.Text,
        }),
      );
    },
  });

  drawButton(inSim, {
    Text: 'ReqI:',
    ReqI: 1,
    L: 112,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 10,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: buttonTextWithCaption('ReqI', reqI.toString(10)),
    ReqI: 1,
    L: 117,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 3,
    H: BUTTON_HEIGHT,
    TypeIn: 3 + TypeIn.INIT_VALUE_BUTTON_TEXT,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonStyle.ISB_CLICK |
      ButtonTextColour.TextString,
    onType: ({ packet, button }) => {
      const parsedNumber = parseInt(packet.Text, 10);

      if (isNaN(parsedNumber)) {
        return;
      }

      reqI = parsedNumber;
      button.update({
        ReqI: 1,
        Text: buttonTextWithCaption('ReqI', reqI.toString(10)),
      });
    },
  });
}
