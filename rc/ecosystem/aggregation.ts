// src/ecosystem/aggregation.ts

import type { GovernanceDecision } from "../governance/v4";
import type { Region } from "./regions";

export interface AggregatedDecision {
  ok: boolean;
  regionBreakdown: {
    regionId: string;
    ok: boolean;
    violations: string[];
  }[];
}

export function aggregateGovernance(
  decisions: GovernanceDecision[],
  regions: Region[]
): AggregatedDecision {
  const breakdown = regions.map(region => {
    const regionDecisions = decisions.filter(d =>
      d.reasoning.some(r => r.includes(region.name))
    );

    const ok = regionDecisions.every(d => d.ok);

    const violations = regionDecisions.flatMap(d => d.violatedPolicies);

    return {
      regionId: region.id,
      ok,
      violations
    };
  });

  return {
    ok: breakdown.every(b => b.ok),
    regionBreakdown: breakdown
  };
}
