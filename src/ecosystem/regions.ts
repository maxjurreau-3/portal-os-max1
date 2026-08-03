// src/ecosystem/regions.ts

import type { IdentityV4 } from "../identity/v4";
import type { PlanetaryMetric } from "../substrate/v4";

export interface Region {
  id: string;
  name: string;
  agents: IdentityV4[];
  metrics: PlanetaryMetric[];
}

export interface RegionRegistry {
  regions: Region[];
  create(name: string): Region;
  addAgent(regionId: string, identity: IdentityV4): void;
  addMetric(regionId: string, metric: PlanetaryMetric): void;
  list(): Region[];
}

export function createRegionRegistry(): RegionRegistry {
  const regions: Region[] = [];

  return {
    regions,

    create(name) {
      const region: Region = {
        id: crypto.randomUUID(),
        name,
        agents: [],
        metrics: []
      };
      regions.push(region);
      return region;
    },

    addAgent(regionId, identity) {
      const region = regions.find(r => r.id === regionId);
      if (region) region.agents.push(identity);
    },

    addMetric(regionId, metric) {
      const region = regions.find(r => r.id === regionId);
      if (region) region.metrics.push(metric);
    },

    list() {
      return regions;
    }
  };
}
