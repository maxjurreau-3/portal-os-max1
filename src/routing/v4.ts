// src/routing/v4.ts

import type { KernelV4Config } from "../kernel/v4";

export type RouteKind = "dashboard" | "sim" | "governance" | "substrate";

export interface RouteV4 {
  id: string;
  kind: RouteKind;
  path: string;
  label: string;
}

export interface RoutingModule {
  routes: RouteV4[];
  getCurrent(): RouteV4;
  navigate(id: string): void;
}

export async function initRoutingModule(_config: KernelV4Config): Promise<RoutingModule> {
  const routes: RouteV4[] = [
    { id: "home", kind: "dashboard", path: "/", label: "Home" },
    { id: "sim", kind: "sim", path: "/sim", label: "SIM" },
    { id: "governance", kind: "governance", path: "/governance", label: "Governance" },
    { id: "substrate", kind: "substrate", path: "/substrate", label: "Substrate" }
  ];

  let current = routes[0];

  return {
    routes,
    getCurrent() {
      return current;
    },
    navigate(id: string) {
      const found = routes.find(r => r.id === id);
      if (found) current = found;
    }
  };
}
