import "../env";

import { InSim } from "node-insim";
import { InSimFlags, IS_ISI_ReqI } from "node-insim/packets";
import { ConnectionsPlayersProvider, createRoot } from "react-node-insim";

import { App } from "./App.js";

const inSim = new InSim();
inSim.connect({
  IName: "NodeInSimPlay",
  Host: process.env.HOST ?? "127.0.0.1",
  Port: process.env.PORT ? parseInt(process.env.PORT, 10) : 29999,
  ReqI: IS_ISI_ReqI.SEND_VERSION,
  Flags: InSimFlags.ISF_LOCAL,
});

const root = createRoot(inSim);

root.render(
  <ConnectionsPlayersProvider>
    <App />
  </ConnectionsPlayersProvider>,
);
