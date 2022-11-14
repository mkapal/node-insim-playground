import NodeInSim from 'node-insim';
import { InSimFlags, IS_ISI_ReqI } from 'node-insim/packets';

import { APP_NAME } from './constants';
import { drawTestButtons } from './features/buttons';
import { logPackets } from './features/packetLogs';
import { log } from './log';

const inSim = new NodeInSim.InSim();

inSim.connect({
  Host: '127.0.0.1',
  Port: 29999,
  ReqI: IS_ISI_ReqI.SEND_VERSION,
  IName: APP_NAME,
  Flags:
    InSimFlags.ISF_LOCAL |
    InSimFlags.ISF_MSO_COLS |
    InSimFlags.ISF_NLP |
    InSimFlags.ISF_MCI |
    InSimFlags.ISF_CON |
    InSimFlags.ISF_OBH |
    InSimFlags.ISF_HLV |
    InSimFlags.ISF_AXM_LOAD |
    InSimFlags.ISF_AXM_EDIT |
    InSimFlags.ISF_REQ_JOIN,
});

inSim.on('connect', () => log('Connected'));
inSim.on('disconnect', () => log('Disconnected'));
inSim.on('error', (error) => log('Error:', error.name, error.message));

logPackets(inSim);
drawTestButtons(inSim);
