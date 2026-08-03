// src/tec/modifiers.ts

export interface CostModifier {
  id: string;
  description: string;
  apply(base: number, signals: Record<string, number>): number;
}

export function createCostModifiers(
  signals: Record<string, number>
): CostModifier[] {
  return [
    {
      id: "climate_cost_inflation",
      description: "Climate stress inflates climate-related costs.",
      apply(base, signals) {
        const stress = signals["climate_stress"] ?? 0;
        return base * (1 + stress * 0.04);
      }
    },
    {
      id: "energy_cost_inflation",
      description: "Energy stress increases energy transition costs.",
      apply(base, signals) {
        const stress = signals["energy_stress"] ?? 0;
        return base * (1 + stress * 0.08);
      }
    },
    {
      id: "governance_penalty",
      description: "Governance pressure adds penalties to policy-sensitive costs.",
      apply(base, signals) {
        const pressure = signals["governance_pressure"] ?? 0;
        return base + pressure * 5;
      }
    }
  ];
}
