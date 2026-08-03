// src/governance/v4.ts

import type { KernelV4Config } from "../kernel/v4";
import type { SimRunResult } from "../sim/v4";
import type { TecCost } from "../tec/v4";
import { GovernancePolicies } from "./policies";

export interface GovernanceDecision {
  ok: boolean;
  violatedPolicies: string[];
  reasoning: string[];
}

export interface GovernanceModule {
  policies: typeof GovernancePolicies;
  evaluate(sim: SimRunResult, cost: TecCost): GovernanceDecision;
}

export async function initGovernanceModule(_config: KernelV4Config): Promise<GovernanceModule> {
  return {
    policies: GovernancePolicies,

    evaluate(sim: SimRunResult, cost: TecCost): GovernanceDecision {
      const violated: string[] = [];
      const reasoning: string[] = [];

      for (const point of sim.trajectory) {
        for (const policy of GovernancePolicies) {
          const ok = policy.check(point.metrics, cost);
          if (!ok) {
            violated.push(policy.id);
            reasoning.push(
              `Policy '${policy.id}' failed at ${point.time.toISOString()}: ${policy.description}`
            );
          }
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
