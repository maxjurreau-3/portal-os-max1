// src/routing/v5.ts

import type { RouteV4 } from "./v4";
import { createRouteModifiers } from "./modifiers";

export interface RoutingV5Module {
  evaluate(
    current: RouteV4,
    routes: RouteV4[],
    signals: Record<string, number>
  ): RouteV4;
}

export function initRoutingV5Module(): RoutingV5Module {
  return {
    evaluate(current, routes, signals) {
      const modifiers = createRouteModifiers(signals);

      let best = current;
      let bestScore = 0;

      for (const route of routes) {
        let score = 1;

        for (const mod of modifiers) {
          score = mod.apply(score, signals);
        }

        if (score > bestScore) {
          bestScore = score;
          best = route;
        }
      }

      return best;
    }
  };
}

