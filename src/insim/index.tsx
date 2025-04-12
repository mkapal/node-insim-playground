import "../env";

import { InSimFlags } from "node-insim/packets";
import { createRoot } from "react-node-insim";

import { App } from "./App";

const root = createRoot({
  name: "NodeInSimPlay",
  host: process.env.HOST ?? "127.0.0.1",
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 29999,
  flags: InSimFlags.ISF_LOCAL,
});

root.render(<App />);
