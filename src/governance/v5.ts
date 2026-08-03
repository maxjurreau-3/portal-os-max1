// src/governance/v5.ts

import type { FusedMetric } from "../substrate/fusion";
import { createPolicyModifiers } from "./modifiers";

export interface GovernanceV5Decision {
  ok: boolean;
  violatedPolicies: string[];
  reasoning: string[];
}

export interface GovernanceV5Module {
  evaluate(
    fused: FusedMetric[],
    signals: Record<string, number>,
    region: string
  ): Promise<GovernanceV5Decision>;
}

export function initGovernanceV5Module(): GovernanceV5Module {
  return {
    async evaluate(fused, signals, region) {
      const modifiers = createPolicyModifiers(signals);

      const violated: string[] = [];
      const reasoning: string[] = [];

      for (const metric of fused) {
        let threshold = 100;

        for (const mod of modifiers) {
          threshold = mod.apply(threshold, signals);
        }

        if (metric.value > threshold) {
          violated.push(metric.id);
          reasoning.push(
            `Metric ${metric.id} exceeded threshold ${threshold.toFixed(
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
