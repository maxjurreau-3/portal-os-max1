// src/tec/v6.ts

import type { FusedMetric } from "../substrate/fusion";
import type { StressRegistry } from "../kernel/stress";

export interface TecV6Cost {
  id: string;
  total: number;
  components: { id: string; value: number }[];
}

export interface TecV6Module {
  estimateAdaptive(
    fused: FusedMetric[],
    region: string,
    stress: StressRegistry
  ): Promise<TecV6Cost>;
}

export function initTecV6Module(): TecV6Module {
  return {
    async estimateAdaptive(fused, region, stress) {
      const level = stress.getSmoothed();

      const components = fused.map(m => ({
        id: m.id,
        value: m.value * (1 + level * 0.08)
      }));

      const total = components.reduce((acc, c) => acc + c.value, 0);

      return {
        id: `cost-${region}`,
        total,
        components
      };
    }
  };
}
