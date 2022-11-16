import {
  ButtonStyle,
  ButtonTextColour,
  IS_RIP,
  IS_Y_MIN,
  ReplayMode,
  ReplayOptions,
  TypeIn,
} from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { buttonTextWithCaption, drawButton } from '../../../ui';
import type { ButtonData } from '../../../ui/button';
import { getPacketLabel, toggleFlag } from '../../../utils';
import { BUTTON_HEIGHT } from '../constants';

export function drawReplayInfoPacketButton(inSim: InSim, row: number) {
  let reqI = 1,
    mpr = 1,
    paused = 0,
    options: ReplayOptions = 0,
    cTime = 0;

  const isLoopEnabled = (flags: ReplayOptions) =>
    Boolean(flags & ReplayOptions.RIPOPT_LOOP);
  const isSkinsEnabled = (flags: ReplayOptions) =>
    Boolean(flags & ReplayOptions.RIPOPT_SKINS);
  const isPhysicsEnabled = (flags: ReplayOptions) =>
    Boolean(flags & ReplayOptions.RIPOPT_FULL_PHYS);

  drawButton(inSim, {
    Text: buttonTextWithCaption('Replay name', getPacketLabel(IS_RIP, true)),
    ReqI: 1,
    L: 97,
    T: IS_Y_MIN + BUTTON_HEIGHT * row,
    W: 15,
    H: BUTTON_HEIGHT,
    TypeIn: 95,
    BStyle: ButtonStyle.ISB_DARK | ButtonStyle.ISB_CLICK,
    onType: ({ inSim, packet }) => {
      inSim.send(
        new IS_RIP({
          ReqI: reqI,
          MPR: mpr,
          Paused: paused,
          Options: options,
          CTime: cTime,
          RName: packet.Text,
        }),
      );
    },
  });

  drawButton(inSim, {
    Text: 'ReqI:',
    ReqI: 1,
    L: 112,
    T: IS_Y_MIN + BUTTON_HEIGHT * row,
    W: 10,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: buttonTextWithCaption('ReqI', reqI.toString(10)),
    ReqI: 1,
    L: 117,
    T: IS_Y_MIN + BUTTON_HEIGHT * row,
    W: 3,
    H: BUTTON_HEIGHT,
    TypeIn: 3 + TypeIn.INIT_VALUE_BUTTON_TEXT,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonStyle.ISB_CLICK |
      ButtonTextColour.TextString,
    onType: ({ packet, button }) => {
      const parsedNumber = parseInt(packet.Text, 10);

      if (isNaN(parsedNumber)) {
        return;
      }

      reqI = parsedNumber;
      button.update({
        ReqI: 1,
        Text: buttonTextWithCaption('ReqI', reqI.toString(10)),
      });
    },
  });

  drawButton(inSim, {
    Text: 'MPR:',
    ReqI: 1,
    L: 120,
    T: IS_Y_MIN + BUTTON_HEIGHT * row,
    W: 12,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: `[${ReplayMode[mpr]}]`,
    ReqI: 1,
    L: 125,
    T: IS_Y_MIN + BUTTON_HEIGHT * row,
    W: 6,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_LIGHT | ButtonStyle.ISB_CLICK | ButtonStyle.ISB_C2,
    onClick: ({ button }) => {
      const ids = Object.keys(ReplayMode).filter(
        (key) => !isNaN(Number(ReplayMode[key as unknown as number])),
      );
      const foundId = ids.findIndex((id) => id === ReplayMode[mpr]);

      mpr = foundId === ids.length - 1 ? 0 : foundId + 1;

      button.update({
        ReqI: 1,
        Text: `[${ReplayMode[mpr]}]`,
      });
    },
  });

  drawButton(inSim, {
    Text: 'Paused:',
    ReqI: 1,
    L: 132,
    T: IS_Y_MIN + BUTTON_HEIGHT * row,
    W: 12,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: buttonTextWithCaption('Paused', paused.toString(10)),
    ReqI: 1,
    L: 139,
    T: IS_Y_MIN + BUTTON_HEIGHT * row,
    W: 3,
    H: BUTTON_HEIGHT,
    TypeIn: 3 + TypeIn.INIT_VALUE_BUTTON_TEXT,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonStyle.ISB_CLICK |
      ButtonTextColour.TextString,
    onType: ({ packet, button }) => {
      const parsedNumber = parseInt(packet.Text, 10);

      if (isNaN(parsedNumber)) {
        return;
      }

      paused = parsedNumber;
      button.update({
        ReqI: 1,
        Text: buttonTextWithCaption('Paused', paused.toString(10)),
      });
    },
  });

  drawButton(inSim, {
    ...getLoopButtonData(isLoopEnabled(options)),
    onClick: ({ button }) => {
      options = toggleFlag(options, ReplayOptions.RIPOPT_LOOP);
      button.update(getLoopButtonData(isLoopEnabled(options)));
    },
  });
  drawButton(inSim, {
    ...getSkinsButtonData(isSkinsEnabled(options)),
    onClick: ({ button }) => {
      options = toggleFlag(options, ReplayOptions.RIPOPT_SKINS);
      button.update(getSkinsButtonData(isSkinsEnabled(options)));
    },
  });
  drawButton(inSim, {
    ...getPhysicsButtonData(isPhysicsEnabled(options)),
    onClick: ({ button }) => {
      options = toggleFlag(options, ReplayOptions.RIPOPT_FULL_PHYS);
      button.update(getPhysicsButtonData(isPhysicsEnabled(options)));
    },
  });

  function getLoopButtonData(isEnabled: boolean): ButtonData {
    return {
      Text: 'RIPOPT_LOOP',
      ReqI: 1,
      L: 143,
      T: IS_Y_MIN + BUTTON_HEIGHT * row,
      W: 11,
      H: BUTTON_HEIGHT,
      BStyle:
        ButtonStyle.ISB_LIGHT |
        ButtonStyle.ISB_CLICK |
        (isEnabled ? ButtonTextColour.SelectedText : ButtonStyle.ISB_C2),
    };
  }

  function getSkinsButtonData(isEnabled: boolean): ButtonData {
    return {
      Text: 'RIPOPT_SKINS',
      ReqI: 1,
      L: 154,
      T: IS_Y_MIN + BUTTON_HEIGHT * row,
      W: 12,
      H: BUTTON_HEIGHT,
      BStyle:
        ButtonStyle.ISB_LIGHT |
        ButtonStyle.ISB_CLICK |
        (isEnabled ? ButtonTextColour.SelectedText : ButtonStyle.ISB_C2),
    };
  }

  function getPhysicsButtonData(isEnabled: boolean): ButtonData {
    return {
      Text: 'RIPOPT_FULL_PHYS',
      ReqI: 1,
      L: 166,
      T: IS_Y_MIN + BUTTON_HEIGHT * row,
      W: 15,
      H: BUTTON_HEIGHT,
      BStyle:
        ButtonStyle.ISB_LIGHT |
        ButtonStyle.ISB_CLICK |
        (isEnabled ? ButtonTextColour.SelectedText : ButtonStyle.ISB_C2),
    };
  }

  drawButton(inSim, {
    Text: 'CTime:',
    ReqI: 1,
    L: 182,
    T: IS_Y_MIN + BUTTON_HEIGHT * row,
    W: 12,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: buttonTextWithCaption('CTime', cTime.toString(10)),
    ReqI: 1,
    L: 188,
    T: IS_Y_MIN + BUTTON_HEIGHT * row,
    W: 6,
    H: BUTTON_HEIGHT,
    TypeIn: 10 + TypeIn.INIT_VALUE_BUTTON_TEXT,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonStyle.ISB_CLICK |
      ButtonTextColour.TextString,
    onType: ({ packet, button }) => {
      const parsedNumber = parseInt(packet.Text, 10);

      if (isNaN(parsedNumber)) {
        return;
      }

      cTime = parsedNumber;
      button.update({
        ReqI: 1,
        Text: buttonTextWithCaption('CTime', cTime.toString(10)),
      });
    },
  });
}
