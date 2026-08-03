// src/identity/v4.ts

import type { KernelV4Config } from "../kernel/v4";
import { RoleRegistry, RoleDefinition } from "./roles";
import {
  createInfluenceGraph,
  addInfluenceEdge,
  InfluenceGraph
} from "./influence";

export type IdentityKind = "agent" | "collective" | "institution";

export interface IdentityV4 {
  id: string;
  kind: IdentityKind;
  displayName: string;
  region: string;
  createdAt: Date;
  role: RoleDefinition;
}

export interface IdentityModule {
  set(identity: IdentityV4): void;
  get(): IdentityV4 | null;
  influence: InfluenceGraph;
  addInfluence(from: string, to: string, weight: number): void;
  listRoles(): RoleDefinition[];
}

export async function initIdentityModule(_config: KernelV4Config): Promise<IdentityModule> {
  let current: IdentityV4 | null = null;
  const influence = createInfluenceGraph();

  return {
    set(identity: IdentityV4) {
      current = identity;
    },

    get() {
      return current;
    },

    influence,

    addInfluence(from: string, to: string, weight: number) {
      addInfluenceEdge(influence, from, to, weight);
    },

    listRoles() {
      return RoleRegistry;
    }
  };
}
