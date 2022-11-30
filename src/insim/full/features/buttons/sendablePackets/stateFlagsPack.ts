import type { SendableStateFlags } from 'node-insim/packets';
import {
  ButtonStyle,
  ButtonTextColour,
  IS_SFP,
  StateFlags,
} from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { drawButton } from '../../../ui';
import type { ButtonData } from '../../../ui/button';
import { getPacketLabel, toggleFlag } from '../../../utils';
import { BUTTON_HEIGHT, TOP_OFFSET } from '../constants';

export function drawStateFlagsPackPacketButton(inSim: InSim, row: number) {
  let stateFlags: SendableStateFlags = 0;
  let offOn: 0 | 1 = 0;

  drawButton(inSim, {
    Text: getPacketLabel(IS_SFP),
    ReqI: 1,
    L: 97,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 15,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_DARK | ButtonStyle.ISB_CLICK,
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
    Text: 'Flag:',
    L: 112,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 10,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_LEFT | ButtonTextColour.UNSELECTED_TEXT,
  });

  const muteFlagButtonData = (isEnabled: boolean): ButtonData => ({
    ...getFlagsButtonData(Boolean(isEnabled)),
    Text: 'ISS_SOUND_MUTE',
    L: 165,
    W: 16,
  });

  const multiplayerSpeedupButtonData = (isEnabled: boolean): ButtonData => ({
    ...getFlagsButtonData(Boolean(isEnabled)),
    Text: 'ISS_MPSPEEDUP',
    L: 149,
    W: 16,
  });

  const shiftUNoOptButtonData = (isEnabled: boolean): ButtonData => ({
    ...getFlagsButtonData(Boolean(isEnabled)),
    Text: 'ISS_SHIFTU_NO_OPT',
    L: 117,
    W: 16,
  });

  const show2dButtonData = (isEnabled: boolean): ButtonData => ({
    ...getFlagsButtonData(Boolean(isEnabled)),
    Text: 'ISS_SHOW_2D',
    L: 133,
    W: 16,
  });

  drawButton(inSim, {
    ...shiftUNoOptButtonData(
      Boolean(stateFlags & StateFlags.ISS_SHIFTU_NO_OPT),
    ),
    onClick: ({ button }) => {
      stateFlags = toggleFlag(stateFlags, StateFlags.ISS_SHIFTU_NO_OPT);
      button.update(
        shiftUNoOptButtonData(
          Boolean(stateFlags & StateFlags.ISS_SHIFTU_NO_OPT),
        ),
      );
    },
  });

  drawButton(inSim, {
    ...show2dButtonData(Boolean(stateFlags & StateFlags.ISS_SHOW_2D)),
    onClick: ({ button }) => {
      stateFlags = toggleFlag(stateFlags, StateFlags.ISS_SHOW_2D);
      button.update(
        show2dButtonData(Boolean(stateFlags & StateFlags.ISS_SHOW_2D)),
      );
    },
  });

  drawButton(inSim, {
    ...multiplayerSpeedupButtonData(
      Boolean(stateFlags & StateFlags.ISS_MPSPEEDUP),
    ),
    onClick: ({ button }) => {
      stateFlags = toggleFlag(stateFlags, StateFlags.ISS_MPSPEEDUP);
      button.update(
        multiplayerSpeedupButtonData(
          Boolean(stateFlags & StateFlags.ISS_MPSPEEDUP),
        ),
      );
    },
  });

  drawButton(inSim, {
    ...muteFlagButtonData(Boolean(stateFlags & StateFlags.ISS_SOUND_MUTE)),
    onClick: ({ button }) => {
      stateFlags = toggleFlag(stateFlags, StateFlags.ISS_SOUND_MUTE);
      button.update(
        muteFlagButtonData(Boolean(stateFlags & StateFlags.ISS_SOUND_MUTE)),
      );
    },
  });

  drawButton(inSim, {
    ReqI: 1,
    Text: 'OffOn:',
    L: 181,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 10,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_LEFT | ButtonTextColour.UNSELECTED_TEXT,
  });

  drawButton(inSim, {
    Text: offOn ? '1' : '0',
    ReqI: 1,
    L: 187,
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
        Text: offOn ? '1' : '0',
        L: 187,
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

  function getFlagsButtonData(isEnabled: boolean): ButtonData {
    return {
      ReqI: 1,
      T: TOP_OFFSET + BUTTON_HEIGHT * row,
      W: 12,
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
