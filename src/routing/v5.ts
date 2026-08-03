// src/routing/v6.ts

import type { RouteV4 } from "./v4";
import type { StressRegistry } from "../kernel/stress";

export interface RoutingV6Module {
  evaluateAdaptive(
    current: RouteV4,
    routes: RouteV4[],
    stress: StressRegistry
  ): RouteV4;
}

export function initRoutingV6Module(): RoutingV6Module {
  return {
    evaluateAdaptive(current, routes, stress) {
      const level = stress.getSmoothed();

      let best = current;
      let bestScore = 0;

      for (const route of routes) {
        let score = 1;

        if (route.kind === "governance") score += level * 0.2;
        if (route.kind === "substrate") score += level * 0.15;
        if (route.kind === "region") score += level * 0.1;

        if (score > bestScore) {
          bestScore = score;
          best = route;
        }
      }

      return best;
    }
  };
}
