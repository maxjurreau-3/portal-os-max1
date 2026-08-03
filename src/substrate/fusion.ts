// src/substrate/fusion.ts

import type { PlanetaryMetric } from "./v4";

export interface FusedMetric {
  id: string;
  region: string;
  value: number;
  unit: string;
  layers: string[];
}

export function fuseMetrics(metrics: PlanetaryMetric[]): FusedMetric[] {
  const byRegion: Record<string, PlanetaryMetric[]> = {};

  for (const m of metrics) {
    if (!byRegion[m.region]) byRegion[m.region] = [];
    byRegion[m.region].push(m);
  }

  const fused: FusedMetric[] = [];

  for (const region of Object.keys(byRegion)) {
    const regionMetrics = byRegion[region];

    const grouped: Record<string, PlanetaryMetric[]> = {};
    for (const m of regionMetrics) {
      if (!grouped[m.id]) grouped[m.id] = [];
      grouped[m.id].push(m);
    }

    for (const id of Object.keys(grouped)) {
      const group = grouped[id];
      const avg = group.reduce((acc, m) => acc + m.value, 0) / group.length;

      fused.push({
        id,
        region,
        value: avg,
        unit: group[0].unit,
        layers: group.map(g => g.layer)
      });
    }
  }

  return fused;
}
