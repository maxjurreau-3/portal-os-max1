// web/components/AdaptiveRoutePanel.tsx

import React from "react";
import type { RouteV4 } from "../../src/routing/v4";

interface Props {
  current: RouteV4;
  next: RouteV4;
  stress: number;
}

export function AdaptiveRoutePanel({ current, next, stress }: Props) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <h3>Adaptive Routing</h3>
      <p>Current Route: {current.label}</p>
      <p>Next Route (Adaptive): {next.label}</p>
      <p>Routing Stress Influence: {(stress * 0.1).toFixed(2)}</p>
    </div>
  );
}
