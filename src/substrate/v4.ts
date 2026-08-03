// src/substrate/v4.ts

import { MetricRegistry } from "./metrics";
import type { PlanetaryLayer } from "../kernel/v4";

export interface PlanetaryMetric {
  id: string;
  layer: PlanetaryLayer;
  region: string;
  value: number;
  unit: string;
  timestamp: Date;
}

export interface SubstrateModule {
  getMetrics(): Promise<PlanetaryMetric[]>;
  getMetricById(id: string): Promise<PlanetaryMetric | null>;
  addMetric(metric: PlanetaryMetric): void;
  listDefinitions(): Promise<typeof MetricRegistry>;
}

export async function initSubstrateModule(): Promise<SubstrateModule> {
  const metrics: PlanetaryMetric[] = [];

  return {
    async getMetrics() {
      return metrics;
    },
    async getMetricById(id: string) {
      return metrics.find(m => m.id === id) ?? null;
    },
    addMetric(metric: PlanetaryMetric) {
      metrics.push(metric);
    },
    async listDefinitions() {
      return MetricRegistry;
    }
  };
}
