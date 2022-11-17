import {
  IS_BTN,
  SENDABLE_TINY_TYPES,
  ViewIdentifier,
} from 'node-insim/packets';

export const BUTTON_HEIGHT = 4;

export const TINY_BUTTON_ID_OFFSET = 1;

export const SMALL_BUTTON_ID_OFFSET =
  TINY_BUTTON_ID_OFFSET + Math.max(...SENDABLE_TINY_TYPES) + 1;

export const LEFT_OFFSET = IS_BTN.IS_X_MIN;
export const TOP_OFFSET = IS_BTN.IS_Y_MIN;
export const VIEW_IDENTIFIERS: Record<ViewIdentifier, string> = {
  [ViewIdentifier.VIEW_FOLLOW]: 'follow',
  [ViewIdentifier.VIEW_HELI]: 'heli',
  [ViewIdentifier.VIEW_CAM]: 'external',
  [ViewIdentifier.VIEW_DRIVER]: 'in car',
  [ViewIdentifier.VIEW_CUSTOM]: 'custom',
  [ViewIdentifier.VIEW_ANOTHER]: 'another car',
};
