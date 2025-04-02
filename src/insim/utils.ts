import type { Packet } from "node-insim/packets";

export function getStringEnumValues<T extends Record<number, string>>(
  enumVar: T,
): (keyof T)[] {
  return (Object.keys(enumVar) as unknown as number[]).filter(
    (key) => !isNaN(Number(enumVar[key])),
  );
}

export function getPacketLabel<
  P extends Packet,
  Data extends Record<string, unknown>,
>(packetConstructor: new (data?: Data) => P, hasModal = false): string {
  return `${packetConstructor.name} (${new packetConstructor().Type})${
    hasModal ? " ..." : "   "
  }`;
}

export function toggleFlag(flags: number, flag: number) {
  return flags & flag ? flags & ~flag : flags | flag;
}

export function lfsRaceLapsToLapsOrHours(raceLaps: number): string {
  if (raceLaps === 0) {
    return "practice";
  }

  if (raceLaps >= 1 && raceLaps <= 99) {
    const lapsUnit = getLapsUnit(raceLaps);
    return `${raceLaps} ${lapsUnit}`;
  }

  if (raceLaps >= 100 && raceLaps <= 190) {
    return `${(raceLaps - 100) * 10 + 100} laps`;
  }

  if (raceLaps >= 191 && raceLaps <= 238) {
    const hours = raceLaps - 190;
    const hoursUnit = getHoursUnit(hours);
    return `${hours} ${hoursUnit}`;
  }

  return `${raceLaps} laps`;
}

function getLapsUnit(laps: number) {
  return laps === 1 ? "lap" : "laps";
}

function getHoursUnit(hours: number) {
  return hours === 1 ? "hour" : "hours";
}

export function isLocalhost() {
  return (process.env.HOST ?? "127.0.0.1") === "127.0.0.1" || "192.168.1.100";
}
