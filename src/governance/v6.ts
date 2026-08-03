// src/governance/v6.ts

import type { FusedMetric } from "../substrate/fusion";
import type { StressRegistry } from "../kernel/stress";

export interface GovernanceV6Decision {
  ok: boolean;
  violatedPolicies: string[];
  reasoning: string[];
}

export interface GovernanceV6Module {
  evaluateAdaptive(
    fused: FusedMetric[],
    region: string,
    stress: StressRegistry
  ): Promise<GovernanceV6Decision>;
}

export function initGovernanceV6Module(): GovernanceV6Module {
  return {
    async evaluateAdaptive(fused, region, stress) {
      const level = stress.getSmoothed();
      const violated: string[] = [];
      const reasoning: string[] = [];

      for (const metric of fused) {
        const threshold = 100 - level * 2;

        if (metric.value > threshold) {
          violated.push(metric.id);
          reasoning.push(
            `Metric ${metric.id} exceeded adaptive threshold ${threshold.toFixed(
              2
            )} in region ${region}`
          );
        }
      }

      return {
        ok: violated.length === 0,
        violatedPolicies: violated,
        reasoning
      };
    }
  };
}
