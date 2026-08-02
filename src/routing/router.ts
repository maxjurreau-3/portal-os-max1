// src/routing/router.ts

import { routes, RouteId } from "./topology";

let currentRoute: RouteId = "home";

export async function initializeRouter(): Promise<void> {
  currentRoute = "home";
  console.info("[Routing] Router initialized at /");
}

export function getCurrentRoute(): RouteId {
  return currentRoute;
}

export function navigateTo(routeId: RouteId): void {
  const route = routes.find(r => r.id === routeId);
  if (!route) return;
  currentRoute = routeId;
  console.info("[Routing] Navigated to", route.path);
}
