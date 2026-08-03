// src/routing/flows.ts

import type { IdentityV4 } from "../identity/v4";
import type { GovernanceDecision } from "../governance/v4";

export interface FlowCondition {
  id: string;
  description: string;
  check(identity: IdentityV4 | null, governance: GovernanceDecision | null): boolean;
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
    description: "Governance decision must be OK.",
    check(_identity, governance) {
      return governance ? governance.ok : true;
    }
  },
  {
    id: "institution-role",
    description: "Identity must be an institution to access governance routes.",
    check(identity) {
      return identity ? identity.kind === "institution" : false;
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
  }
];
