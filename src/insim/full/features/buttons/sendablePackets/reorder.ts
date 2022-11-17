import { ButtonStyle, IS_MSL, IS_REO, MessageSound } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { buttonTextWithCaption, drawButton } from '../../../ui';
import { getPacketLabel } from '../../../utils';
import { BUTTON_HEIGHT, TOP_OFFSET } from '../constants';

export function drawReorderPacketButton(inSim: InSim, row: number) {
  drawButton(inSim, {
    Text: buttonTextWithCaption(
      'PLIDs separated by commas (,)',
      getPacketLabel(IS_REO, true),
    ),
    ReqI: 1,
    L: 97,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 15,
    H: BUTTON_HEIGHT,
    TypeIn: 95,
    BStyle: ButtonStyle.ISB_DARK | ButtonStyle.ISB_CLICK,
    onType: ({ inSim, packet }) => {
      const plIds = packet.Text.split(',')
        .map((plId) => parseInt(plId, 10))
        .filter((plId) => !isNaN(plId));

      if (plIds.length === 0) {
        inSim.send(
          new IS_MSL({
            Sound: MessageSound.SND_ERROR,
            Msg: '^1PLID array must not be empty',
          }),
        );
        return;
      }

      if (plIds.length > 40) {
        inSim.send(
          new IS_MSL({
            Sound: MessageSound.SND_ERROR,
            Msg: '^1PLID array must not be longer than 40',
          }),
        );
        return;
      }

      inSim.send(
        new IS_REO({
          PLID: plIds,
          NumP: plIds.length,
        }),
      );
    },
  });
}
