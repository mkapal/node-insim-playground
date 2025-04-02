import type { InSim } from "node-insim";
import {
  ButtonStyle,
  ButtonTextColour,
  MessageSound,
  TypeIn,
} from "node-insim/packets";

import { buttonTextWithCaption, drawButton } from "../../../ui";
import { BUTTON_HEIGHT, LEFT_OFFSET, TOP_OFFSET } from "../constants";

export function drawMessageToPlayerButtons(inSim: InSim, row: number) {
  let PLID = 0;
  let sound: MessageSound = MessageSound.SND_SILENT;

  drawButton(inSim, {
    Text: buttonTextWithCaption("Message", "sendMessageToPlayer"),
    ReqI: 1,
    L: LEFT_OFFSET,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 20,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_DARK | ButtonStyle.ISB_CLICK,
    TypeIn: 127,
    onType: ({ packet }) => {
      inSim.sendMessageToPlayer(PLID, packet.Text, sound);
    },
  });

  drawButton(inSim, {
    Text: "PLID:",
    ReqI: 1,
    L: LEFT_OFFSET + 20,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 12,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.UNSELECTED_TEXT | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: buttonTextWithCaption("PLID", PLID.toString(10)),
    ReqI: 1,
    L: LEFT_OFFSET + 25,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 4,
    H: BUTTON_HEIGHT,
    TypeIn: 3 + TypeIn.INIT_VALUE_BUTTON_TEXT,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonStyle.ISB_CLICK |
      ButtonTextColour.TEXT_STRING,
    onType: ({ packet, button }) => {
      const parsedNumber = parseInt(packet.Text, 10);

      if (isNaN(parsedNumber)) {
        return;
      }

      PLID = parsedNumber;
      button.update({
        ReqI: 1,
        Text: buttonTextWithCaption("PLID", PLID.toString(10)),
      });
    },
  });

  drawButton(inSim, {
    Text: "Sound:",
    ReqI: 1,
    L: LEFT_OFFSET + 29,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 12,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.UNSELECTED_TEXT | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: `[${MessageSound[sound]}]`,
    ReqI: 1,
    L: LEFT_OFFSET + 35,
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
