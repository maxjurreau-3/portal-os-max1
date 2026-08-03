// src/routing/flows.ts

import type { IdentityV4 } from "../identity/v4";
import type { GovernanceDecision } from "../governance/v4";
import type { Region } from "../ecosystem/regions";

export interface FlowCondition {
  id: string;
  description: string;
  check(
    identity: IdentityV4 | null,
    governance: GovernanceDecision | null,
    region: Region | null
  ): boolean;
}

export interface DynamicFlow {
  id: string;
  from: string;
  to: string;
  condition: FlowCondition;
}

export const FlowConditions: FlowCondition[] = [
  {
    id: "governance-ok",
    description: "Governance decision must be OK for the current region.",
    check(_identity, governance, region) {
      if (!governance || !region) return true;
      return governance.ok;
    }
  },
  {
    id: "institution-role",
    description: "Identity must be an institution to access governance routes.",
    check(identity) {
      return identity ? identity.kind === "institution" : false;
    }
  },
  {
    id: "region-dashboard",
    description: "Dashboard is always accessible for any region.",
    check() {
      return true;
    }
  }
];

export const DynamicFlows: DynamicFlow[] = [
  {
    id: "sim-to-governance",
    from: "sim",
    to: "governance",
    condition: FlowConditions.find(c => c.id === "governance-ok")!
  },
  {
    id: "dashboard-to-governance",
    from: "home",
    to: "governance",
    condition: FlowConditions.find(c => c.id === "institution-role")!
  },
  {
    id: "dashboard-region",
    from: "home",
    to: "dashboard",
    condition: FlowConditions.find(c => c.id === "region-dashboard")!
  }
];
