// src/ecosystem/v5.ts

import type { IdentityV4 } from "../identity/v4";
import type { GovernanceDecision } from "../governance/v4";
import { createInfluenceGraph, addInfluenceEdge } from "../identity/influence";

export interface EcosystemAgent {
  id: string;
  identity: IdentityV4;
}

export interface EcosystemState {
  agents: EcosystemAgent[];
  influence: ReturnType<typeof createInfluenceGraph>;
  decisions: GovernanceDecision[];
}

export interface EcosystemModule {
  state: EcosystemState;
  addAgent(identity: IdentityV4): void;
  addInfluence(from: string, to: string, weight: number): void;
  addDecision(decision: GovernanceDecision): void;
}

export function initEcosystemModule(): EcosystemModule {
  const influence = createInfluenceGraph();

  return {
    state: {
      agents: [],
      influence,
      decisions: []
    },

    addAgent(identity) {
      this.state.agents.push({
        id: identity.id,
        identity
      });
    },

    addInfluence(from, to, weight) {
      addInfluenceEdge(this.state.influence, from, to, weight);
    },

    addDecision(decision) {
      this.state.decisions.push(decision);
    }
  };
}
