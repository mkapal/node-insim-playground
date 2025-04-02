import type { InSim } from "node-insim";
import {
  ButtonStyle,
  ButtonTextColour,
  MessageSound,
} from "node-insim/packets";

import { buttonTextWithCaption, drawButton } from "../../../ui";
import { BUTTON_HEIGHT, LEFT_OFFSET, TOP_OFFSET } from "../constants";

export function drawLocalMessageButtons(inSim: InSim, row: number) {
  let sound: MessageSound = MessageSound.SND_SILENT;

  drawButton(inSim, {
    Text: buttonTextWithCaption("Message", "sendLocalMessage"),
    ReqI: 1,
    L: LEFT_OFFSET,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 20,
    H: BUTTON_HEIGHT,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonTextColour.UNSELECTED_TEXT |
      ButtonStyle.ISB_CLICK,
    TypeIn: 127,
    onType: ({ packet }) => {
      inSim.sendLocalMessage(packet.Text, sound);
    },
  });

  drawButton(inSim, {
    Text: "Sound:",
    ReqI: 1,
    L: LEFT_OFFSET + 20,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 12,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.UNSELECTED_TEXT | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: `[${MessageSound[sound]}]`,
    ReqI: 1,
    L: LEFT_OFFSET + 26,
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
