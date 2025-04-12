import type { Packet } from "node-insim/packets";
import {
  PacketType,
  packetTypeToClass,
  SendablePacket,
} from "node-insim/packets";
import { useState } from "react";
import {
  Button,
  type ButtonProps,
  useOnPacket,
  VStack,
} from "react-node-insim";

import { BTN_H } from "../shared/buttonDimensions.js";
import { getStringEnumValues } from "../shared/enumUtils.js";
import { SendablePacketProperties } from "./SendablePacketProperties.js";

const TOP = 10;
const LEFT = 50;
const WIDTH = 21;

type ReceivedPacket = {
  packetType: PacketType;
  timeout: NodeJS.Timeout;
};

export function Packets() {
  const [packetsReceived, setPacketsReceived] = useState<ReceivedPacket[]>([]);
  const [selectedPacket, setSelectedPacket] = useState<
    keyof typeof PacketType | null
  >(null);

  const handlePacketReceived = (packet: Packet) => {
    packetsReceived
      .filter(({ packetType }) => packetType === packet.Type)
      .forEach(({ timeout }) => {
        clearTimeout(timeout);
      });

    const packetHasBeenReceived = packetsReceived.some(
      ({ packetType }) => packetType === packet.Type,
    );

    const timeout = setTimeout(() => {
      setPacketsReceived((prevPackets) =>
        prevPackets.filter(({ packetType }) => packetType !== packet.Type),
      );
    }, 200);

    if (!packetHasBeenReceived) {
      setPacketsReceived((prevPackets) => [
        ...prevPackets,
        {
          packetType: packet.Type,
          timeout,
        },
      ]);
    }
  };

  useOnPacket(PacketType.ISP_STA, handlePacketReceived);
  useOnPacket(PacketType.ISP_NONE, handlePacketReceived);
  useOnPacket(PacketType.ISP_VER, handlePacketReceived);
  useOnPacket(PacketType.ISP_TINY, handlePacketReceived);
  useOnPacket(PacketType.ISP_SMALL, handlePacketReceived);
  useOnPacket(PacketType.ISP_CPP, handlePacketReceived);
  useOnPacket(PacketType.ISP_ISM, handlePacketReceived);
  useOnPacket(PacketType.ISP_MSO, handlePacketReceived);
  useOnPacket(PacketType.ISP_III, handlePacketReceived);
  useOnPacket(PacketType.ISP_VTN, handlePacketReceived);
  useOnPacket(PacketType.ISP_RST, handlePacketReceived);
  useOnPacket(PacketType.ISP_NCN, handlePacketReceived);
  useOnPacket(PacketType.ISP_CNL, handlePacketReceived);
  useOnPacket(PacketType.ISP_CPR, handlePacketReceived);
  useOnPacket(PacketType.ISP_NPL, handlePacketReceived);
  useOnPacket(PacketType.ISP_PLP, handlePacketReceived);
  useOnPacket(PacketType.ISP_PLL, handlePacketReceived);
  useOnPacket(PacketType.ISP_LAP, handlePacketReceived);
  useOnPacket(PacketType.ISP_SPX, handlePacketReceived);
  useOnPacket(PacketType.ISP_PIT, handlePacketReceived);
  useOnPacket(PacketType.ISP_PSF, handlePacketReceived);
  useOnPacket(PacketType.ISP_PLA, handlePacketReceived);
  useOnPacket(PacketType.ISP_CCH, handlePacketReceived);
  useOnPacket(PacketType.ISP_PEN, handlePacketReceived);
  useOnPacket(PacketType.ISP_TOC, handlePacketReceived);
  useOnPacket(PacketType.ISP_FLG, handlePacketReceived);
  useOnPacket(PacketType.ISP_PFL, handlePacketReceived);
  useOnPacket(PacketType.ISP_FIN, handlePacketReceived);
  useOnPacket(PacketType.ISP_RES, handlePacketReceived);
  useOnPacket(PacketType.ISP_REO, handlePacketReceived);
  useOnPacket(PacketType.ISP_NLP, handlePacketReceived);
  useOnPacket(PacketType.ISP_MCI, handlePacketReceived);
  useOnPacket(PacketType.ISP_CRS, handlePacketReceived);
  useOnPacket(PacketType.ISP_BFN, handlePacketReceived);
  useOnPacket(PacketType.ISP_AXI, handlePacketReceived);
  useOnPacket(PacketType.ISP_AXO, handlePacketReceived);
  useOnPacket(PacketType.ISP_BTC, handlePacketReceived);
  useOnPacket(PacketType.ISP_BTT, handlePacketReceived);
  useOnPacket(PacketType.ISP_RIP, handlePacketReceived);
  useOnPacket(PacketType.ISP_SSH, handlePacketReceived);
  useOnPacket(PacketType.ISP_CON, handlePacketReceived);
  useOnPacket(PacketType.ISP_OBH, handlePacketReceived);
  useOnPacket(PacketType.ISP_HLV, handlePacketReceived);
  useOnPacket(PacketType.ISP_AXM, handlePacketReceived);
  useOnPacket(PacketType.ISP_ACR, handlePacketReceived);
  useOnPacket(PacketType.ISP_NCI, handlePacketReceived);
  useOnPacket(PacketType.ISP_UCO, handlePacketReceived);
  useOnPacket(PacketType.ISP_SLC, handlePacketReceived);
  useOnPacket(PacketType.ISP_CSC, handlePacketReceived);
  useOnPacket(PacketType.ISP_CIM, handlePacketReceived);
  useOnPacket(PacketType.ISP_MAL, handlePacketReceived);
  useOnPacket(PacketType.ISP_PLH, handlePacketReceived);
  useOnPacket(PacketType.ISP_IPB, handlePacketReceived);
  useOnPacket(PacketType.ISP_AII, handlePacketReceived);

  const handleSendablePacketClick = (
    packetTypeString: keyof typeof PacketType,
  ) => {
    setSelectedPacket(packetTypeString);
  };

  const inSimPacketNames = getStringEnumValues(PacketType).filter((value) =>
    value.startsWith("ISP_"),
  );
  const packetsFirst = inSimPacketNames.slice(
    0,
    Math.round(inSimPacketNames.length / 2),
  );
  const packetsLast = inSimPacketNames.slice(
    Math.round(inSimPacketNames.length / 2),
  );

  if (selectedPacket) {
    return (
      <SendablePacketProperties
        packetType={selectedPacket}
        onCancelClick={() => setSelectedPacket(null)}
        onSendClick={() => setSelectedPacket(null)}
      />
    );
  }

  return (
    <>
      <Button
        top={TOP}
        left={LEFT}
        width={WIDTH}
        height={BTN_H}
        color="title"
        align="left"
      >
        Packets
      </Button>
      <VStack top={TOP + BTN_H} left={LEFT} width={WIDTH} height={BTN_H}>
        {packetsFirst.map((packetType) => (
          <Button
            key={packetType}
            {...getPacketButtonProps(packetType, packetsReceived, () =>
              handleSendablePacketClick(packetType),
            )}
          />
        ))}
      </VStack>
      <VStack
        top={TOP + BTN_H}
        left={LEFT + WIDTH}
        width={WIDTH}
        height={BTN_H}
        variant="light"
      >
        {packetsLast.map((packetType) => (
          <Button
            key={packetType}
            {...getPacketButtonProps(packetType, packetsReceived, () =>
              handleSendablePacketClick(packetType),
            )}
          />
        ))}
      </VStack>
    </>
  );
}

function isSendable(packetTypeString: keyof typeof PacketType) {
  const packetTypeNumber = PacketType[packetTypeString];
  const packetClass = packetTypeToClass[packetTypeNumber];

  return packetClass.prototype instanceof SendablePacket;
}

function getPacketButtonProps(
  packetTypeString: keyof typeof PacketType,
  packetsReceived: ReceivedPacket[],
  onClick: () => void,
): ButtonProps {
  const hasBeenReceived = packetsReceived.some(
    (receivedPacket) =>
      PacketType[receivedPacket.packetType] === packetTypeString,
  );

  return {
    variant: isSendable(packetTypeString) ? "light" : "dark",
    color: hasBeenReceived ? "cyan" : undefined,
    children: hasBeenReceived ? `>> ${packetTypeString} <<` : packetTypeString,
    onClick: isSendable(packetTypeString) ? onClick : undefined,
  };
}
