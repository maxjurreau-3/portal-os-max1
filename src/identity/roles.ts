// src/identity/roles.ts

export type RoleKind =
  | "individual"
  | "collective"
  | "institution"
  | "governance"
  | "observer";

export interface RoleDefinition {
  id: string;
  name: string;
  capabilities: string[];
}

export const RoleRegistry: RoleDefinition[] = [
  {
    id: "agent-basic",
    name: "Basic Agent",
    capabilities: ["observe", "participate"]
  },
  {
    id: "collective-node",
    name: "Collective Node",
    capabilities: ["coordinate", "aggregate", "represent"]
  },
  {
    id: "institution-governance",
    name: "Governance Institution",
    capabilities: ["evaluate", "decide", "enforce"]
  }
];
