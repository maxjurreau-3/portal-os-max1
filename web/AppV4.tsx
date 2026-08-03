// web/AppV4.tsx

import React, { useEffect, useState } from "react";
import { bootKernelV4, KernelV4Context } from "../src/kernel/v4";

export const AppV4: React.FC = () => {
  const [kernel, setKernel] = useState<KernelV4Context | null>(null);
  const [loading, setLoading] = useState(true);
  const [simResult, setSimResult] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const k = await bootKernelV4();
      setKernel(k);
      setLoading(false);
    })();
  }, []);

  const runScenario = async () => {
    if (!kernel) return;
    const result = await kernel.modules.sim.runScenario("energy-transition-2030-2050");
    const decision = kernel.modules.governance.evaluateSimResult(result);
    setSimResult(
      `Scenario: ${result.scenarioId}, OK: ${decision.ok}, Violations: ${decision.violatedPolicies.join(", ") || "none"}`
    );
  };

  if (loading || !kernel) {
    return <div>Booting Portal-OS v4 planetary kernel...</div>;
  }

  const currentRoute = kernel.modules.routing.getCurrent();

  return (
    <div style={{ fontFamily: "system-ui", padding: "16px" }}>
      <h1>Portal-OS v4 — Planetary Ecosystem Kernel</h1>
      <p>
        Environment: <strong>{kernel.config.environment}</strong> | Region:{" "}
        <strong>{kernel.config.planetary.region}</strong> | Layer:{" "}
        <strong>{kernel.config.planetary.layer}</strong>
      </p>

      <nav style={{ marginBottom: "16px" }}>
        {kernel.modules.routing.routes.map(route => (
          <button
            key={route.id}
            onClick={() => kernel.modules.routing.navigate(route.id)}
            style={{
              marginRight: "8px",
              padding: "6px 10px",
              background: currentRoute.id === route.id ? "#222" : "#eee",
              color: currentRoute.id === route.id ? "#fff" : "#000",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            {route.label}
          </button>
        ))}
      </nav>

      <section>
        {currentRoute.id === "home" && (
          <div>
            <h2>Dashboard</h2>
            <p>Kernel v4 is live on a planetary-aware substrate.</p>
          </div>
        )}

        {currentRoute.id === "sim" && (
          <div>
            <h2>SIM v4 — Scenarios</h2>
            <button onClick={runScenario}>Run energy transition scenario</button>
            {simResult && <p style={{ marginTop: "8px" }}>{simResult}</p>}
          </div>
        )}

        {currentRoute.id === "governance" && (
          <div>
            <h2>Governance v4 — Policies</h2>
            <ul>
              {kernel.modules.governance.policies.map(p => (
                <li key={p.id}>
                  <strong>{p.id}</strong>: {p.description} ({p.enabled ? "enabled" : "disabled"})
                </li>
              ))}
            </ul>
          </div>
        )}

        {currentRoute.id === "substrate" && (
          <div>
            <h2>Substrate v4 — Planetary Metrics</h2>
            <p>Metrics store is currently empty (no real data wired yet).</p>
          </div>
        )}
      </section>
    </div>
  );
};
