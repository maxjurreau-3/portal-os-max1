// src/ecosystem/agents.ts

import type { IdentityV4 } from "../identity/v4";

export interface EcosystemAgent {
  id: string;
  identity: IdentityV4;
  active: boolean;
}

export interface AgentRegistry {
  agents: EcosystemAgent[];
  add(identity: IdentityV4): EcosystemAgent;
  activate(id: string): void;
  deactivate(id: string): void;
  list(): EcosystemAgent[];
}

export function createAgentRegistry(): AgentRegistry {
  const agents: EcosystemAgent[] = [];

  return {
    agents,

    add(identity) {
      const agent: EcosystemAgent = {
        id: identity.id,
        identity,
        active: true
      };
      agents.push(agent);
      return agent;
    },

    activate(id) {
      const agent = agents.find(a => a.id === id);
      if (agent) agent.active = true;
    },

    deactivate(id) {
      const agent = agents.find(a => a.id === id);
      if (agent) agent.active = false;
    },

    list() {
      return agents;
    }
  };
}
