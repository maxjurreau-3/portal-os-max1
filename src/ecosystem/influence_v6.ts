// src/ecosystem/influence_v6.ts

import type { InfluenceGraph } from "../identity/influence";
import type { StressRegistry } from "../kernel/stress";

export function propagateKernelInfluence(
  graph: InfluenceGraph,
  stress: StressRegistry
): void {
  const level = stress.getSmoothed();

  for (const edge of graph.edges) {
    edge.weight = edge.weight * (1 + level * 0.05);
  }
}
