import React, { useState, useEffect } from "react";
import { initRuntimeV6 } from "../src/runtime/v6";

import { AdaptiveStressBar } from "./components/AdaptiveStressBar";
import { AdaptiveRoutePanel } from "./components/AdaptiveRoutePanel";
import { RegionStressPanel } from "./components/RegionStressPanel";
import { RegionAdaptivePanel } from "./components/RegionAdaptivePanel";

export function AppV6() {
  const [runtime, setRuntime] = useState<any>(null);
  const [result, setResult] = useState<any>(null);
  const [region, setRegion] = useState("global");

  useEffect(() => {
    initRuntimeV6().then(setRuntime);
  }, []);

  if (!runtime) return <div>Loading Portal‑OS v6…</div>;

  async function runAdaptive() {
    const output = await runtime.run(region);
    setResult(output);
  }

  return (
    <div>
      <h1>Portal‑OS v6 — Adaptive Multi‑Region Ecosystem</h1>

      <label>
        Region:
        <select
          value={region}
          onChange={e => setRegion(e.target.value)}
          style={{ marginLeft: "0.5rem" }}
        >
          <option value="global">Global</option>
          <option value="north_america">North America</option>
          <option value="europe">Europe</option>
          <option value="asia">Asia</option>
        </select>
      </label>

      <button onClick={runAdaptive} style={{ marginLeft: "1rem" }}>
        Run Adaptive Scenario
      </button>

      {result && (
        <>
          <AdaptiveStressBar stress={runtime.kernel.stress.getSmoothed()} />

          <AdaptiveRoutePanel
            current={runtime.routing.getCurrent()}
            next={result.nextRoute}
            stress={runtime.kernel.stress.getSmoothed()}
          />

          <RegionStressPanel
            region={region}
            stress={runtime.kernel.stress.getSmoothed()}
          />

          <RegionAdaptivePanel
            region={region}
            fused={result.fused}
            trajectory={result.trajectory}
            cost={result.cost}
            decision={result.decision}
          />
        </>
      )}
    </div>
  );
}
