// src/sim/modifiers.ts

import type { FeedbackSignal } from "../feedback/signals";

export interface TrajectoryModifier {
  id: string;
  description: string;
  apply(base: number, signals: Record<string, number>): number;
}

export function createTrajectoryModifiers(
  signals: Record<string, number>
): TrajectoryModifier[] {
  return [
    {
      id: "climate_acceleration",
      description: "Climate stress accelerates trajectory changes.",
      apply(base, signals) {
        const stress = signals["climate_stress"] ?? 0;
        return base * (1 + stress * 0.03);
      }
    },
    {
      id: "energy_transition_push",
      description: "Energy stress pushes renewable adoption faster.",
      apply(base, signals) {
        const stress = signals["energy_stress"] ?? 0;
        return base + stress * 0.5;
      }
    },
    {
      id: "governance_pressure_shift",
      description: "Governance pressure shifts policy‑sensitive metrics.",
      apply(base, signals) {
        const pressure = signals["governance_pressure"] ?? 0;
        return base * (1 + pressure * 0.02);
      }
    }
  ];
}
