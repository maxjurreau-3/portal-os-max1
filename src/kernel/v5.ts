// src/kernel/v6.ts

import { createStressRegistry } from "./stress";
import { createKernelFeedback } from "./feedback";

export interface KernelV6Config {
  ecosystemMode: boolean;
  enableInfluenceGraphs: boolean;
  adaptiveMode: boolean;
}

export interface KernelV6 {
  config: KernelV6Config;
  ecosystemId: string;
  createdAt: Date;
  stress: ReturnType<typeof createStressRegistry>;
  applyFeedback(packet: ReturnType<typeof createKernelFeedback>): void;
}

export function initKernelV6(): KernelV6 {
  const stress = createStressRegistry();

  return {
    config: {
      ecosystemMode: true,
      enableInfluenceGraphs: true,
      adaptiveMode: true
    },

    ecosystemId: crypto.randomUUID(),
    createdAt: new Date(),
    stress,

    applyFeedback(packet) {
      stress.add(packet.globalStress);

      if (packet.globalStress > 5) {
        this.config.adaptiveMode = true;
      }

      if (packet.globalStress < 2) {
        this.config.adaptiveMode = false;
      }
    }
  };
}
