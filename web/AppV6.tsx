// web/AppV6.tsx

import React, { useState, useEffect } from "react";
import { initRuntimeV6 } from "../src/runtime/v6";

import { AdaptiveStressBar } from "./components/AdaptiveStressBar";
import { AdaptiveRoutePanel } from "./components/AdaptiveRoutePanel";

export function AppV6() {
  const [runtime, setRuntime] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    initRuntimeV6().then(setRuntime);
  }, []);

  if (!runtime) return <div>Loading Portal‑OS v6…</div>;

  async function runAdaptive() {
    const region = "global";
    const output = await runtime.run(region);
    setResult(output);
  }

  return (
    <div>
      <h1>Portal‑OS v6 — Adaptive Ecosystem Mode</h1>

      <button onClick={runAdaptive}>Run Adaptive Scenario</button>

      {result && (
        <>
          <AdaptiveStressBar stress={runtime.kernel.stress.getSmoothed()} />

          <AdaptiveRoutePanel
            current={runtime.routing.getCurrent()}
            next={result.nextRoute}
            stress={runtime.kernel.stress.getSmoothed()}
          />

          <h3>Adaptive SIM Trajectory</h3>
          <pre>{JSON.stringify(result.trajectory.slice(0, 3), null, 2)}</pre>

          <h3>Adaptive TEC Cost</h3>
          <pre>{JSON.stringify(result.cost, null, 2)}</pre>

          <h3>Adaptive Governance Decision</h3>
          <pre>{JSON.stringify(result.decision, null, 2)}</pre>

          <h3>Fused Substrate Metrics</h3>
          <pre>{JSON.stringify(result.fused.slice(0, 5), null, 2)}</pre>
        </>
      )}
    </div>
  );
}
