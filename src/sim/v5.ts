// src/sim/v5.ts

import type { FusedMetric } from "../substrate/fusion";
import { createTrajectoryModifiers } from "./modifiers";

export interface SimV5TrajectoryPoint {
  time: Date;
  metrics: FusedMetric[];
}

export interface SimV5Module {
  runScenario(
    region: string,
    fused: FusedMetric[],
    signals: Record<string, number>
  ): Promise<SimV5TrajectoryPoint[]>;
}

export function initSimV5Module(): SimV5Module {
  return {
    async runScenario(region, fused, signals) {
      const modifiers = createTrajectoryModifiers(signals);

      const points: SimV5TrajectoryPoint[] = [];
      const now = new Date();

      for (let i = 0; i < 30; i++) {
        const year = new Date(now.getFullYear() + i, 0, 1);

        const modifiedMetrics = fused.map(m => {
          let value = m.value;

          for (const mod of modifiers) {
            value = mod.apply(value, signals);
          }

          return {
            ...m,
            region,
            value
          };
        });

        points.push({
          time: year,
          metrics: modifiedMetrics
        });
      }

      return points;
    }
  };
}
