// web/components/AgentPanel.tsx

import React from "react";
import type { EcosystemAgent } from "../../src/ecosystem/agents";

interface Props {
  agents: EcosystemAgent[];
}

export function AgentPanel({ agents }: Props) {
  return (
    <div>
      <h2>Agents</h2>
      <ul>
        {agents.map(agent => (
          <li key={agent.id}>
            {agent.identity.displayName} — {agent.identity.kind} —{" "}
            {agent.active ? "active" : "inactive"}
          </li>
        ))}
      </ul>
    </div>
  );
}
