// src/governance/policies.ts

import type { PlanetaryMetric } from "../substrate/v4";
import type { TecCost } from "../tec/v4";

export interface GovernancePolicy {
  id: string;
  description: string;
  check(metrics: PlanetaryMetric[], cost: TecCost): boolean;
}

export const GovernancePolicies: GovernancePolicy[] = [
  {
    id: "climate-boundary",
    description: "CO₂ must remain below 550 ppm.",
    check(metrics) {
      const co2 = metrics.find(m => m.id === "co2_ppm");
      return co2 ? co2.value < 550 : true;
    }
  },
  {
    id: "energy-transition-progress",
    description: "Renewable energy share must increase over time.",
    check(metrics) {
      const renewable = metrics.find(m => m.id === "renewable_energy_share");
      return renewable ? renewable.value > 20 : true;
    }
  },
  {
    id: "cost-feasibility",
    description: "Total cost must remain within feasible bounds.",
    check(_metrics, cost) {
      return cost.total < 5000; // placeholder feasibility threshold
    }
  }
];
