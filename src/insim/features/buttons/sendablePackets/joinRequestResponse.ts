import type { InSim } from "node-insim";
import type { ObjectIndex } from "node-insim/packets";
import {
  ButtonStyle,
  ButtonTextColour,
  IS_JRR,
  JRRAction,
  ObjectInfo,
  TypeIn,
} from "node-insim/packets";

import {
  buttonNumberTextWithCaption,
  buttonTextWithCaption,
  drawButton,
} from "../../../ui";
import type { ButtonData } from "../../../ui/button";
import { getPacketLabel } from "../../../utils";
import { BUTTON_HEIGHT, TOP_OFFSET } from "../constants";

export function drawJoinRequestResponsePacketButton(inSim: InSim, row: number) {
  let UCID = 0,
    PLID = 0,
    x = 0,
    y = 0,
    z = 0,
    heading = 0,
    flags = 0,
    index: ObjectIndex = 0;
  let action: JRRAction = JRRAction.JRR_REJECT;

  drawButton(inSim, {
    Text: getPacketLabel(IS_JRR),
    ReqI: 1,
    L: 97,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 15,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_DARK | ButtonStyle.ISB_CLICK,
    onClick: ({ inSim }) => {
      inSim.send(
        new IS_JRR({
          UCID,
          PLID,
          JRRAction: action,
          StartPos: new ObjectInfo({
            X: x,
            Y: y,
            Zbyte: z,
            Heading: heading,
            Flags: flags,
            Index: index,
          }),
        }),
      );
    },
  });

  drawButton(inSim, {
    Text: "UCID:",
    ReqI: 1,
    L: 112,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 12,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.UNSELECTED_TEXT | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: buttonTextWithCaption("UCID", UCID.toString(10)),
    ReqI: 1,
    L: 117,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 4,
    H: BUTTON_HEIGHT,
    TypeIn: 3 + TypeIn.INIT_VALUE_BUTTON_TEXT,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonStyle.ISB_CLICK |
      ButtonTextColour.TEXT_STRING,
    onType: ({ packet, button }) => {
      const parsedNumber = parseInt(packet.Text, 10);

      if (isNaN(parsedNumber)) {
        return;
      }

      UCID = parsedNumber;
      button.update({
        ReqI: 1,
        Text: buttonTextWithCaption("UCID", UCID.toString(10)),
      });
    },
  });

  drawButton(inSim, {
    Text: "PLID:",
    ReqI: 1,
    L: 121,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 12,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.UNSELECTED_TEXT | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ...inputButtonProps(11, row),
    Text: buttonTextWithCaption("PLID", PLID.toString(10)),
    L: 126,
    W: 4,
    onType: ({ packet, button }) => {
      const parsedNumber = parseInt(packet.Text, 10);

      if (isNaN(parsedNumber)) {
        return;
      }

      PLID = parsedNumber;
      button.update({
        ReqI: 1,
        Text: buttonTextWithCaption("PLID", PLID.toString(10)),
      });
    },
  });

  drawButton(inSim, {
    Text: "JRRAction:",
    ReqI: 1,
    L: 131,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 12,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.UNSELECTED_TEXT | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: `[${JRRAction[action]}]`,
    ReqI: 1,
    L: 140,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 19,
    H: BUTTON_HEIGHT,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonStyle.ISB_CLICK |
      ButtonTextColour.UNSELECTED_TEXT,
    onClick: ({ button }) => {
      const viewIdentifierIds = Object.keys(JRRAction).filter(
        (key) => !isNaN(Number(JRRAction[key as unknown as number])),
      );
      const identifierId = viewIdentifierIds.findIndex(
        (identifier) => identifier === JRRAction[action],
      );

      action =
        identifierId === viewIdentifierIds.length - 1 ? 0 : identifierId + 1;

      button.update({
        ReqI: 1,
        Text: `[${JRRAction[action]}]`,
      });
    },
  });

  // StartPos

  drawButton(inSim, {
    Text: "X:",
    ReqI: 1,
    L: 159,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 5,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.UNSELECTED_TEXT | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ...inputButtonProps(6, row),
    Text: buttonNumberTextWithCaption("X coordinate (1 m = 16)", x),
    L: 162,
    W: 6,
    onType: ({ packet, button }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (x = parsedValue);

      button.update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption("X coordinate (1 m = 16)", x),
      });
    },
  });

  drawButton(inSim, {
    Text: "Y:",
    ReqI: 1,
    L: 168,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 5,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.UNSELECTED_TEXT | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ...inputButtonProps(6, row),
    L: 171,
    W: 6,
    Text: buttonNumberTextWithCaption("Y coordinate (1 m = 16)", y),
    onType: ({ packet, button }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (y = parsedValue);

      button.update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption("Y coordinate (1 m = 16)", y),
      });
    },
  });

  drawButton(inSim, {
    Text: "Zbyte:",
    ReqI: 1,
    L: 177,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 6,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.UNSELECTED_TEXT | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ...inputButtonProps(6, row),
    L: 183,
    W: 6,
    Text: buttonNumberTextWithCaption("Z coordinate (1 m = 16)", z),
    onType: ({ packet, button }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (z = parsedValue);

      button.update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption("Z coordinate (1 m = 16)", z),
      });
    },
  });

  drawButton(inSim, {
    Text: "Flags:",
    ReqI: 1,
    L: 159,
    T: TOP_OFFSET + BUTTON_HEIGHT * (row + 1),
    W: 10,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.UNSELECTED_TEXT | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ...inputButtonProps(3, row + 1),
    L: 165,
    W: 4,
    Text: buttonNumberTextWithCaption("Flags", flags),
    onType: ({ packet, button }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (flags = parsedValue);

      button.update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption("Flags", flags),
      });
    },
  });

  drawButton(inSim, {
    Text: "Index:",
    ReqI: 1,
    L: 169,
    T: TOP_OFFSET + BUTTON_HEIGHT * (row + 1),
    W: 10,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.UNSELECTED_TEXT | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ...inputButtonProps(3, row + 1),
    L: 175,
    W: 4,
    Text: buttonNumberTextWithCaption("Index", index),
    onType: ({ packet, button }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (index = parsedValue);

      button.update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption("Index", index),
      });
    },
  });

  drawButton(inSim, {
    Text: "Heading:",
    ReqI: 1,
    L: 180,
    T: TOP_OFFSET + BUTTON_HEIGHT * (row + 1),
    W: 10,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.UNSELECTED_TEXT | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ...inputButtonProps(6, row + 1),
    L: 188,
    W: 5,
    Text: buttonNumberTextWithCaption("Heading", heading),
    onType: ({ packet, button }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (heading = parsedValue);

      button.update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption("Heading", heading),
      });
    },
  });
}

const buttonProps = (row: number): ButtonData => ({
  ReqI: 1,
  T: TOP_OFFSET + BUTTON_HEIGHT * row,
  H: BUTTON_HEIGHT,
  BStyle:
    ButtonStyle.ISB_LIGHT |
    ButtonTextColour.UNSELECTED_TEXT |
    ButtonStyle.ISB_CLICK,
});

const inputButtonProps = (typeIn: number, row: number): ButtonData => ({
  ...buttonProps(row),
  TypeIn: typeIn + TypeIn.INIT_VALUE_BUTTON_TEXT,
  BStyle:
    ButtonStyle.ISB_LIGHT |
    ButtonTextColour.TEXT_STRING |
    ButtonStyle.ISB_CLICK,
});
