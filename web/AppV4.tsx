// web/AppV4.tsx

import React, { useState } from "react";

import { initKernelV4 } from "../src/kernel/v4";
import { initSubstrateModule } from "../src/substrate/v4";
import { initSimModule } from "../src/sim/v4";
import { initTecModule } from "../src/tec/v4";
import { initGovernanceModule } from "../src/governance/v4";
import { initIdentityModule } from "../src/identity/v4";
import { initRoutingModule } from "../src/routing/v4";

import { TrajectoryPanel } from "./components/TrajectoryPanel";
import { GovernancePanel } from "./components/GovernancePanel";
import { SubstratePanel } from "./components/SubstratePanel";

export function AppV4() {
  const [kernel] = useState(() => initKernelV4());
  const [substrate] = useState(() => initSubstrateModule());
  const [identity] = useState(() => initIdentityModule(kernel));
  const [sim] = useState(() => initSimModule(kernel));
  const [tec] = useState(() => initTecModule(kernel));
  const [governance] = useState(() => initGovernanceModule(kernel));
  const [routing] = useState(() => initRoutingModule(kernel, identity, governance));

  const [trajectory, setTrajectory] = useState([]);
  const [decision, setDecision] = useState(null);
  const [metrics, setMetrics] = useState([]);

  async function runScenario() {
    const result = await sim.runScenario("energy-transition-2030-2050");
    setTrajectory(result.trajectory);

    const cost = await tec.estimateTrajectoryCost(result.trajectory);
    const gov = governance.evaluate(result, cost);
    setDecision(gov);

    const allMetrics = await substrate.getMetrics();
    setMetrics(allMetrics);

    routing.evaluateFlows();
  }

  const current = routing.getCurrent();

  return (
    <div>
      <h1>Portal-OS v4</h1>
      <p>Current Route: {current.label}</p>

      <button onClick={runScenario}>Run Scenario</button>

      {current.id === "sim" && <TrajectoryPanel trajectory={trajectory} />}
      {current.id === "governance" && <GovernancePanel decision={decision} />}
      {current.id === "substrate" && <SubstratePanel metrics={metrics} />}
    </div>
  );
}
