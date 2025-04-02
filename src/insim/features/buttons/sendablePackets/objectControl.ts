import type { InSim } from "node-insim";
import type {
  OCOAutocrossStartLights,
  OCOMainLights,
} from "node-insim/packets";
import {
  ButtonStyle,
  ButtonTextColour,
  IS_OCO,
  ObjectIndex,
  OCOAction,
  TypeIn,
} from "node-insim/packets";

import { buttonTextWithCaption, drawButton } from "../../../ui";
import type { ButtonData } from "../../../ui/button";
import { getPacketLabel } from "../../../utils";
import { BUTTON_HEIGHT, TOP_OFFSET } from "../constants";

export function drawObjectControlPacketButton(inSim: InSim, row: number) {
  let action = OCOAction.OCO_ZERO,
    index = ObjectIndex.AXO_START_LIGHTS,
    identifier = 0,
    data: OCOMainLights | OCOAutocrossStartLights = 0;

  drawButton(inSim, {
    Text: getPacketLabel(IS_OCO),
    ReqI: 1,
    L: 97,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 15,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_DARK | ButtonStyle.ISB_CLICK,
    onClick: ({ inSim }) => {
      inSim.send(
        new IS_OCO({
          OCOAction: action,
          Index: index,
          Identifier: identifier,
          Data: data,
        }),
      );
    },
  });

  drawButton(inSim, {
    ...buttonProps(row),
    Text: "OCOAction:",
    L: 112,
    W: 12,
    BStyle: ButtonTextColour.UNSELECTED_TEXT | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: `[${OCOAction[action]}]`,
    ReqI: 1,
    L: 122,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 19,
    H: BUTTON_HEIGHT,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonStyle.ISB_CLICK |
      ButtonTextColour.UNSELECTED_TEXT,
    onClick: ({ button }) => {
      const ids = Object.keys(OCOAction).filter(
        (key) => !isNaN(Number(OCOAction[key as unknown as number])),
      );
      const id = ids.findIndex(
        (identifier) => identifier === OCOAction[action],
      );

      action = id === ids.length - 1 ? 0 : id + 1;

      button.update({
        ReqI: 1,
        Text: `[${OCOAction[action]}]`,
      });
    },
  });

  drawButton(inSim, {
    ...buttonProps(row),
    Text: "Index:",
    L: 142,
    W: 12,
    BStyle: ButtonTextColour.UNSELECTED_TEXT | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ...inputButtonProps(3, row),
    Text: buttonTextWithCaption("Index", index.toString(10)),
    L: 148,
    W: 4,
    onType: ({ packet, button }) => {
      const parsedNumber = parseInt(packet.Text, 10);

      if (isNaN(parsedNumber)) {
        return;
      }

      index = parsedNumber;
      button.update({
        ReqI: 1,
        Text: buttonTextWithCaption("Index", index.toString(10)),
      });
    },
  });

  drawButton(inSim, {
    ...buttonProps(row),
    Text: "Identifier:",
    L: 153,
    W: 11,
    BStyle: ButtonTextColour.UNSELECTED_TEXT | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ...inputButtonProps(3, row),
    Text: buttonTextWithCaption("Identifier", identifier.toString(10)),
    L: 162,
    W: 4,
    onType: ({ packet, button }) => {
      const parsedNumber = parseInt(packet.Text, 10);

      if (isNaN(parsedNumber)) {
        return;
      }

      identifier = parsedNumber;
      button.update({
        ReqI: 1,
        Text: buttonTextWithCaption("Identifier", identifier.toString(10)),
      });
    },
  });

  drawButton(inSim, {
    ...buttonProps(row),
    Text: "Data:",
    L: 167,
    W: 11,
    BStyle: ButtonTextColour.UNSELECTED_TEXT | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ...inputButtonProps(3, row),
    Text: buttonTextWithCaption("Data", data.toString(10)),
    L: 172,
    W: 4,
    onType: ({ packet, button }) => {
      const parsedNumber = parseInt(packet.Text, 10);

      if (isNaN(parsedNumber)) {
        return;
      }

      data = parsedNumber;
      button.update({
        ReqI: 1,
        Text: buttonTextWithCaption("Data", data.toString(10)),
      });
    },
  });
}

const buttonProps = (row: number): ButtonData => ({
  ReqI: 1,
  T: TOP_OFFSET + BUTTON_HEIGHT * row,
  H: BUTTON_HEIGHT,
});

const inputButtonProps = (typeIn: number, row: number): ButtonData => ({
  ...buttonProps(row),
  TypeIn: typeIn + TypeIn.INIT_VALUE_BUTTON_TEXT,
  BStyle:
    ButtonStyle.ISB_LIGHT |
    ButtonTextColour.TEXT_STRING |
    ButtonStyle.ISB_CLICK,
});
