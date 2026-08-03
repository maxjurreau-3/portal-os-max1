// web/components/GovernancePanel.tsx

import React from "react";
import type { GovernanceDecision } from "../../src/governance/v4";

interface Props {
  decision: GovernanceDecision | null;
}

export function GovernancePanel({ decision }: Props) {
  if (!decision) {
    return <div>No governance decision yet.</div>;
  }

  return (
    <div>
      <h2>Governance Decision</h2>
      <p>Status: {decision.ok ? "OK" : "VIOLATED"}</p>

      <h3>Violations</h3>
      <ul>
        {decision.violatedPolicies.map(v => (
          <li key={v}>{v}</li>
        ))}
      </ul>

      <h3>Reasoning</h3>
      <ul>
        {decision.reasoning.map((r, idx) => (
          <li key={idx}>{r}</li>
        ))}
      </ul>
    </div>
  );
}
