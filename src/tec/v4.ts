// src/tec/v4.ts

import type { KernelV4Config } from "../kernel/v4";

export interface TecCost {
  energyTWh: number;
  computePFLOPSYears: number;
  financialUSD: number;
}

export interface TecModule {
  estimateCost(scenarioId: string): Promise<TecCost>;
}

export async function initTecModule(_config: KernelV4Config): Promise<TecModule> {
  return {
    async estimateCost(_scenarioId: string): Promise<TecCost> {
      return {
        energyTWh: 0,
        computePFLOPSYears: 0,
        financialUSD: 0
      };
    }
  };
}
