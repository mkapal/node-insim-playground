import type { InSim } from "node-insim";
import type { SendableStateFlags } from "node-insim/packets";
import {
  ButtonStyle,
  ButtonTextColour,
  IS_SFP,
  StateFlags,
} from "node-insim/packets";

import { drawButton } from "../../../ui";
import { getPacketLabel } from "../../../utils";
import { BUTTON_HEIGHT, SENDABLE_STATES, TOP_OFFSET } from "../constants";

export function drawStateFlagsPackPacketButton(inSim: InSim, row: number) {
  let stateFlags: SendableStateFlags = SENDABLE_STATES[0];
  let offOn: 0 | 1 = 0;

  drawButton(inSim, {
    Text: getPacketLabel(IS_SFP),
    ReqI: 1,
    L: 97,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 15,
    H: BUTTON_HEIGHT,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonTextColour.UNSELECTED_TEXT |
      ButtonStyle.ISB_CLICK,
    onClick: ({ inSim }) => {
      inSim.send(
        new IS_SFP({
          Flag: stateFlags,
          OffOn: offOn,
        }),
      );
    },
  });

  drawButton(inSim, {
    ReqI: 1,
    Text: "Flag:",
    L: 112,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 10,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_LEFT | ButtonTextColour.UNSELECTED_TEXT,
  });

  drawButton(inSim, {
    Text: `[${StateFlags[stateFlags]}]`,
    ReqI: 1,
    L: 117,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 20,
    H: BUTTON_HEIGHT,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonStyle.ISB_CLICK |
      ButtonTextColour.UNSELECTED_TEXT,
    onClick: ({ button }) => {
      const identifierId = SENDABLE_STATES.findIndex(
        (identifier) => identifier === stateFlags,
      );

      stateFlags =
        stateFlags === SENDABLE_STATES[SENDABLE_STATES.length - 1]
          ? SENDABLE_STATES[0]
          : SENDABLE_STATES[identifierId + 1];

      button.update({
        ReqI: 1,
        Text: `[${StateFlags[stateFlags]}]`,
      });
    },
  });

  drawButton(inSim, {
    ReqI: 1,
    Text: "OffOn:",
    L: 138,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 10,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_LEFT | ButtonTextColour.UNSELECTED_TEXT,
  });

  drawButton(inSim, {
    Text: offOn ? "1" : "0",
    ReqI: 1,
    L: 144,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 3,
    H: BUTTON_HEIGHT,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonStyle.ISB_CLICK |
      (offOn
        ? ButtonTextColour.SELECTED_TEXT
        : ButtonTextColour.UNSELECTED_TEXT),
    onClick: ({ button }) => {
      offOn = offOn ? 0 : 1;
      button.update({
        ReqI: 1,
        Text: offOn ? "1" : "0",
        L: 144,
        T: TOP_OFFSET + BUTTON_HEIGHT * row,
        W: 3,
        H: BUTTON_HEIGHT,
        BStyle:
          ButtonStyle.ISB_LIGHT |
          ButtonStyle.ISB_CLICK |
          (offOn
            ? ButtonTextColour.SELECTED_TEXT
            : ButtonTextColour.UNSELECTED_TEXT),
      });
    },
  });
}
