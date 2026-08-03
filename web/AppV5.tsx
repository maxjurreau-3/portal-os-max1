import React from "react";
import RegionPanel from "./components/SIM/RegionPanel";
import AgentPanel from "./components/SIM/AgentPanel";

export default function AppV5(): JSX.Element {
  return (
    <div className="app-v5">
      <h2>Portal‑OS v5 (Ecosystem Mode)</h2>
      <div className="panels">
        <RegionPanel />
        <AgentPanel />
      </div>
    </div>
  );
}
