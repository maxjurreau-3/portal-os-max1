// src/sim/trajectories.ts

import type { PlanetaryMetric } from "../substrate/v4";
import { MetricRegistry } from "../substrate/metrics";

export interface TrajectoryInput {
  years: number;
  region: string;
}

export interface TrajectoryOutput {
  time: Date;
  metrics: PlanetaryMetric[];
}

export function generateTrajectory(input: TrajectoryInput): TrajectoryOutput[] {
  const points: TrajectoryOutput[] = [];
  const now = new Date();

  for (let i = 0; i < input.years; i++) {
    const year = new Date(now.getFullYear() + i, 0, 1);

    const metrics: PlanetaryMetric[] = MetricRegistry.map(def => {
      const regionalFactor =
        input.region === "north-america"
          ? 1.1
          : input.region === "europe"
          ? 0.95
          : input.region === "asia"
          ? 1.2
          : 1.0;

      return {
        id: def.id,
        layer: def.layer,
        region: input.region,
        unit: def.unit,
        timestamp: year,
        value: Math.random() * 100 * regionalFactor
      };
    });

    points.push({
      time: year,
      metrics
    });
  }

  return points;
}
