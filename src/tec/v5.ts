// src/tec/v5.ts

import type { FusedMetric } from "../substrate/fusion";
import { createCostModifiers } from "./modifiers";

export interface TecV5Cost {
  id: string;
  total: number;
  components: {
    id: string;
    value: number;
  }[];
}

export interface TecV5Module {
  estimateCost(
    fused: FusedMetric[],
    signals: Record<string, number>,
    region: string
  ): Promise<TecV5Cost>;
}

export function initTecV5Module(): TecV5Module {
  return {
    async estimateCost(fused, signals, region) {
      const modifiers = createCostModifiers(signals);

      const components = fused.map(m => {
        let base = m.value;

        for (const mod of modifiers) {
          base = mod.apply(base, signals);
        }

        return {
          id: m.id,
          value: base
        };
      });

      const total = components.reduce((acc, c) => acc + c.value, 0);

      return {
        id: `cost-${region}`,
        total,
        components
      };
    }
  };
}
