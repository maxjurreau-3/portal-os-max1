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
    id: "region-governance-ok",
    description: "Governance decision must be OK for the current region.",
    check(_identity, governance, region) {
      if (!governance || !region) return true;
      return governance.ok;
    }
  },
  {
    id: "region-institution-access",
    description: "Only institutions may access region governance routes.",
    check(identity) {
      return identity ? identity.kind === "institution" : false;
    }
  },
  {
    id: "region-dashboard-access",
    description: "Dashboard is always accessible for any region.",
    check() {
      return true;
    }
  }
];

export const DynamicFlows: DynamicFlow[] = [
  {
    id: "sim-to-governance-region",
    from: "sim",
    to: "governance",
    condition: FlowConditions.find(c => c.id === "region-governance-ok")!
  },
  {
    id: "home-to-governance-region",
    from: "home",
    to: "governance",
    condition: FlowConditions.find(c => c.id === "region-institution-access")!
  },
  {
    id: "home-to-region-dashboard",
    from: "home",
    to: "region",
    condition: FlowConditions.find(c => c.id === "region-dashboard-access")!
  }
];
