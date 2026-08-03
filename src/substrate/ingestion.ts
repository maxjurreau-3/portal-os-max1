// src/substrate/ingestion.ts

import type { PlanetaryMetric } from "./v4";
import type { RegionRegistry } from "../ecosystem/regions";

export interface IngestionPacket {
  region: string;
  metrics: PlanetaryMetric[];
}

export function ingestMetrics(
  packet: IngestionPacket,
  regions: RegionRegistry
): void {
  const region = regions.list().find(r => r.id === packet.region);
  if (!region) return;

  for (const metric of packet.metrics) {
    regions.addMetric(region.id, metric);
  }
}
