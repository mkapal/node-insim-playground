import type { IS_STA } from 'node-insim/packets';
import {
  ButtonFunction,
  ButtonStyle,
  ButtonTextColour,
  PacketType,
  RaceState,
  ServerStatus,
  Wind,
} from 'node-insim/packets';
import type { InSim } from 'node-insim/protocols';

import { drawButtonList } from '../../ui';
import { lfsRaceLapsToLapsOrHours } from '../../utils';
import { onState } from '../packetLogs/onState';
import {
  BUTTON_HEIGHT,
  LEFT_OFFSET,
  TOP_OFFSET,
  VIEW_IDENTIFIERS,
} from './constants';

export function drawStateButtons(inSim: InSim) {
  const buttonPairs: Record<string, string> = {
    'Replay speed': '-',
    'Selected camera': '-',
    'View PLID': '-',
    'Players on track': '-',
    Connections: '-',
    'Finished / qualified': '-',
    'Race state': '-',
    'Qualifying minutes': '-',
    'Race laps / hours': '-',
    'Server status': '-',
    Track: '-',
    Weather: '-',
    Wind: '-',
  };

  drawButtonList(inSim, {
    title: 'Game state',
    leftOffset: LEFT_OFFSET,
    topOffset: TOP_OFFSET,
    width: 15,
    height: BUTTON_HEIGHT,
    buttons: Object.keys(buttonPairs).map((text) => ({
      Text: text,
      BStyle:
        ButtonStyle.ISB_LIGHT |
        ButtonTextColour.UnselectedText |
        ButtonStyle.ISB_LEFT,
    })),
  });

  const { update: updateStateButtons } = drawButtonList(inSim, {
    leftOffset: LEFT_OFFSET + 15,
    topOffset: TOP_OFFSET + BUTTON_HEIGHT,
    width: 10,
    height: BUTTON_HEIGHT,
    buttons: Object.values(buttonPairs).map((text) => ({
      Text: text,
      BStyle: ButtonStyle.ISB_LIGHT | ButtonTextColour.UnselectedText,
    })),
  });

  inSim.on(PacketType.ISP_STA, (packet: IS_STA) => {
    const buttonPairs: Record<string, string> = {
      'Replay speed': packet.ReplaySpeed.toFixed(3),
      'Selected camera': `${VIEW_IDENTIFIERS[packet.InGameCam]} (${
        packet.InGameCam
      })`,
      'View PLID': packet.ViewPLID.toString(10),
      'Players on track': packet.NumP.toString(10),
      Connections: packet.NumConns.toString(10),
      'Finished / qualified': packet.NumFinished.toString(10),
      'Race state': `${raceStates[packet.RaceInProg]} (${packet.RaceInProg})`,
      'Qualifying minutes': packet.QualMins.toString(10),
      'Race laps / hours': `${lfsRaceLapsToLapsOrHours(packet.RaceLaps)} (${
        packet.RaceLaps
      })`,
      'Server status': `${getServerStatus(packet.ServerStatus)} (${
        packet.ServerStatus
      })`,
      Track: packet.Track,
      Weather: packet.Weather.toString(10),
      Wind: `${windStrengths[packet.Wind]} (${packet.Wind})`,
    };

    updateStateButtons(
      Object.values(buttonPairs).map((text) => ({
        Text: text,
        BStyle: ButtonStyle.ISB_LIGHT | ButtonTextColour.UnselectedText,
      })),
    );
  });

  inSim.on(PacketType.ISP_BFN, (packet) => {
    if (packet.SubT === ButtonFunction.BFN_USER_CLEAR) {
      inSim.removeAllListeners(PacketType.ISP_STA);
      inSim.addListener(PacketType.ISP_STA, onState);
    }
  });
}

function getServerStatus(status: ServerStatus) {
  if (status === ServerStatus.Success) {
    return 'success';
  }

  if (status === ServerStatus.Unknown) {
    return 'unknown';
  }

  return 'fail';
}

const raceStates: Record<RaceState, string> = {
  [RaceState.Race]: 'race',
  [RaceState.Qualifying]: 'qualifying',
  [RaceState.NoRace]: 'no race',
};

const windStrengths: Record<Wind, string> = {
  [Wind.Off]: 'no wind',
  [Wind.Weak]: 'low wind',
  [Wind.Strong]: 'high wind',
};
