// src/substrate/v6.ts

import type { PlanetaryMetric } from "./v4";
import type { StressRegistry } from "../kernel/stress";
import { adaptMetric } from "./adaptation";
import { fuseMetrics } from "./fusion";

export interface SubstrateV6Module {
  ingestAdaptive(
    region: string,
    metrics: PlanetaryMetric[],
    stress: StressRegistry
  ): void;

  fuseAdaptive(stress: StressRegistry): Promise<ReturnType<typeof fuseMetrics>>;

  getAll(): PlanetaryMetric[];
}

export function initSubstrateV6Module(): SubstrateV6Module {
  const store: PlanetaryMetric[] = [];

  return {
    ingestAdaptive(region, metrics, stress) {
      for (const m of metrics) {
        const adapted = adaptMetric({ ...m, region }, stress);
        store.push(adapted);
      }
    },

    async fuseAdaptive(stress) {
      const adapted = store.map(m => adaptMetric(m, stress));
      return fuseMetrics(adapted);
    },

    getAll() {
      return store;
    }
  };
}
