import type { PacketType } from "node-insim/packets";
import { Button, HStack, VStack } from "react-node-insim";

import { BTN_H } from "../shared/buttonDimensions.js";

type SendablePacketPropertiesProps = {
  packetType: keyof typeof PacketType;
  onSendClick: () => void;
  onCancelClick: () => void;
};

export function SendablePacketProperties({
  packetType,
  onSendClick,
  onCancelClick,
}: SendablePacketPropertiesProps) {
  return (
    <>
      <Button
        top={10}
        left={50}
        width={20}
        height={BTN_H}
        color="title"
        align="left"
      >
        {packetType}
      </Button>
      <VStack top={15} left={50} width={20} height={BTN_H} variant="dark">
        <Button align="left">Prop</Button>
        <Button align="left">Prop</Button>
        <Button align="left">Prop</Button>
      </VStack>
      <VStack
        top={15}
        left={70}
        width={20}
        height={BTN_H}
        variant="light"
        color="textstring"
      >
        <Button>12</Button>
        <Button>0</Button>
        <Button>abc</Button>
      </VStack>
      <HStack top={50} left={50} width={20} height={BTN_H} variant="light">
        <Button color="ok" onClick={onSendClick}>
          Send
        </Button>
        <Button color="cancel" onClick={onCancelClick}>
          Cancel
        </Button>
      </HStack>
    </>
  );
}
