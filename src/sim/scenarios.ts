// src/sim/scenarios.ts

export interface SimScenario {
  id: string;
  name: string;
  description: string;
}

export const scenarios: SimScenario[] = [
  {
    id: "baseline",
    name: "Baseline Boot",
    description: "Boot kernel, initialize identity, governance, routing, TEC, SIM."
  }
];
