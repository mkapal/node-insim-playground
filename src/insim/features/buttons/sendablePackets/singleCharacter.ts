import type { InSim } from "node-insim";
import {
  ButtonStyle,
  ButtonTextColour,
  CharacterModifiers,
  IS_SCH,
} from "node-insim/packets";

import { buttonTextWithCaption, drawButton } from "../../../ui";
import type { ButtonData } from "../../../ui/button";
import { getPacketLabel, toggleFlag } from "../../../utils";
import { BUTTON_HEIGHT, TOP_OFFSET } from "../constants";

export function drawSingleCharacterPacketButtons(inSim: InSim, row: number) {
  let buttonFlags: CharacterModifiers | 0 = 0;

  const isShiftEnabled = (flags: CharacterModifiers | 0) =>
    Boolean(flags & CharacterModifiers.SHIFT);
  const isCtrlEnabled = (flags: CharacterModifiers | 0) =>
    Boolean(flags & CharacterModifiers.CTRL);

  drawButton(inSim, {
    Text: buttonTextWithCaption(
      "Enter a character to send",
      getPacketLabel(IS_SCH, true),
    ),
    ReqI: 1,
    L: 97,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 15,
    H: BUTTON_HEIGHT,
    TypeIn: 1,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonTextColour.UNSELECTED_TEXT |
      ButtonStyle.ISB_CLICK,
    onType: ({ packet, inSim }) => {
      inSim.send(
        new IS_SCH({
          CharB: packet.Text.charCodeAt(0),
          Flags: buttonFlags,
        }),
      );
    },
  });

  drawButton(inSim, {
    Text: "Flags:",
    ReqI: 1,
    L: 112,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 7,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_LEFT | ButtonTextColour.UNSELECTED_TEXT,
  });

  drawButton(inSim, {
    ...getShiftButtonData(isShiftEnabled(buttonFlags)),
    onClick: ({ button }) => {
      buttonFlags = toggleFlag(buttonFlags, CharacterModifiers.SHIFT);
      button.update(getShiftButtonData(isShiftEnabled(buttonFlags)));
    },
  });
  drawButton(inSim, {
    ...getCtrlButtonData(isCtrlEnabled(buttonFlags)),
    onClick: ({ button }) => {
      buttonFlags = toggleFlag(buttonFlags, CharacterModifiers.CTRL);
      button.update(getCtrlButtonData(isCtrlEnabled(buttonFlags)));
    },
  });

  function getShiftButtonData(isEnabled: boolean): ButtonData {
    return {
      Text: "SHIFT",
      ReqI: 1,
      L: 118,
      T: TOP_OFFSET + BUTTON_HEIGHT * row,
      W: 5,
      H: BUTTON_HEIGHT,
      BStyle:
        ButtonStyle.ISB_LIGHT |
        ButtonStyle.ISB_CLICK |
        (isEnabled
          ? ButtonTextColour.SELECTED_TEXT
          : ButtonTextColour.UNSELECTED_TEXT),
    };
  }

  function getCtrlButtonData(isEnabled: boolean): ButtonData {
    return {
      Text: "CTRL",
      ReqI: 1,
      L: 123,
      T: TOP_OFFSET + BUTTON_HEIGHT * row,
      W: 5,
      H: BUTTON_HEIGHT,
      BStyle:
        ButtonStyle.ISB_LIGHT |
        ButtonStyle.ISB_CLICK |
        (isEnabled
          ? ButtonTextColour.SELECTED_TEXT
          : ButtonTextColour.UNSELECTED_TEXT),
    };
  }
}
