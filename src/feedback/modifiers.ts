// src/feedback/modifiers.ts

import type { FeedbackSignal } from "./signals";

export interface Modifier {
  id: string;
  description: string;
  apply(value: number): number;
}

export function createModifiers(signals: Record<string, number>): Modifier[] {
  return [
    {
      id: "sim_trajectory_modifier",
      description: "High climate stress accelerates SIM trajectory changes.",
      apply(value) {
        const stress = signals["climate_stress"] ?? 0;
        return value * (1 + stress * 0.05);
      }
    },
    {
      id: "tec_cost_modifier",
      description: "Energy stress increases TEC cost estimates.",
      apply(value) {
        const stress = signals["energy_stress"] ?? 0;
        return value * (1 + stress * 0.1);
      }
    },
    {
      id: "governance_strictness_modifier",
      description: "Governance pressure increases policy strictness.",
      apply(value) {
        const pressure = signals["governance_pressure"] ?? 0;
        return value + pressure * 0.2;
      }
    }
  ];
}
