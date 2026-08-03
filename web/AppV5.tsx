// web/AppV5.tsx

import React, { useState, useEffect } from "react";
import { initEcosystemRuntime } from "../src/ecosystem/integration";

import { TrajectoryPanel } from "./components/TrajectoryPanel";
import { GovernancePanel } from "./components/GovernancePanel";
import { SubstratePanel } from "./components/SubstratePanel";
import { RegionPanel } from "./components/RegionPanel";
import { AgentPanel } from "./components/AgentPanel";

export function AppV5() {
  const [runtime, setRuntime] = useState(null);
  const [trajectory, setTrajectory] = useState([]);
  const [decision, setDecision] = useState(null);
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    initEcosystemRuntime().then(setRuntime);
  }, []);

  if (!runtime) return <div>Loading Portal‑OS v5…</div>;

  async function runScenario() {
    const simResult = await runtime.sim.runScenario("energy-transition-2030-2050");
    setTrajectory(simResult.trajectory);

    const cost = await runtime.tec.estimateTrajectoryCost(simResult.trajectory);
    const govDecision = runtime.governance.evaluate(simResult, cost);
    setDecision(govDecision);

    runtime.ecosystem.addDecision(govDecision);

    const allMetrics = await runtime.substrate.getMetrics();
    setMetrics(allMetrics);

    runtime.routing.evaluateFlows();
  }

  const current = runtime.routing.getCurrent();

  return (
    <div>
      <h1>Portal‑OS v5 — Ecosystem Mode</h1>
      <p>Current Route: {current.label}</p>

      <button onClick={runScenario}>Run Scenario</button>

      {current.id === "sim" && <TrajectoryPanel trajectory={trajectory} />}
      {current.id === "governance" && <GovernancePanel decision={decision} />}
      {current.id === "substrate" && <SubstratePanel metrics={metrics} />}
      {current.id === "dashboard" && (
        <>
          <RegionPanel regions={runtime.kernel.regions.list()} />
          <AgentPanel agents={runtime.ecosystem.state.agents.list()} />
        </>
      )}
    </div>
  );
}
