// web/components/RegionPanel.tsx

import React from "react";
import type { Region } from "../../src/ecosystem/regions";

interface Props {
  regions: Region[];
}

export function RegionPanel({ regions }: Props) {
  return (
    <div>
      <h2>Regions</h2>
      {regions.map(region => (
        <div key={region.id}>
          <h3>{region.name}</h3>

          <strong>Agents</strong>
          <ul>
            {region.agents.map(a => (
              <li key={a.id}>{a.displayName} ({a.kind})</li>
            ))}
          </ul>

          <strong>Metrics</strong>
          <ul>
            {region.metrics.map(m => (
              <li key={m.id}>
                {m.id}: {m.value} {m.unit}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
