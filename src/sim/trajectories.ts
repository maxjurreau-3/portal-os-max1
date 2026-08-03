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

    const metrics: PlanetaryMetric[] = MetricRegistry.map(def => ({
      id: def.id,
      layer: def.layer,
      region: input.region,
      unit: def.unit,
      timestamp: year,
      value: Math.random() * 100 // placeholder until real models are added
    }));

    points.push({
      time: year,
      metrics
    });
  }

  return points;
}
