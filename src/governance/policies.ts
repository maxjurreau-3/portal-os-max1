// src/governance/policies.ts

import type { PlanetaryMetric } from "../substrate/v4";
import type { TecCost } from "../tec/v4";

export interface GovernancePolicy {
  id: string;
  description: string;
  check(metrics: PlanetaryMetric[], cost: TecCost): boolean;
}

function regionBoundary(region: string): number {
  switch (region) {
    case "north-america":
      return 580;
    case "europe":
      return 540;
    case "asia":
      return 600;
    default:
      return 550;
  }
}

function regionCostLimit(region: string): number {
  switch (region) {
    case "north-america":
      return 6000;
    case "europe":
      return 5000;
    case "asia":
      return 7000;
    default:
      return 5500;
  }
}

export const GovernancePolicies: GovernancePolicy[] = [
  {
    id: "climate-boundary-region",
    description: "Region-specific CO₂ boundary must not be exceeded.",
    check(metrics) {
      const co2 = metrics.find(m => m.id === "co2_ppm");
      if (!co2) return true;
      return co2.value < regionBoundary(co2.region);
    }
  },
  {
    id: "renewable-progress-region",
    description: "Renewable energy share must increase regionally.",
    check(metrics) {
      const renewable = metrics.find(m => m.id === "renewable_energy_share");
      if (!renewable) return true;
      return renewable.value > 25;
    }
  },
  {
    id: "regional-cost-feasibility",
    description: "Total cost must remain within region-specific feasibility limits.",
    check(metrics, cost) {
      const region = metrics[0]?.region ?? "global";
      return cost.total < regionCostLimit(region);
    }
  }
];
