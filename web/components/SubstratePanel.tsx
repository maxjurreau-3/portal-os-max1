// web/components/SubstratePanel.tsx

import React from "react";
import type { PlanetaryMetric } from "../../src/substrate/v4";

interface Props {
  metrics: PlanetaryMetric[];
}

export function SubstratePanel({ metrics }: Props) {
  return (
    <div>
      <h2>Substrate Metrics</h2>
      <ul>
        {metrics.map(m => (
          <li key={m.id}>
            {m.id} — {m.value} {m.unit} ({m.region})
          </li>
        ))}
      </ul>
    </div>
  );
}
