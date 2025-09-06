import "../env";

import { InSim } from "node-insim";
import { InSimFlags } from "node-insim/packets";
import { createRoot } from "react-node-insim";

import { App } from "./App.js";

const inSim = new InSim();
inSim.connect({
  IName: "NodeInSimPlay",
  Host: process.env.HOST ?? "127.0.0.1",
  Port: process.env.PORT ? parseInt(process.env.PORT, 10) : 29999,
  Flags: InSimFlags.ISF_LOCAL,
});

const root = createRoot(inSim);

root.render(<App />);
