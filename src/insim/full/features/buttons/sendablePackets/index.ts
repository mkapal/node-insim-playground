import { ButtonTextColour } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { drawButton } from '../../../ui';
import { BUTTON_HEIGHT, TOP_OFFSET } from '../constants';
import { drawButtonFunctionPacketButton } from './buttonFunction';
import { drawCameraPositionPacketButtons } from './cameraPosition';
import { drawMessageExtendedPacketButton } from './messageExtended';
import { drawMessageLocalPacketButton } from './messageLocal';
import { drawMessageToConnectionPacketButtons } from './messageToConnection';
import { drawMessageTypePacketButton } from './messageType';
import { drawReorderPacketButton } from './reorder';
import { drawReplayInfoPacketButton } from './replayInfo';
import { drawScreenModePacketButtons } from './screenMode';
import { drawSendScreenshotPacketButton } from './sendScreenshot';
import { drawSimplifiedCameraPacketButtons } from './simplifiedCamera';
import { drawSingleCharacterPacketButtons } from './singleCharacter';

export function drawSendablePacketButtons(inSim: InSim) {
  drawButton(inSim, {
    Text: 'Sendable packets',
    ReqI: 1,
    L: 97,
    T: TOP_OFFSET,
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
  drawMessageLocalPacketButton(inSim, 10);
  drawButtonFunctionPacketButton(inSim, 11);
  drawReplayInfoPacketButton(inSim, 12);
  drawSendScreenshotPacketButton(inSim, 13);
}
