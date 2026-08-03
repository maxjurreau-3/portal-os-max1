// src/tec/v4.ts

import type { KernelV4Config } from "../kernel/v4";
import type { SimTrajectoryPoint } from "../sim/v4";
import { CostModels } from "./models";

export interface TecCostBreakdown {
  componentId: string;
  name: string;
  unit: string;
  value: number;
}

export interface TecCost {
  total: number;
  breakdown: TecCostBreakdown[];
}

export interface TecModule {
  estimateTrajectoryCost(trajectory: SimTrajectoryPoint[]): Promise<TecCost>;
}

export async function initTecModule(_config: KernelV4Config): Promise<TecModule> {
  return {
    async estimateTrajectoryCost(trajectory: SimTrajectoryPoint[]): Promise<TecCost> {
      const breakdown: TecCostBreakdown[] = [];

      for (const point of trajectory) {
        for (const model of CostModels) {
          const value = model.compute(point.metrics);

          breakdown.push({
            componentId: model.id,
            name: model.name,
            unit: model.unit,
            value
          });
        }
      }

      const total = breakdown.reduce((sum, b) => sum + b.value, 0);

      return {
        total,
        breakdown
      };
    }
  };
}
