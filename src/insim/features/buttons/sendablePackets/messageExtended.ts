import type { InSim } from "node-insim";
import { ButtonStyle, IS_MSX } from "node-insim/packets";

import { buttonTextWithCaption, drawButton } from "../../../ui";
import { getPacketLabel } from "../../../utils";
import { BUTTON_HEIGHT, TOP_OFFSET } from "../constants";

export function drawMessageExtendedPacketButton(inSim: InSim, row: number) {
  drawButton(inSim, {
    Text: buttonTextWithCaption("Message", getPacketLabel(IS_MSX, true)),
    ReqI: 1,
    L: 97,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 15,
    H: BUTTON_HEIGHT,
    TypeIn: 95,
    BStyle: ButtonStyle.ISB_DARK | ButtonStyle.ISB_CLICK,
    onType: ({ inSim, packet }) => {
      inSim.send(
        new IS_MSX({
          Msg: packet.Text,
        }),
      );
    },
  });
}
