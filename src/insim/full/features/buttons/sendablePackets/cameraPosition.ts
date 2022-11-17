import type { AllowedStateFlags } from 'node-insim/packets';
import {
  ButtonStyle,
  ButtonTextColour,
  IS_CPP,
  TypeIn,
  ViewIdentifier,
} from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { buttonTextWithCaption, drawButton } from '../../../ui';
import type { ButtonData } from '../../../ui/button';
import { getPacketLabel } from '../../../utils';
import { BUTTON_HEIGHT, TOP_OFFSET, VIEW_IDENTIFIERS } from '../constants';

export function drawCameraPositionPacketButtons(inSim: InSim, row: number) {
  let x = 0,
    y = 0,
    z = 0,
    heading = 0,
    pitch = 0,
    roll = 0,
    fov = 0,
    time = 0,
    viewPLID = 0;
  let inGameCam: ViewIdentifier = ViewIdentifier.VIEW_FOLLOW;
  const flags: AllowedStateFlags = 0;

  drawButton(inSim, {
    Text: getPacketLabel(IS_CPP),
    ReqI: 1,
    L: 97,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 15,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_DARK | ButtonStyle.ISB_CLICK,
    onClick: ({ inSim }) => {
      inSim.send(
        new IS_CPP({
          X: x,
          Y: y,
          Z: z,
          H: heading,
          P: pitch,
          R: roll,
          FOV: fov,
          Flags: flags,
          InGameCam: inGameCam,
          Time: time,
          ViewPLID: viewPLID,
        }),
      );
    },
  });

  drawButton(inSim, {
    Text: 'X:',
    ReqI: 1,
    L: 112,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 5,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ...inputButtonProps(11, row),
    L: 115,
    W: 8,
    Text: buttonNumberTextWithCaption('X coordinate (1 m = 65536)', x),
    onType: ({ packet, button }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (x = parsedValue);

      button.update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('X coordinate (1 m = 65536)', x),
      });
    },
  });

  drawButton(inSim, {
    Text: 'Y:',
    ReqI: 1,
    L: 123,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 5,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ...inputButtonProps(11, row),
    L: 126,
    W: 8,
    Text: buttonNumberTextWithCaption('Y coordinate (1 m = 65536)', y),
    onType: ({ packet, button }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (y = parsedValue);

      button.update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('Y coordinate (1 m = 65536)', y),
      });
    },
  });

  drawButton(inSim, {
    Text: 'Z:',
    ReqI: 1,
    L: 134,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 5,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ...inputButtonProps(11, row),
    L: 137,
    W: 8,
    Text: buttonNumberTextWithCaption('Z coordinate (1 m = 65536)', z),
    onType: ({ packet, button }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (z = parsedValue);

      button.update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('Z coordinate (1 m = 65536)', z),
      });
    },
  });

  drawButton(inSim, {
    Text: 'Heading:',
    ReqI: 1,
    L: 145,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 10,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ...inputButtonProps(5, row),
    L: 153,
    W: 8,
    Text: buttonNumberTextWithCaption('Heading', heading),
    onType: ({ packet, button }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (heading = parsedValue);

      button.update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('Heading', heading),
      });
    },
  });

  drawButton(inSim, {
    Text: 'Pitch:',
    ReqI: 1,
    L: 161,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 10,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ...inputButtonProps(5, row),
    L: 167,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 8,
    Text: buttonNumberTextWithCaption('Pitch', pitch),
    onType: ({ packet, button }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (pitch = parsedValue);

      button.update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('Pitch', pitch),
      });
    },
  });

  drawButton(inSim, {
    Text: 'Roll:',
    ReqI: 1,
    L: 175,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 10,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ...inputButtonProps(5, row),
    L: 180,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 8,
    Text: buttonNumberTextWithCaption('Roll', roll),
    onType: ({ packet, button }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (roll = parsedValue);

      button.update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('Roll', roll),
      });
    },
  });

  drawButton(inSim, {
    ...inputButtonProps(4, row),
    L: 117,
    T: TOP_OFFSET + BUTTON_HEIGHT * (row + 1),
    W: 8,
    Text: buttonNumberTextWithCaption('FOV (degrees)', fov),
    onType: ({ packet, button }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (fov = parsedValue);

      button.update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('FOV (degrees)', fov),
      });
    },
  });

  drawButton(inSim, {
    Text: 'FOV:',
    ReqI: 1,
    L: 112,
    T: TOP_OFFSET + BUTTON_HEIGHT * (row + 1),
    W: 10,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: 'Time:',
    ReqI: 1,
    L: 125,
    T: TOP_OFFSET + BUTTON_HEIGHT * (row + 1),
    W: 10,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ...inputButtonProps(5, row),
    L: 131,
    T: TOP_OFFSET + BUTTON_HEIGHT * (row + 1),
    W: 8,
    Text: buttonNumberTextWithCaption('Time (ms)', time),
    onType: ({ packet, button }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (time = parsedValue);

      button.update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('Time (ms)', time),
      });
    },
  });

  drawButton(inSim, {
    Text: 'ViewPLID:',
    ReqI: 1,
    L: 139,
    T: TOP_OFFSET + BUTTON_HEIGHT * (row + 1),
    W: 10,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ...inputButtonProps(3, row),
    L: 148,
    T: TOP_OFFSET + BUTTON_HEIGHT * (row + 1),
    W: 4,
    Text: buttonNumberTextWithCaption('ViewPLID', viewPLID),
    onType: ({ packet, button }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (viewPLID = parsedValue);

      button.update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('ViewPLID', viewPLID),
      });
    },
  });

  drawButton(inSim, {
    Text: 'InGameCam:',
    ReqI: 1,
    L: 152,
    T: TOP_OFFSET + BUTTON_HEIGHT * (row + 1),
    W: 11,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_C2 | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ...buttonProps(row),
    L: 163,
    T: TOP_OFFSET + BUTTON_HEIGHT * (row + 1),
    W: 10,
    Text: `[${VIEW_IDENTIFIERS[inGameCam]}]`,
    onClick: ({ button }) => {
      const viewIdentifierIds = Object.keys(VIEW_IDENTIFIERS);
      const identifierId = viewIdentifierIds.findIndex(
        (identifier) => identifier === inGameCam.toString(10),
      );

      const nextId =
        identifierId === viewIdentifierIds.length - 1
          ? viewIdentifierIds[0]
          : viewIdentifierIds[identifierId + 1];
      inGameCam = parseInt(nextId, 10);

      button.update({
        ReqI: 1,
        Text: `[${VIEW_IDENTIFIERS[inGameCam]}]`,
      });
    },
  });
}

function buttonNumberTextWithCaption(caption: string, number: number): string {
  return buttonTextWithCaption(caption, number.toString(10));
}

const buttonProps = (row: number): ButtonData => ({
  ReqI: 1,
  T: TOP_OFFSET + BUTTON_HEIGHT * row,
  H: BUTTON_HEIGHT,
  BStyle: ButtonStyle.ISB_LIGHT | ButtonStyle.ISB_C2 | ButtonStyle.ISB_CLICK,
});

const inputButtonProps = (typeIn: number, row: number): ButtonData => ({
  ...buttonProps(row),
  TypeIn: typeIn + TypeIn.INIT_VALUE_BUTTON_TEXT,
  BStyle:
    ButtonStyle.ISB_LIGHT | ButtonTextColour.TextString | ButtonStyle.ISB_CLICK,
});
