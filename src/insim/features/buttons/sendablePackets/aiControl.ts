import type { InSim } from 'node-insim';
import {
  AICInput,
  AIInputVal,
  ButtonStyle,
  ButtonTextColour,
  IS_AIC,
  TypeIn,
} from 'node-insim/packets';

import { buttonTextWithCaption, drawButton } from '../../../ui';
import { getPacketLabel } from '../../../utils';
import { BUTTON_HEIGHT, TOP_OFFSET } from '../constants';

export function drawAiControlPacketButton(inSim: InSim, row: number) {
  let plid = 0,
    time = 0,
    value = 0;
  let input: AICInput = AICInput.CS_MSX;

  drawButton(inSim, {
    Text: getPacketLabel(IS_AIC, false),
    ReqI: 1,
    L: 97,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 15,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_DARK | ButtonStyle.ISB_CLICK,
    onClick: ({ inSim }) => {
      inSim.send(
        new IS_AIC({
          PLID: plid,
          Inputs: [
            new AIInputVal({
              Input: input as any,
              Time: time as any,
              Value: value,
            }),
            // new AIInputVal({
            // Input: AICInput.CS_REPEAT_AI_INFO,
            // }),
          ],
        }),
      );
    },
  });

  drawButton(inSim, {
    Text: 'PLID:',
    ReqI: 1,
    L: 112,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 10,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.UNSELECTED_TEXT | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: buttonTextWithCaption('PLID', plid.toString(10)),
    ReqI: 1,
    L: 117,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 3,
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

      plid = parsedNumber;
      button.update({
        ReqI: 1,
        Text: buttonTextWithCaption('PLID', plid.toString(10)),
      });
    },
  });

  drawButton(inSim, {
    Text: 'Input:',
    ReqI: 1,
    L: 120,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 10,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.UNSELECTED_TEXT | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: `[${AICInput[input]}]`,
    ReqI: 1,
    L: 126,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 19,
    H: BUTTON_HEIGHT,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonStyle.ISB_CLICK |
      ButtonTextColour.UNSELECTED_TEXT,
    onClick: ({ button }) => {
      const inputIds = Object.keys(AICInput).filter(
        (key) => !isNaN(Number(AICInput[key as unknown as number])),
      );
      const inputId = inputIds.findIndex(
        (identifier) => identifier === AICInput[input],
      );

      input =
        inputId === inputIds.length - 1
          ? 0
          : AICInput[inputIds[inputId + 1] as any];

      button.update({
        ReqI: 1,
        Text: `[${AICInput[input]}]`,
      });
    },
  });

  drawButton(inSim, {
    Text: 'Time:',
    ReqI: 1,
    L: 145,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 10,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.UNSELECTED_TEXT | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: buttonTextWithCaption('Time', time.toString(10)),
    ReqI: 1,
    L: 150,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 5,
    H: BUTTON_HEIGHT,
    TypeIn: 5 + TypeIn.INIT_VALUE_BUTTON_TEXT,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonStyle.ISB_CLICK |
      ButtonTextColour.TEXT_STRING,
    onType: ({ packet, button }) => {
      const parsedNumber = parseInt(packet.Text, 10);

      if (isNaN(parsedNumber)) {
        return;
      }

      time = parsedNumber;
      button.update({
        ReqI: 1,
        Text: buttonTextWithCaption('Time', time.toString(10)),
      });
    },
  });

  drawButton(inSim, {
    Text: 'Value:',
    ReqI: 1,
    L: 160,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 10,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.UNSELECTED_TEXT | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: buttonTextWithCaption('Value', value.toString(10)),
    ReqI: 1,
    L: 166,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 8,
    H: BUTTON_HEIGHT,
    TypeIn: 5 + TypeIn.INIT_VALUE_BUTTON_TEXT,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonStyle.ISB_CLICK |
      ButtonTextColour.TEXT_STRING,
    onType: ({ packet, button }) => {
      const parsedNumber = parseInt(packet.Text, 10);

      if (isNaN(parsedNumber)) {
        return;
      }

      value = parsedNumber;
      button.update({
        ReqI: 1,
        Text: buttonTextWithCaption('Value', value.toString(10)),
      });
    },
  });
}
