// src/ecosystem/integration.ts

import { initKernelV5 } from "../kernel/v5";
import { initEcosystemModule } from "./v5";

import { initIdentityModule } from "../identity/v4";
import { initSimModule } from "../sim/v4";
import { initTecModule } from "../tec/v4";
import { initGovernanceModule } from "../governance/v4";
import { initSubstrateModule } from "../substrate/v4";
import { initRoutingModule } from "../routing/v4";

import { FeedbackSignals } from "../feedback/signals";
import { createModifiers } from "../feedback/modifiers";

export async function initEcosystemRuntime() {
  const kernel = initKernelV5();
  const ecosystem = initEcosystemModule();

  const identity = await initIdentityModule(kernel);
  const sim = await initSimModule(kernel);
  const tec = await initTecModule(kernel);
  const governance = await initGovernanceModule(kernel);
  const substrate = await initSubstrateModule();
  const routing = await initRoutingModule(kernel, identity, governance);

  // region assignment
  const globalRegion = kernel.regions.create("global");
  kernel.regions.addAgent(globalRegion.id, identity.get()!);

  async function computeFeedback() {
    const fused = await substrate.fuse();

    const signalValues: Record<string, number> = {};
    for (const signal of FeedbackSignals) {
      signalValues[signal.id] = signal.compute(fused);
    }

    const modifiers = createModifiers(signalValues);

    return { fused, signalValues, modifiers };
  }

  return {
    kernel,
    ecosystem,
    identity,
    sim,
    tec,
    governance,
    substrate,
    routing,
    computeFeedback
  };
}
