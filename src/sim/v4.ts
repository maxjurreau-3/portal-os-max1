// src/sim/v4.ts

import type { PlanetaryMetric } from "../substrate/v4";
import type { KernelV4Config } from "../kernel/v4";

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
      check: (_metrics) => true
    }
  ];

  const scenarios: SimScenario[] = [
    {
      id: "energy-transition-2030-2050",
      name: "Global Energy Transition 2030–2050",
      description: "Shift from fossil to renewables under various policy regimes.",
      horizonYears: 20
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

      const trajectory: SimTrajectoryPoint[] = [];
      const invariantViolations: string[] = [];

      return {
        scenarioId: scenario.id,
        invariantViolations,
        trajectory
      };
    }
  };
}
