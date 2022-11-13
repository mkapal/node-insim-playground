import NodeInSim from 'node-insim';
import type { IS_VER } from 'node-insim/packets';
import { IS_ISI_ReqI, PacketType } from 'node-insim/packets';
import { createLog } from 'node-insim/utils';

const inSim = new NodeInSim.InSim();
const insimName = 'Node InSim Mini';
const log = createLog(insimName);

inSim.connect({
  Host: '127.0.0.1',
  Port: 29999,
  ReqI: IS_ISI_ReqI.SEND_VERSION,
  IName: insimName,
});

inSim.on('connect', () => log.info('Connected'));
inSim.on('disconnect', () => log.info('Disconnected'));
inSim.on(PacketType.ISP_VER, onVersion);

function onVersion(packet: IS_VER) {
  log.info(`Connected to LFS ${packet.Product} ${packet.Version}`);
}

inSim.on('error', (error) => {
  log.error(`Error:`, error);
});
