// src/ecosystem/distribution.ts

import type { IdentityV4 } from "../identity/v4";
import type { RegionRegistry } from "./regions";

export interface RegionDistributionRule {
  id: string;
  description: string;
  assign(identity: IdentityV4, regions: RegionRegistry): string;
}

export const DistributionRules: RegionDistributionRule[] = [
  {
    id: "default-global",
    description: "All agents default to global region unless specified.",
    assign(identity, regions) {
      const global = regions.list().find(r => r.name === "global");
      return global ? global.id : regions.list()[0].id;
    }
  },
  {
    id: "institution-to-governance-region",
    description: "Institutions are placed in the region with highest governance load.",
    assign(identity, regions) {
      if (identity.kind !== "institution") {
        const global = regions.list().find(r => r.name === "global");
        return global ? global.id : regions.list()[0].id;
      }

      const sorted = [...regions.list()].sort(
        (a, b) => b.metrics.length - a.metrics.length
      );

      return sorted[0].id;
    }
  }
];

export function assignAgentToRegion(
  identity: IdentityV4,
  regions: RegionRegistry
): string {
  for (const rule of DistributionRules) {
    const regionId = rule.assign(identity, regions);
    if (regionId) return regionId;
  }
  return regions.list()[0].id;
}
