// src/routing/topology.ts

export type RouteId = "home" | "sim" | "identity";

export interface Route {
  id: RouteId;
  path: string;
  label: string;
}

export const routes: Route[] = [
  { id: "home", path: "/", label: "Home" },
  { id: "sim", path: "/sim", label: "SIM" },
  { id: "identity", path: "/identity", label: "Identity" }
];
