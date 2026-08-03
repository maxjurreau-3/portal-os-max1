// src/substrate/adaptation.ts

import type { PlanetaryMetric } from "./v4";
import type { StressRegistry } from "../kernel/stress";

export interface MetricAdaptationRule {
  id: string;
  description: string;
  apply(metric: PlanetaryMetric, stress: number): PlanetaryMetric;
}

export const MetricAdaptationRules: MetricAdaptationRule[] = [
  {
    id: "climate_stress_amplification",
    description: "High global stress amplifies climate metrics.",
    apply(metric, stress) {
      if (metric.id.includes("co2") || metric.id.includes("temperature")) {
        return { ...metric, value: metric.value * (1 + stress * 0.05) };
      }
      return metric;
    }
  },
  {
    id: "energy_stress_shift",
    description: "Energy stress shifts renewable metrics upward.",
    apply(metric, stress) {
      if (metric.id.includes("renewable")) {
        return { ...metric, value: metric.value + stress * 0.3 };
      }
      return metric;
    }
  },
  {
    id: "governance_pressure_metric",
    description: "Governance pressure adds noise to governance-sensitive metrics.",
    apply(metric, stress) {
      if (metric.id.includes("policy") || metric.id.includes("governance")) {
        return { ...metric, value: metric.value + stress * 0.2 };
      }
      return metric;
    }
  }
];

export function adaptMetric(
  metric: PlanetaryMetric,
  stress: StressRegistry
): PlanetaryMetric {
  const level = stress.getSmoothed();
  let updated = metric;

  for (const rule of MetricAdaptationRules) {
    updated = rule.apply(updated, level);
  }

  return updated;
}
