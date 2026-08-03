// src/sim/v6.ts

import type { FusedMetric } from "../substrate/fusion";
import type { StressRegistry } from "../kernel/stress";

export interface SimV6TrajectoryPoint {
  time: Date;
  metrics: FusedMetric[];
}

export interface SimV6Module {
  runAdaptive(
    region: string,
    fused: FusedMetric[],
    stress: StressRegistry
  ): Promise<SimV6TrajectoryPoint[]>;
}

export function initSimV6Module(): SimV6Module {
  return {
    async runAdaptive(region, fused, stress) {
      const level = stress.getSmoothed();
      const points: SimV6TrajectoryPoint[] = [];
      const now = new Date();

      for (let i = 0; i < 30; i++) {
        const year = new Date(now.getFullYear() + i, 0, 1);

        const modified = fused.map(m => ({
          ...m,
          region,
          value: m.value * (1 + level * 0.04)
        }));

        points.push({ time: year, metrics: modified });
      }

      return points;
    }
  };
}
