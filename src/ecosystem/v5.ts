// src/ecosystem/v6.ts

import { createAgentRegistry } from "./agents";
import { createCollectiveRegistry } from "./collectives";
import { createInfluenceGraph, addInfluenceEdge } from "../identity/influence";

import { adaptIdentity } from "./adaptation";
import { propagateKernelInfluence } from "./influence_v6";

import type { IdentityV4 } from "../identity/v4";
import type { GovernanceDecision } from "../governance/v4";
import type { RegionRegistry } from "./regions";
import type { KernelFeedbackPacket } from "../kernel/feedback";
import type { StressRegistry } from "../kernel/stress";

export interface EcosystemState {
  agents: ReturnType<typeof createAgentRegistry>;
  collectives: ReturnType<typeof createCollectiveRegistry>;
  influence: ReturnType<typeof createInfluenceGraph>;
  decisions: GovernanceDecision[];
}

export interface EcosystemModuleV6 {
  state: EcosystemState;
  addAgent(identity: IdentityV4, regions: RegionRegistry, stress: StressRegistry): void;
  addCollective(name: string): string;
  addMemberToCollective(collectiveId: string, identity: IdentityV4): void;
  addInfluence(from: string, to: string, weight: number): void;
  addDecision(decision: GovernanceDecision): void;
  applyKernelFeedback(packet: KernelFeedbackPacket, stress: StressRegistry): void;
}

export function initEcosystemModule(): EcosystemModuleV6 {
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

    addAgent(identity, regions, stress) {
      const adapted = adaptIdentity(identity, stress);
      regions.addAgent(regions.list()[0].id, adapted);
      agents.add(adapted);
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
    },

    applyKernelFeedback(packet, stress) {
      stress.add(packet.globalStress);
      propagateKernelInfluence(this.state.influence, stress);
    }
  };
}
