// src/substrate/metrics.ts

import type { PlanetaryLayer } from "./v4";

export type MetricCategory =
  | "climate"
  | "energy"
  | "infrastructure"
  | "social"
  | "economic";

export interface MetricDefinition {
  id: string;
  name: string;
  category: MetricCategory;
  unit: string;
  layer: PlanetaryLayer;
  description: string;
}

export const MetricRegistry: MetricDefinition[] = [
  {
    id: "co2_ppm",
    name: "Atmospheric CO₂ concentration",
    category: "climate",
    unit: "ppm",
    layer: "biosphere",
    description: "Global average atmospheric CO₂ concentration."
  },
  {
    id: "global_temp_anomaly",
    name: "Global temperature anomaly",
    category: "climate",
    unit: "°C",
    layer: "biosphere",
    description: "Temperature anomaly relative to pre-industrial baseline."
  },
  {
    id: "renewable_energy_share",
    name: "Renewable energy share",
    category: "energy",
    unit: "%",
    layer: "infrastructure",
    description: "Percentage of total energy consumption from renewable sources."
  }
];
