// src/routing/modifiers.ts

export interface RouteModifier {
  id: string;
  description: string;
  apply(weight: number, signals: Record<string, number>): number;
}

export function createRouteModifiers(
  signals: Record<string, number>
): RouteModifier[] {
  return [
    {
      id: "climate_route_shift",
      description: "Climate stress shifts routing toward governance.",
      apply(weight, signals) {
        const stress = signals["climate_stress"] ?? 0;
        return weight + stress * 0.1;
      }
    },
    {
      id: "energy_route_shift",
      description: "Energy stress shifts routing toward substrate.",
      apply(weight, signals) {
        const stress = signals["energy_stress"] ?? 0;
        return weight + stress * 0.15;
      }
    },
    {
      id: "governance_pressure_lock",
      description: "Governance pressure locks routing into governance view.",
      apply(weight, signals) {
        const pressure = signals["governance_pressure"] ?? 0;
        return weight + pressure * 0.2;
      }
    }
  ];
}
