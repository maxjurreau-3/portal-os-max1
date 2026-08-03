// src/feedback/signals.ts

import type { FusedMetric } from "../substrate/fusion";

export interface FeedbackSignal {
  id: string;
  description: string;
  compute(metrics: FusedMetric[]): number;
}

export const FeedbackSignals: FeedbackSignal[] = [
  {
    id: "climate_stress",
    description: "Climate stress increases with CO₂ and temperature anomalies.",
    compute(metrics) {
      const co2 = metrics.find(m => m.id === "co2_ppm");
      const temp = metrics.find(m => m.id === "temperature_anomaly");

      const co2Score = co2 ? Math.max(0, co2.value - 350) / 10 : 0;
      const tempScore = temp ? Math.max(0, temp.value) * 2 : 0;

      return co2Score + tempScore;
    }
  },
  {
    id: "energy_stress",
    description: "Energy stress increases when renewable share is low.",
    compute(metrics) {
      const renewable = metrics.find(m => m.id === "renewable_energy_share");
      if (!renewable) return 0;
      return Math.max(0, 50 - renewable.value) / 5;
    }
  },
  {
    id: "governance_pressure",
    description: "Governance pressure increases with policy violations.",
    compute(metrics) {
      const violations = metrics.filter(m => m.id.includes("violation"));
      return violations.length * 3;
    }
  }
];
