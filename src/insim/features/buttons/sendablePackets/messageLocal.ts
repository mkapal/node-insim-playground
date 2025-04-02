import type { InSim } from "node-insim";
import {
  ButtonStyle,
  ButtonTextColour,
  IS_MSL,
  MessageSound,
} from "node-insim/packets";

import { buttonTextWithCaption, drawButton } from "../../../ui";
import { getPacketLabel } from "../../../utils";
import { BUTTON_HEIGHT, TOP_OFFSET } from "../constants";

export function drawMessageLocalPacketButton(inSim: InSim, row: number) {
  let sound: MessageSound = MessageSound.SND_SILENT;

  drawButton(inSim, {
    Text: buttonTextWithCaption("Message", getPacketLabel(IS_MSL, true)),
    ReqI: 1,
    L: 97,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 15,
    H: BUTTON_HEIGHT,
    TypeIn: 95,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonTextColour.UNSELECTED_TEXT |
      ButtonStyle.ISB_CLICK,
    onType: ({ inSim, packet }) => {
      inSim.send(
        new IS_MSL({
          Msg: packet.Text,
          Sound: sound,
        }),
      );
    },
  });

  drawButton(inSim, {
    Text: "Sound:",
    ReqI: 1,
    L: 112,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 12,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.UNSELECTED_TEXT | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: `[${MessageSound[sound]}]`,
    ReqI: 1,
    L: 119,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 17,
    H: BUTTON_HEIGHT,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonStyle.ISB_CLICK |
      ButtonTextColour.UNSELECTED_TEXT,
    onClick: ({ button }) => {
      const viewIdentifierIds = Object.keys(MessageSound).filter(
        (key) => !isNaN(Number(MessageSound[key as unknown as number])),
      );
      const identifierId = viewIdentifierIds.findIndex(
        (identifier) => identifier === MessageSound[sound],
      );

      sound =
        identifierId === viewIdentifierIds.length - 1 ? 0 : identifierId + 1;

      button.update({
        ReqI: 1,
        Text: `[${MessageSound[sound]}]`,
      });
    },
  });
}
