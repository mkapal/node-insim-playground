import '../../setupEnvironment.ts';

import NodeInSim from 'node-insim';
import { InSimFlags, IS_ISI_ReqI } from 'node-insim/packets';

import { drawTestButtons } from './features/buttons';
import { logPackets } from './features/packetLogs';
import { log } from './log';

const inSim = new NodeInSim.InSim();

inSim.connect({
  Host: process.env.HOST ?? '127.0.0.1',
  Port: process.env.PORT ? parseInt(process.env.PORT) : 29999,
  Admin: process.env.ADMIN ?? '',
  Interval: 0,
  ReqI: IS_ISI_ReqI.SEND_VERSION,
  IName: 'Node InSim Full',
  Flags:
    InSimFlags.ISF_LOCAL |
    InSimFlags.ISF_REQ_JOIN |
    InSimFlags.ISF_MSO_COLS |
    InSimFlags.ISF_NLP |
    InSimFlags.ISF_MCI |
    InSimFlags.ISF_CON |
    InSimFlags.ISF_OBH |
    InSimFlags.ISF_HLV |
    InSimFlags.ISF_AXM_LOAD |
    InSimFlags.ISF_AXM_EDIT,
  Prefix: '!',
});

inSim.on('connect', () => log('Connected'));
inSim.on('disconnect', () => log('Disconnected'));

logPackets(inSim);
drawTestButtons(inSim);

process.on('uncaughtException', (error) => {
  log(error);
});
