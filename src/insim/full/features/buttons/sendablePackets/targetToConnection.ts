import { TargetToConnectionType } from 'node-insim/packets';
import {
  ButtonStyle,
  ButtonTextColour,
  IS_TTC,
  TypeIn,
} from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { buttonNumberTextWithCaption, drawButton } from '../../../ui';
import { getPacketLabel } from '../../../utils';
import { BUTTON_HEIGHT, TOP_OFFSET } from '../constants';

export function drawTargetToConnectionPacketButton(inSim: InSim, row: number) {
  let reqI = 0,
    ucId = 0,
    subT: TargetToConnectionType = 0,
    b1 = 0,
    b2 = 0,
    b3 = 0;

  drawButton(inSim, {
    Text: getPacketLabel(IS_TTC),
    ReqI: 1,
    L: 97,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 15,
    H: BUTTON_HEIGHT,
    BStyle: ButtonStyle.ISB_DARK | ButtonStyle.ISB_CLICK,
    onClick: ({ inSim }) => {
      inSim.send(
        new IS_TTC({
          ReqI: reqI,
          UCID: ucId,
          SubT: subT,
          B1: b1,
          B2: b2,
          B3: b3,
        }),
      );
    },
  });

  drawButton(inSim, {
    Text: 'ReqI:',
    ReqI: 1,
    L: 112,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 6,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.UnselectedText | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ReqI: 1,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    H: BUTTON_HEIGHT,
    L: 117,
    W: 4,
    TypeIn: 3 + TypeIn.INIT_VALUE_BUTTON_TEXT,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonTextColour.TextString |
      ButtonStyle.ISB_CLICK,
    Text: buttonNumberTextWithCaption('ReqI', reqI),
    onType: ({ packet, button }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (reqI = parsedValue);

      button.update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('ReqI', reqI),
      });
    },
  });

  drawButton(inSim, {
    Text: 'UCID:',
    ReqI: 1,
    L: 121,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 5,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.UnselectedText | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ReqI: 1,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    H: BUTTON_HEIGHT,
    L: 126,
    W: 4,
    TypeIn: 3 + TypeIn.INIT_VALUE_BUTTON_TEXT,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonTextColour.TextString |
      ButtonStyle.ISB_CLICK,
    Text: buttonNumberTextWithCaption('UCID', ucId),
    onType: ({ packet, button }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (ucId = parsedValue);

      button.update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('UCID', ucId),
      });
    },
  });

  drawButton(inSim, {
    Text: 'SubT:',
    ReqI: 1,
    L: 130,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 6,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.UnselectedText | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    Text: `[${TargetToConnectionType[subT]}]`,
    ReqI: 1,
    L: 135,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 15,
    H: BUTTON_HEIGHT,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonStyle.ISB_CLICK |
      ButtonTextColour.UnselectedText,
    onClick: ({ button }) => {
      const ids = Object.keys(TargetToConnectionType).filter(
        (key) =>
          !isNaN(Number(TargetToConnectionType[key as unknown as number])),
      );
      const id = ids.findIndex(
        (identifier) => identifier === TargetToConnectionType[subT],
      );

      subT = id === ids.length - 1 ? 0 : id + 1;

      button.update({
        ReqI: 1,
        Text: `[${TargetToConnectionType[subT]}]`,
      });
    },
  });

  drawButton(inSim, {
    Text: 'B1:',
    ReqI: 1,
    L: 150,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 5,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.UnselectedText | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ReqI: 1,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    H: BUTTON_HEIGHT,
    L: 154,
    W: 4,
    TypeIn: 3 + TypeIn.INIT_VALUE_BUTTON_TEXT,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonTextColour.TextString |
      ButtonStyle.ISB_CLICK,
    Text: buttonNumberTextWithCaption('B1', b1),
    onType: ({ packet, button }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (b1 = parsedValue);

      button.update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('B1', b1),
      });
    },
  });

  drawButton(inSim, {
    Text: 'B2:',
    ReqI: 1,
    L: 158,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 5,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.UnselectedText | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ReqI: 1,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    H: BUTTON_HEIGHT,
    L: 162,
    W: 4,
    TypeIn: 3 + TypeIn.INIT_VALUE_BUTTON_TEXT,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonTextColour.TextString |
      ButtonStyle.ISB_CLICK,
    Text: buttonNumberTextWithCaption('B2', b2),
    onType: ({ packet, button }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (b2 = parsedValue);

      button.update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('B2', b2),
      });
    },
  });

  drawButton(inSim, {
    Text: 'B3:',
    ReqI: 1,
    L: 166,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    W: 5,
    H: BUTTON_HEIGHT,
    BStyle: ButtonTextColour.UnselectedText | ButtonStyle.ISB_LEFT,
  });

  drawButton(inSim, {
    ReqI: 1,
    T: TOP_OFFSET + BUTTON_HEIGHT * row,
    H: BUTTON_HEIGHT,
    L: 170,
    W: 4,
    TypeIn: 3 + TypeIn.INIT_VALUE_BUTTON_TEXT,
    BStyle:
      ButtonStyle.ISB_LIGHT |
      ButtonTextColour.TextString |
      ButtonStyle.ISB_CLICK,
    Text: buttonNumberTextWithCaption('B3', b3),
    onType: ({ packet, button }) => {
      const parsedValue = parseInt(packet.Text, 10);
      !isNaN(parsedValue) && (b3 = parsedValue);

      button.update({
        ReqI: 1,
        Text: buttonNumberTextWithCaption('B3', b3),
      });
    },
  });
}
