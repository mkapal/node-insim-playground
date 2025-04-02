import type { InSim } from "node-insim";
import type { IS_BTT } from "node-insim/packets";
import {
  ButtonStyle,
  IS_SMALL,
  PacketType,
  SENDABLE_SMALL_TYPES,
  SmallType,
} from "node-insim/packets";

import { log } from "../../log";
import { buttonTextWithCaption, drawButtonList } from "../../ui";
import { BUTTON_HEIGHT, SMALL_BUTTON_ID_OFFSET, TOP_OFFSET } from "./constants";

export function drawSmallPacketButtons(inSim: InSim) {
  drawButtonList(inSim, {
    title: "IS_SMALL",
    leftOffset: 82,
    topOffset: TOP_OFFSET,
    width: 15,
    height: BUTTON_HEIGHT,
    buttons: SENDABLE_SMALL_TYPES.map((smallTypeNumber) => {
      const text = `${SmallType[smallTypeNumber]} (${smallTypeNumber})`;

      return {
        ReqI: smallTypeNumber + SMALL_BUTTON_ID_OFFSET,
        Text: buttonTextWithCaption(`${text} - UVal`, text),
        BStyle: ButtonStyle.ISB_DARK | ButtonStyle.ISB_CLICK,
        TypeIn: 95,
      };
    }),
  });

  inSim.on(PacketType.ISP_BTT, onButtonType);
}

function onButtonType(packet: IS_BTT, inSim: InSim) {
  if (
    packet.ReqI >= SMALL_BUTTON_ID_OFFSET &&
    packet.ReqI <= SMALL_BUTTON_ID_OFFSET + Math.max(...SENDABLE_SMALL_TYPES)
  ) {
    const smallType = packet.ReqI - SMALL_BUTTON_ID_OFFSET;

    if (SENDABLE_SMALL_TYPES.includes(smallType)) {
      const uVal = parseInt(packet.Text, 10);

      if (isNaN(uVal)) {
        log("UVal must be a number");
        return;
      }

      log(`Send IS_SMALL - ${SmallType[smallType]} (${smallType})`);
      inSim.send(
        new IS_SMALL({
          SubT: smallType,
          UVal: uVal,
        }),
      );
    }
  }
}
