// src/substrate/v4.ts

import { fuseMetrics } from "./fusion";
import { ingestMetrics } from "./ingestion";

export interface PlanetaryMetric {
  id: string;
  layer: string;
  region: string;
  unit: string;
  timestamp: Date;
  value: number;
}

export interface SubstrateModule {
  getMetrics(): Promise<PlanetaryMetric[]>;
  ingest(packet: { region: string; metrics: PlanetaryMetric[] }): void;
  fuse(): Promise<ReturnType<typeof fuseMetrics>>;
}

export async function initSubstrateModule(): Promise<SubstrateModule> {
  const metrics: PlanetaryMetric[] = [];

  return {
    async getMetrics() {
      return metrics;
    },

    ingest(packet) {
      ingestMetrics(packet, {
        list: () => [{ id: packet.region, name: packet.region, agents: [], metrics }]
      });
    },

    async fuse() {
      return fuseMetrics(metrics);
    }
  };
}
