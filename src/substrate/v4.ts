// src/substrate/v4.ts

import { initSubstrateV6Module } from "./v6";
import type { PlanetaryMetric } from "./v4";
import type { StressRegistry } from "../kernel/stress";

export interface SubstrateModuleV4 {
  ingest(packet: { region: string; metrics: PlanetaryMetric[] }, stress?: StressRegistry): void;
  fuse(stress?: StressRegistry): Promise<PlanetaryMetric[]>;
  getMetrics(): Promise<PlanetaryMetric[]>;
}

export async function initSubstrateModule(): Promise<SubstrateModuleV4> {
  const v6 = initSubstrateV6Module();

  return {
    async ingest(packet, stress) {
      if (stress) {
        v6.ingestAdaptive(packet.region, packet.metrics, stress);
      } else {
        v6.ingestAdaptive(packet.region, packet.metrics, {
          getSmoothed: () => 0,
          add: () => {},
          points: []
        });
      }
    },

    async fuse(stress) {
      if (stress) {
        return v6.fuseAdaptive(stress);
      }
      return v6.fuseAdaptive({
        getSmoothed: () => 0,
        add: () => {},
        points: []
      });
    },

    async getMetrics() {
      return v6.getAll();
    }
  };
}
