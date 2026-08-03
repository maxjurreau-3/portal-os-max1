// src/governance/v4.ts

import type { KernelV5 } from "../kernel/v5";
import type { FusedMetric } from "../substrate/fusion";
import { initGovernanceV5Module } from "./v5";

export interface GovernanceDecision {
  ok: boolean;
  violatedPolicies: string[];
  reasoning: string[];
}

export interface GovernanceModuleV4 {
  evaluate(
    fused: FusedMetric[],
    signals?: Record<string, number>,
    region?: string
  ): Promise<GovernanceDecision>;
}

export function initGovernanceModule(kernel: KernelV5): GovernanceModuleV4 {
  const govV5 = initGovernanceV5Module();

  return {
    async evaluate(fused, signals = {}, region = "global") {
      if (fused.length > 0) {
        return govV5.evaluate(fused, signals, region);
      }

      // fallback legacy behavior
      return {
        ok: true,
        violatedPolicies: [],
        reasoning: ["Legacy governance mode: no feedback applied."]
      };
    }
  };
}
