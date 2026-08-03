import React from "react";
import type { FusedMetric } from "../../src/substrate/fusion";
import type { GovernanceV6Decision } from "../../src/governance/v6";
import type { TecV6Cost } from "../../src/tec/v6";
import type { SimV6TrajectoryPoint } from "../../src/sim/v6";

interface Props {
  region: string;
  fused: FusedMetric[];
  trajectory: SimV6TrajectoryPoint[];
  cost: TecV6Cost;
  decision: GovernanceV6Decision;
}

export function RegionAdaptivePanel({
  region,
  fused,
  trajectory,
  cost,
  decision
}: Props) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2>Region Adaptive View — {region}</h2>

      <h3>Fused Metrics</h3>
      <pre>{JSON.stringify(fused.slice(0, 5), null, 2)}</pre>

      <h3>Trajectory (first 3 points)</h3>
      <pre>{JSON.stringify(trajectory.slice(0, 3), null, 2)}</pre>

      <h3>Cost</h3>
      <pre>{JSON.stringify(cost, null, 2)}</pre>

      <h3>Governance Decision</h3>
      <pre>{JSON.stringify(decision, null, 2)}</pre>
    </div>
  );
}
