// src/ecosystem/v5.ts

import { createAgentRegistry } from "./agents";
import { createCollectiveRegistry } from "./collectives";
import { createInfluenceGraph, addInfluenceEdge } from "../identity/influence";
import type { IdentityV4 } from "../identity/v4";
import type { GovernanceDecision } from "../governance/v4";

export interface EcosystemState {
  agents: ReturnType<typeof createAgentRegistry>;
  collectives: ReturnType<typeof createCollectiveRegistry>;
  influence: ReturnType<typeof createInfluenceGraph>;
  decisions: GovernanceDecision[];
}

export interface EcosystemModule {
  state: EcosystemState;
  addAgent(identity: IdentityV4): void;
  addCollective(name: string): string;
  addMemberToCollective(collectiveId: string, identity: IdentityV4): void;
  addInfluence(from: string, to: string, weight: number): void;
  addDecision(decision: GovernanceDecision): void;
}

export function initEcosystemModule(): EcosystemModule {
  const agents = createAgentRegistry();
  const collectives = createCollectiveRegistry();
  const influence = createInfluenceGraph();

  return {
    state: {
      agents,
      collectives,
      influence,
      decisions: []
    },

    addAgent(identity) {
      agents.add(identity);
    },

    addCollective(name) {
      const col = collectives.create(name);
      return col.id;
    },

    addMemberToCollective(collectiveId, identity) {
      collectives.addMember(collectiveId, identity);
    },

    addInfluence(from, to, weight) {
      addInfluenceEdge(influence, from, to, weight);
    },

    addDecision(decision) {
      this.state.decisions.push(decision);
    }
  };
}
