// src/governance/modifiers.ts

export interface PolicyModifier {
  id: string;
  description: string;
  apply(base: number, signals: Record<string, number>): number;
}

export function createPolicyModifiers(
  signals: Record<string, number>
): PolicyModifier[] {
  return [
    {
      id: "climate_strictness",
      description: "Climate stress tightens climate-related policy thresholds.",
      apply(base, signals) {
        const stress = signals["climate_stress"] ?? 0;
        return base - stress * 0.5;
      }
    },
    {
      id: "energy_strictness",
      description: "Energy stress tightens renewable energy requirements.",
      apply(base, signals) {
        const stress = signals["energy_stress"] ?? 0;
        return base + stress * 0.3;
      }
    },
    {
      id: "governance_pressure_strictness",
      description: "Governance pressure increases policy strictness globally.",
      apply(base, signals) {
        const pressure = signals["governance_pressure"] ?? 0;
        return base - pressure * 0.2;
      }
    }
  ];
}
