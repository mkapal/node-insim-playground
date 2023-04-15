import type { InSim } from 'node-insim';
import {
  ButtonFunction,
  ButtonStyle,
  ButtonTextColour,
  IS_BFN,
  TypeIn,
} from 'node-insim/packets';

import { buttonTextWithCaption, drawButton } from '../../../ui';
import { getPacketLabel } from '../../../utils';
import { BUTTON_HEIGHT, TOP_OFFSET } from '../constants';

export function drawButtonFunctionPacketButton(inSim: InSim, row: number) {
  let UCID = 0,
    clickId = 0,
    clickMax = 0;
  let subT: ButtonFunction = ButtonFunction.BFN_DEL_BTN;

  drawButton(inSim, {
    Text: getPacketLabel(IS_BFN),
    ReqI: 1,
    L: 97,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 15,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_DARK | ButtonStyle.ISB_CLICK,
    onClick: ({ inSim }) => {
      inSim.send(
        new IS_BFN({
          SubT: subT,
          UCID,
          ClickID: clickId,
          ClickMax: clickMax,
        }),
      );
    },
  });

  drawButton(inSim, {
    Text: 'SubT:',
    ReqI: 1,
    L: 112,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 12,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.UNSELECTED_TEXT | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: `[${ButtonFunction[subT]}]`,
    ReqI: 1,
    L: 119,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 17,
    H: BUTTON_HEIGHT,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonStyle.ISB_CLICK |
      ButtonTextColour.UNSELECTED_TEXT,
    onClick: ({ button }) => {
      const viewIdentifierIds = Object.keys(ButtonFunction).filter(
        (key) => !isNaN(Number(ButtonFunction[key as unknown as number])),
      );
      const identifierId = viewIdentifierIds.findIndex(
        (identifier) => identifier === ButtonFunction[subT],
      );

      subT =
        identifierId === viewIdentifierIds.length - 1 ? 0 : identifierId + 1;

      button.update({
        ReqI: 1,
        Text: `[${ButtonFunction[subT]}]`,
      });
    },
  });

  drawButton(inSim, {
    Text: 'UCID:',
    ReqI: 1,
    L: 136,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 12,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.UNSELECTED_TEXT | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: buttonTextWithCaption('UCID', UCID.toString(10)),
    ReqI: 1,
    L: 141,
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
        Text: buttonTextWithCaption('UCID', UCID.toString(10)),
      });
    },
  });

  drawButton(inSim, {
    Text: 'ClickID:',
    ReqI: 1,
    L: 145,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 12,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.UNSELECTED_TEXT | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: buttonTextWithCaption('ClickID', clickId.toString(10)),
    ReqI: 1,
    L: 152,
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

      clickId = parsedNumber;
      button.update({
        ReqI: 1,
        Text: buttonTextWithCaption('ClickID', clickId.toString(10)),
      });
    },
  });

  drawButton(inSim, {
    Text: 'ClickMax:',
    ReqI: 1,
    L: 156,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 12,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.UNSELECTED_TEXT | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: buttonTextWithCaption('ClickMax', clickMax.toString(10)),
    ReqI: 1,
    L: 165,
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

      clickMax = parsedNumber;
      button.update({
        ReqI: 1,
        Text: buttonTextWithCaption('ClickMax', clickMax.toString(10)),
      });
    },
  });
}
