// src/kernel/modules.ts

import { KernelConfig } from "./config";

// Identity
import * as IdentityModel from "../identity/model";
import * as IdentityLifecycle from "../identity/lifecycle";

// Governance
import * as GovernancePolicies from "../governance/policies";
import * as GovernanceRules from "../governance/rules";

// Routing
import * as RoutingRouter from "../routing/router";
import * as RoutingTopology from "../routing/topology";

// TEC
import * as TECProcesses from "../tec/processes";
import * as TECResources from "../tec/resources";

// SIM
import * as SIMRuntime from "../sim/runtime";
import * as SIMInvariants from "../sim/invariants";
import * as SIMScenarios from "../sim/scenarios";

export interface KernelModules {
  identity: {
    model: typeof IdentityModel;
    lifecycle: typeof IdentityLifecycle;
  };
  governance: {
    policies: typeof GovernancePolicies;
    rules: typeof GovernanceRules;
  };
  routing: {
    router: typeof RoutingRouter;
    topology: typeof RoutingTopology;
  };
  tec: {
    processes: typeof TECProcesses;
    resources: typeof TECResources;
  };
  sim: {
    runtime: typeof SIMRuntime;
    invariants: typeof SIMInvariants;
    scenarios: typeof SIMScenarios;
  };
}

export async function initKernelModules(
  _config: KernelConfig
): Promise<KernelModules> {
  return {
    identity: {
      model: IdentityModel,
      lifecycle: IdentityLifecycle
    },
    governance: {
      policies: GovernancePolicies,
      rules: GovernanceRules
    },
    routing: {
      router: RoutingRouter,
      topology: RoutingTopology
    },
    tec: {
      processes: TECProcesses,
      resources: TECResources
    },
    sim: {
      runtime: SIMRuntime,
      invariants: SIMInvariants,
      scenarios: SIMScenarios
    }
  };
}

export async function startModules(_modules: KernelModules): Promise<void> {
  console.info("[Portal-OS-Max] Modules started.");
}

export async function stopModules(_modules: KernelModules): Promise<void> {
  console.info("[Portal-OS-Max] Modules stopped.");
}
