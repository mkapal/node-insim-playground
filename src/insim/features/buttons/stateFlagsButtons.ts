import type { InSim } from "node-insim";
import type { SendableStateFlags } from "node-insim/packets";
import {
  ButtonStyle,
  ButtonTextColour,
  IS_SFP,
  IS_TINY,
  PacketType,
  StateFlags,
  TinyType,
} from "node-insim/packets";

import { drawButtonList } from "../../ui";
import type { Button } from "../../ui/buttonList";
import { getStringEnumValues } from "../../utils";
import { BUTTON_HEIGHT, LEFT_OFFSET, TOP_OFFSET } from "./constants";

const stateFlagEnumValues = getStringEnumValues(StateFlags);

export function drawStateFlagsButtons(inSim: InSim) {
  inSim.send(
    new IS_TINY({
      ReqI: 1,
      SubT: TinyType.TINY_SST,
    }),
  );

  const buttons: Button[] = stateFlagEnumValues.map((stateFlag) => {
    const stateNumber = StateFlags[stateFlag];

    return {
      Text: `${stateFlag} (${stateNumber})`,
      BStyle: ButtonStyle.ISB_LIGHT | ButtonTextColour.UNSELECTED_TEXT,
    };
  });

  const { update: updateStateFlagButtons } = drawButtonList(inSim, {
    title: "State flags",
    leftOffset: LEFT_OFFSET + 25,
    topOffset: TOP_OFFSET,
    width: 22,
    height: BUTTON_HEIGHT,
    buttons,
  });

  inSim.on(PacketType.ISP_STA, (packet) => {
    const valueButtons: Button[] = stateFlagEnumValues.map((stateFlag) => {
      const stateNumber = StateFlags[stateFlag];
      const isOn = packet.Flags & stateNumber;
      const isSendable = isSendableState(stateNumber);

      const onClick = isSendable
        ? () => {
            inSim.send(
              new IS_SFP({
                Flag: stateNumber,
                OffOn: isOn ? 0 : 1,
              }),
            );
          }
        : undefined;

      return {
        Text: `${stateFlag} (${stateNumber})`,
        BStyle:
          ButtonStyle.ISB_LIGHT |
          (isOn
            ? ButtonTextColour.SELECTED_TEXT
            : ButtonTextColour.UNSELECTED_TEXT) |
          (isSendable ? ButtonStyle.ISB_CLICK : ButtonStyle.ISB_LIGHT),
        onClick,
      };
    });

    updateStateFlagButtons(valueButtons);
  });
}

function isSendableState(
  stateFlag: StateFlags,
): stateFlag is SendableStateFlags {
  const sendableStates: SendableStateFlags[] = [
    StateFlags.ISS_SHIFTU_NO_OPT,
    StateFlags.ISS_MPSPEEDUP,
    StateFlags.ISS_SOUND_MUTE,
    StateFlags.ISS_SHOW_2D,
  ];

  return sendableStates.includes(stateFlag as SendableStateFlags);
}
