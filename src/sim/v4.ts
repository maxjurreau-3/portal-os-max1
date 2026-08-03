// src/sim/v4.ts

import type { KernelV4Config } from "../kernel/v4";
import type { PlanetaryMetric } from "../substrate/v4";
import { generateTrajectory } from "./trajectories";

export interface SimInvariant {
  id: string;
  description: string;
  check(metrics: PlanetaryMetric[]): boolean;
}

export interface SimScenario {
  id: string;
  name: string;
  description: string;
  horizonYears: number;
  region: string;
}

export interface SimTrajectoryPoint {
  time: Date;
  metrics: PlanetaryMetric[];
}

export interface SimRunResult {
  scenarioId: string;
  invariantViolations: string[];
  trajectory: SimTrajectoryPoint[];
}

export interface SimModule {
  invariants: SimInvariant[];
  scenarios: SimScenario[];
  runScenario(id: string): Promise<SimRunResult>;
}

export async function initSimModule(_config: KernelV4Config): Promise<SimModule> {
  const invariants: SimInvariant[] = [
    {
      id: "planetary-boundaries",
      description: "Stay within defined planetary boundaries.",
      check: (metrics) => {
        const co2 = metrics.find(m => m.id === "co2_ppm");
        return co2 ? co2.value < 600 : true;
      }
    }
  ];

  const scenarios: SimScenario[] = [
    {
      id: "energy-transition-2030-2050",
      name: "Global Energy Transition 2030–2050",
      description: "Shift from fossil to renewables under various policy regimes.",
      horizonYears: 20,
      region: "global"
    }
  ];

  return {
    invariants,
    scenarios,
    async runScenario(id: string): Promise<SimRunResult> {
      const scenario = scenarios.find(s => s.id === id);

      if (!scenario) {
        return {
          scenarioId: id,
          invariantViolations: ["scenario-not-found"],
          trajectory: []
        };
      }

      const rawTrajectory = generateTrajectory({
        years: scenario.horizonYears,
        region: scenario.region
      });

      const invariantViolations: string[] = [];

      for (const point of rawTrajectory) {
        for (const inv of invariants) {
          if (!inv.check(point.metrics)) {
            invariantViolations.push(inv.id);
          }
        }
      }

      return {
        scenarioId: scenario.id,
        invariantViolations,
        trajectory: rawTrajectory
      };
    }
  };
}
