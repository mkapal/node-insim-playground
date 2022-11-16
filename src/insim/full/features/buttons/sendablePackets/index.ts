import { ButtonTextColour, IS_Y_MIN } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { drawButton } from '../../../ui';
import { BUTTON_HEIGHT } from '../constants';
import { drawCameraPositionPacketButtons } from './cameraPositionPacketButtons';
import { drawMessageExtendedPacketButton } from './messageExtendedPacketButton';
import { drawMessageToConnectionPacketButtons } from './messageToConnectionPacketButtons';
import { drawMessageTypePacketButton } from './messageTypePacketutton';
import { drawReorderPacketButton } from './reorderPacketutton';
import { drawScreenModePacketButtons } from './screenModePacketButtons';
import { drawSimplifiedCameraPacketButtons } from './simplifiedCameraPacketButtons';
import { drawSingleCharacterPacketButtons } from './singleCharacterPacketButtons';

export function drawSendablePacketButtons(inSim: InSim) {
  drawButton(inSim, {
    Text: 'Sendable packets',
    ReqI: 1,
    L: 97,
    T: IS_Y_MIN,
    W: 15,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.TitleColour,
  });

  drawSingleCharacterPacketButtons(inSim, 1);
  drawSimplifiedCameraPacketButtons(inSim, 2);
  drawCameraPositionPacketButtons(inSim, 3);
  drawMessageTypePacketButton(inSim, 5);
  drawMessageToConnectionPacketButtons(inSim, 6);
  drawScreenModePacketButtons(inSim, 7);
  drawReorderPacketButton(inSim, 8);
  drawMessageExtendedPacketButton(inSim, 9);
}
