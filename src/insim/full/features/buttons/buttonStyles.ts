import type { InSim } from 'node-insim';
import { ButtonStyle, ButtonTextColour } from 'node-insim/packets';

import type { ButtonListProps } from '../../ui';
import { drawButtonList } from '../../ui';
import { getStringEnumValues } from '../../utils';
import { BUTTON_HEIGHT, TOP_OFFSET } from './constants';

export function drawButtonStyles(inSim: InSim) {
  const buttons: ButtonListProps['buttons'] = [];

  getStringEnumValues(ButtonTextColour).forEach((styleString) => {
    const styleNumber = ButtonTextColour[styleString];

    buttons.push({
      Text: `${styleString} (${styleNumber})`,
      BStyle: styleNumber,
    });
  });

  getStringEnumValues(ButtonStyle).forEach((styleString) => {
    const styleNumber = ButtonStyle[styleString];
    buttons.push({
      Text: `${styleString} (${styleNumber})`,
      BStyle: styleNumber,
    });
  });

  drawButtonList(inSim, {
    title: 'Button styles',
    leftOffset: 47,
    topOffset: TOP_OFFSET,
    width: 20,
    height: BUTTON_HEIGHT,
    buttons,
  });
}
