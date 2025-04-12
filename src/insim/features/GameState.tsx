import type { InSim } from "node-insim";
import {
  type IS_BTC,
  IS_SFP,
  type IS_STA,
  IS_TINY,
  PacketType,
  RaceState,
  type SendableStateFlags,
  ServerStatus,
  StateFlags,
  TinyType,
  ViewIdentifier,
  Wind,
} from "node-insim/packets";
import { useState } from "react";
import { Button, useOnConnect, useOnPacket, VStack } from "react-node-insim";

import { BTN_H } from "../shared/buttonDimensions";
import { getStringEnumValues } from "../shared/enumUtils";

const LABEL_WIDTH = 24;
const VALUE_WIDTH = 22;

export function GameState() {
  const [state, setState] = useState<IS_STA | null>(null);

  useOnConnect((_, inSim) => {
    inSim.send(
      new IS_TINY({
        ReqI: 1,
        SubT: TinyType.TINY_SST,
      }),
    );
  });

  useOnPacket(PacketType.ISP_STA, (packet) => {
    setState(packet);
  });

  if (state == null) {
    return null;
  }

  const stateFlagEnumValues = getStringEnumValues(StateFlags);

  return (
    <>
      <VStack
        top={10}
        left={0}
        width={LABEL_WIDTH}
        height={BTN_H}
        variant="dark"
      >
        <Button align="left" color="title" background="transparent">
          IS_STA
        </Button>
        <Button align="left">ReplaySpeed</Button>
        <Button align="left">Flags</Button>
      </VStack>
      <VStack
        top={15}
        left={LABEL_WIDTH}
        width={VALUE_WIDTH}
        height={BTN_H}
        variant="dark"
      >
        <Button align="right">{state.ReplaySpeed}</Button>
        <Button align="right">{state.Flags}</Button>
      </VStack>
      <VStack
        top={25}
        left={0}
        width={LABEL_WIDTH + VALUE_WIDTH}
        height={BTN_H}
        variant="light"
      >
        {stateFlagEnumValues.map((stateFlag) => {
          const stateNumber = StateFlags[stateFlag];
          const isOn = Boolean(state.Flags & stateNumber);
          const isSendable = isSendableState(stateNumber);
          const handleClick = isSendable
            ? (_: IS_BTC, inSim: InSim) => {
                inSim.send(
                  new IS_SFP({
                    Flag: stateNumber,
                    OffOn: isOn ? 0 : 1,
                  }),
                );
              }
            : undefined;

          return (
            <Button
              key={stateFlag}
              align="left"
              color={isOn ? "green" : "default"}
              background={isSendable ? "light" : "dark"}
              onClick={isSendable ? handleClick : undefined}
            >
              {stateFlag}
            </Button>
          );
        })}
      </VStack>
      <VStack
        top={105}
        left={0}
        width={LABEL_WIDTH}
        height={BTN_H}
        variant="dark"
      >
        <Button align="left">InGameCam</Button>
        <Button align="left">ViewPLID</Button>
        <Button align="left">NumP</Button>
        <Button align="left">NumConns</Button>
        <Button align="left">NumFinished</Button>
        <Button align="left">RaceInProg</Button>
        <Button align="left">QualMins</Button>
        <Button align="left">RaceLaps</Button>
        <Button align="left">ServerStatus</Button>
        <Button align="left">Track</Button>
        <Button align="left">Weather</Button>
        <Button align="left">Wind</Button>
      </VStack>
      <Button
        top={105}
        left={LABEL_WIDTH}
        width={VALUE_WIDTH - 18}
        height={BTN_H}
        variant="dark"
      >
        {state.InGameCam}
      </Button>
      <Button
        top={105}
        left={LABEL_WIDTH + VALUE_WIDTH - 18}
        width={18}
        height={BTN_H}
        variant="dark"
        align="left"
      >
        {ViewIdentifier[state.InGameCam]}
      </Button>
      <VStack
        top={110}
        left={LABEL_WIDTH}
        width={VALUE_WIDTH}
        height={BTN_H}
        variant="dark"
      >
        <Button align="right">{state.ViewPLID}</Button>
        <Button align="right">{state.NumP}</Button>
        <Button align="right">{state.NumConns}</Button>
        <Button align="right">{state.NumFinished}</Button>
      </VStack>
      <Button
        top={130}
        left={LABEL_WIDTH}
        width={VALUE_WIDTH - 18}
        height={BTN_H}
        variant="dark"
      >
        {state.RaceInProg}
      </Button>
      <Button
        top={130}
        left={LABEL_WIDTH + VALUE_WIDTH - 18}
        width={18}
        height={BTN_H}
        variant="dark"
        align="left"
      >
        {RaceState[state.RaceInProg]}
      </Button>
      <VStack
        top={135}
        left={LABEL_WIDTH}
        width={VALUE_WIDTH}
        height={BTN_H}
        variant="dark"
      >
        <Button align="right">{state.QualMins}</Button>
        <Button align="right">{state.RaceLaps}</Button>
      </VStack>
      <Button
        top={145}
        left={LABEL_WIDTH}
        width={VALUE_WIDTH - 18}
        height={BTN_H}
        variant="dark"
      >
        {state.ServerStatus}
      </Button>
      <Button
        top={145}
        left={LABEL_WIDTH + VALUE_WIDTH - 18}
        width={18}
        height={BTN_H}
        variant="dark"
        align="left"
      >
        {ServerStatus[state.ServerStatus]}
      </Button>
      <VStack
        top={150}
        left={LABEL_WIDTH}
        width={VALUE_WIDTH}
        height={BTN_H}
        variant="dark"
      >
        <Button align="right">{state.Track}</Button>
        <Button align="right">{state.Weather}</Button>
      </VStack>
      <Button
        top={160}
        left={LABEL_WIDTH}
        width={VALUE_WIDTH - 18}
        height={BTN_H}
        variant="dark"
      >
        {state.Wind}
      </Button>
      <Button
        top={160}
        left={LABEL_WIDTH + VALUE_WIDTH - 18}
        width={18}
        height={BTN_H}
        variant="dark"
        align="left"
      >
        {Wind[state.Wind]}
      </Button>
    </>
  );
}

function isSendableState(
  stateFlag: StateFlags,
): stateFlag is SendableStateFlags {
  const sendableStates = [
    StateFlags.ISS_SHIFTU_NO_OPT,
    StateFlags.ISS_MPSPEEDUP,
    StateFlags.ISS_SOUND_MUTE,
    StateFlags.ISS_SHOW_2D,
  ];

  return sendableStates.includes(stateFlag);
}
