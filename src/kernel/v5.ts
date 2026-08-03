// src/kernel/v5.ts

import { createRegionRegistry } from "../ecosystem/regions";

export interface KernelV5Config {
  ecosystemMode: boolean;
  enableInfluenceGraphs: boolean;
}

export interface KernelV5 {
  config: KernelV5Config;
  ecosystemId: string;
  createdAt: Date;
  regions: ReturnType<typeof createRegionRegistry>;
}

export function initKernelV5(): KernelV5 {
  return {
    config: {
      ecosystemMode: true,
      enableInfluenceGraphs: true
    },
    ecosystemId: crypto.randomUUID(),
    createdAt: new Date(),
    regions: createRegionRegistry()
  };
}
