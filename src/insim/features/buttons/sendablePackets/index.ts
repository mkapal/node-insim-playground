import type { InSim } from "node-insim";
import { ButtonTextColour } from "node-insim/packets";

import { drawButton } from "../../../ui";
import { BUTTON_HEIGHT, LEFT_OFFSET, TOP_OFFSET } from "../constants";
import { drawButtonFunctionPacketButton } from "./buttonFunction";
import { drawCameraPositionPacketButtons } from "./cameraPosition";
import { drawIsMtcPacketButtons } from "./IS_MTC";
import { drawJoinRequestResponsePacketButton } from "./joinRequestResponse";
import { drawMessageExtendedPacketButton } from "./messageExtended";
import { drawMessageLocalPacketButton } from "./messageLocal";
import { drawMessageTypePacketButton } from "./messageType";
import { drawModsAllowedPacketButton } from "./modsAllowed";
import { drawObjectControlPacketButton } from "./objectControl";
import { drawReorderPacketButton } from "./reorder";
import { drawReplayInfoPacketButton } from "./replayInfo";
import { drawScreenModePacketButtons } from "./screenMode";
import { drawLocalMessageButtons } from "./sendLocalMessage";
import { drawMessageButtons } from "./sendMessage";
import { drawMessageToConnectionButtons } from "./sendMessageToConnection";
import { drawMessageToPlayerButtons } from "./sendMessageToPlayer";
import { drawSendScreenshotPacketButton } from "./sendScreenshot";
import { drawSimplifiedCameraPacketButtons } from "./simplifiedCamera";
import { drawSingleCharacterPacketButtons } from "./singleCharacter";
import { drawStateFlagsPackPacketButton } from "./stateFlagsPack";
import { drawTargetToConnectionPacketButton } from "./targetToConnection";

export function drawSendablePacketButtons(inSim: InSim) {
  drawButton(inSim, {
    Text: "Sendable packets",
    ReqI: 1,
    L: 97,
    T: TOP_OFFSET,
    W: 15,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.TITLE_COLOUR,
  });

  drawSingleCharacterPacketButtons(inSim, 1);
  drawStateFlagsPackPacketButton(inSim, 2);
  drawSimplifiedCameraPacketButtons(inSim, 3);
  drawCameraPositionPacketButtons(inSim, 4);
  drawMessageTypePacketButton(inSim, 6);
  drawIsMtcPacketButtons(inSim, 7);
  drawScreenModePacketButtons(inSim, 8);
  drawReorderPacketButton(inSim, 9);
  drawMessageExtendedPacketButton(inSim, 10);
  drawMessageLocalPacketButton(inSim, 11);
  drawButtonFunctionPacketButton(inSim, 12);
  drawReplayInfoPacketButton(inSim, 13);
  drawSendScreenshotPacketButton(inSim, 14);
  drawJoinRequestResponsePacketButton(inSim, 16);
  drawObjectControlPacketButton(inSim, 18);
  drawTargetToConnectionPacketButton(inSim, 19);
  drawModsAllowedPacketButton(inSim, 20);

  drawButton(inSim, {
    Text: "Helper functions",
    ReqI: 1,
    L: LEFT_OFFSET,
    T: TOP_OFFSET + BUTTON_HEIGHT * 17,
    W: 15,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.TITLE_COLOUR,
  });

  drawMessageButtons(inSim, 18);
  drawLocalMessageButtons(inSim, 19);
  drawMessageToConnectionButtons(inSim, 20);
  drawMessageToPlayerButtons(inSim, 21);
}
