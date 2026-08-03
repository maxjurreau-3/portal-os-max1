// src/ecosystem/integration.ts

import { initKernelV5 } from "../kernel/v5";
import { initEcosystemModule } from "./v5";

import { initIdentityModule } from "../identity/v4";
import { initSimModule } from "../sim/v4";
import { initTecModule } from "../tec/v4";
import { initGovernanceModule } from "../governance/v4";
import { initSubstrateModule } from "../substrate/v4";
import { initRoutingModule } from "../routing/v4";

export interface EcosystemRuntime {
  kernel: ReturnType<typeof initKernelV5>;
  ecosystem: ReturnType<typeof initEcosystemModule>;
  identity: Awaited<ReturnType<typeof initIdentityModule>>;
  sim: Awaited<ReturnType<typeof initSimModule>>;
  tec: Awaited<ReturnType<typeof initTecModule>>;
  governance: Awaited<ReturnType<typeof initGovernanceModule>>;
  substrate: Awaited<ReturnType<typeof initSubstrateModule>>;
  routing: Awaited<ReturnType<typeof initRoutingModule>>;
}

export async function initEcosystemRuntime(): Promise<EcosystemRuntime> {
  const kernel = initKernelV5();
  const ecosystem = initEcosystemModule();

  const identity = await initIdentityModule(kernel);
  const sim = await initSimModule(kernel);
  const tec = await initTecModule(kernel);
  const governance = await initGovernanceModule(kernel);
  const substrate = await initSubstrateModule();
  const routing = await initRoutingModule(kernel, identity, governance);

  // region assignment: default global region
  const globalRegion = kernel.regions.create("global");
  kernel.regions.addAgent(globalRegion.id, identity.get()!);

  return {
    kernel,
    ecosystem,
    identity,
    sim,
    tec,
    governance,
    substrate,
    routing
  };
}
