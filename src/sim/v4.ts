// src/sim/v4.ts

import type { KernelV5 } from "../kernel/v5";
import type { FusedMetric } from "../substrate/fusion";
import { initSimV5Module } from "./v5";

export interface SimV4TrajectoryPoint {
  time: Date;
  metrics: FusedMetric[];
}

export interface SimModuleV4 {
  runScenario(
    scenario: string,
    region?: string,
    fused?: FusedMetric[],
    signals?: Record<string, number>
  ): Promise<SimV4TrajectoryPoint[]>;
}

export function initSimModule(kernel: KernelV5): SimModuleV4 {
  const simV5 = initSimV5Module();

  return {
    async runScenario(scenario, region = "global", fused = [], signals = {}) {
      if (fused.length > 0) {
        return simV5.runScenario(region, fused, signals);
      }

      // fallback: legacy behavior
      const now = new Date();
      return [
        {
          time: now,
          metrics: []
        }
      ];
    }
  };
}
