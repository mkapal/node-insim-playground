import debug from 'debug';
import NodeInSim from 'node-insim';
import type { IS_VER } from 'node-insim/packets';
import { IS_ISI_ReqI, PacketType } from 'node-insim/packets';

const inSim = new NodeInSim.InSim();
const insimName = 'Node InSim Mini';
const log = debug('node-insim-minimal');
const logError = debug('node-insim-minimal:error');

inSim.connect({
  Host: process.env.HOST ?? '127.0.0.1',
  Port: process.env.PORT ? parseInt(process.env.PORT) : 29999,
  ReqI: IS_ISI_ReqI.SEND_VERSION,
  IName: insimName,
});

inSim.on('connect', () => log('Connected'));
inSim.on('disconnect', () => log('Disconnected'));
inSim.on(PacketType.ISP_VER, onVersion);

function onVersion(packet: IS_VER) {
  log(`Connected to LFS ${packet.Product} ${packet.Version}`);
}

inSim.on('error', (error) => {
  logError(`Error:`, error);
});
