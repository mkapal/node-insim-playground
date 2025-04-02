import type { InSim } from "node-insim";
import { ButtonStyle, ButtonTextColour } from "node-insim/packets";

import { buttonTextWithCaption, drawButton } from "../../../ui";
import { BUTTON_HEIGHT, LEFT_OFFSET, TOP_OFFSET } from "../constants";

export function drawMessageButtons(inSim: InSim, row: number) {
  drawButton(inSim, {
    Text: buttonTextWithCaption("Message", "sendMessage"),
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
      inSim.sendMessage(packet.Text);
    },
  });
}
