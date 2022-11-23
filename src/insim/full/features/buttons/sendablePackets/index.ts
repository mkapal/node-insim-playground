import { ButtonTextColour } from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { drawButton } from '../../../ui';
import { BUTTON_HEIGHT, TOP_OFFSET } from '../constants';
import { drawButtonFunctionPacketButton } from './buttonFunction';
import { drawCameraPositionPacketButtons } from './cameraPosition';
import { drawJoinRequestResponsePacketButton } from './joinRequestResponse';
import { drawMessageExtendedPacketButton } from './messageExtended';
import { drawMessageLocalPacketButton } from './messageLocal';
import { drawMessageToConnectionPacketButtons } from './messageToConnection';
import { drawMessageTypePacketButton } from './messageType';
import { drawObjectControlPacketButton } from './objectControl';
import { drawReorderPacketButton } from './reorder';
import { drawReplayInfoPacketButton } from './replayInfo';
import { drawScreenModePacketButtons } from './screenMode';
import { drawSendScreenshotPacketButton } from './sendScreenshot';
import { drawSimplifiedCameraPacketButtons } from './simplifiedCamera';
import { drawSingleCharacterPacketButtons } from './singleCharacter';
import { drawStateFlagsPackPacketButton } from './stateFlagsPack';
import { drawTargetToConnectionPacketButton } from './targetToConnection';

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
  drawStateFlagsPackPacketButton(inSim, 2);
  drawSimplifiedCameraPacketButtons(inSim, 3);
  drawCameraPositionPacketButtons(inSim, 4);
  drawMessageTypePacketButton(inSim, 6);
  drawMessageToConnectionPacketButtons(inSim, 7);
  drawScreenModePacketButtons(inSim, 8);
  drawReorderPacketButton(inSim, 9);
  drawMessageExtendedPacketButton(inSim, 10);
  drawMessageLocalPacketButton(inSim, 11);
  drawButtonFunctionPacketButton(inSim, 12);
  drawReplayInfoPacketButton(inSim, 13);
  drawSendScreenshotPacketButton(inSim, 14);
  // drawPlayerCarsPacketButton(inSim, 15);
  drawJoinRequestResponsePacketButton(inSim, 16);
  drawObjectControlPacketButton(inSim, 18);
  drawTargetToConnectionPacketButton(inSim, 19);
}
