import { ButtonStyle, IS_MAL, IS_MSL, MessageSound } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { buttonTextWithCaption, drawButton } from '../../../ui';
import { getPacketLabel } from '../../../utils';
import { BUTTON_HEIGHT, TOP_OFFSET } from '../constants';

export function drawModsAllowedPacketButton(inSim: InSim, row: number) {
  drawButton(inSim, {
    Text: buttonTextWithCaption(
      'SkinIDs separated by commas (,)',
      getPacketLabel(IS_MAL, true),
    ),
    ReqI: 1,
    L: 97,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 15,
    H: BUTTON_HEIGHT,
    TypeIn: 95,
    BStyle: ButtonStyle.ISB_DARK | ButtonStyle.ISB_CLICK,
    onType: ({ inSim, packet }) => {
      const skinIds = packet.Text.split(',');

      if (skinIds.length > IS_MAL.MAX_MODS) {
        inSim.send(
          new IS_MSL({
            Sound: MessageSound.SND_ERROR,
            Msg: `^1SkinID array must not be longer than ${IS_MAL.MAX_MODS}`,
          }),
        );
        return;
      }

      inSim.send(
        new IS_MAL({
          SkinID: skinIds,
        }),
      );
    },
  });
}
