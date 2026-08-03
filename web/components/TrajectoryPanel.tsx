// web/components/TrajectoryPanel.tsx

import React from "react";
import type { SimTrajectoryPoint } from "../../src/sim/v4";

interface Props {
  trajectory: SimTrajectoryPoint[];
}

export function TrajectoryPanel({ trajectory }: Props) {
  return (
    <div>
      <h2>Trajectory</h2>
      {trajectory.map((point, idx) => (
        <div key={idx}>
          <strong>{point.time.toISOString()}</strong>
          <ul>
            {point.metrics.map(m => (
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
