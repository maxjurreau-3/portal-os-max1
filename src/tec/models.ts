// src/tec/models.ts

import type { PlanetaryMetric } from "../substrate/v4";

export interface CostComponent {
  id: string;
  name: string;
  unit: string;
  compute(metrics: PlanetaryMetric[]): number;
}

export const CostModels: CostComponent[] = [
  {
    id: "energy_cost",
    name: "Energy system transition cost",
    unit: "TWh",
    compute(metrics) {
      const renewable = metrics.find(m => m.id === "renewable_energy_share");
      if (!renewable) return 0;
      return (100 - renewable.value) * 0.5; // placeholder model
    }
  },
  {
    id: "climate_cost",
    name: "Climate impact cost",
    unit: "impact-index",
    compute(metrics) {
      const co2 = metrics.find(m => m.id === "co2_ppm");
      if (!co2) return 0;
      return Math.max(0, co2.value - 350) * 0.1; // placeholder model
    }
  }
];
