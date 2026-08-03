// src/runtime/v6.ts

import { initKernelV6 } from "../kernel/v6";
import { initEcosystemModule } from "../ecosystem/v6";
import { initSimV6Module } from "../sim/v6";
import { initTecV6Module } from "../tec/v6";
import { initGovernanceV6Module } from "../governance/v6";
import { initRoutingV6Module } from "../routing/v6";
import { initSubstrateV6Module } from "../substrate/v6";

import { runFeedbackPipeline } from "./feedback_pipeline";

export async function initRuntimeV6() {
  const kernel = initKernelV6();
  const ecosystem = initEcosystemModule();
  const sim = initSimV6Module();
  const tec = initTecV6Module();
  const governance = initGovernanceV6Module();
  const routing = initRoutingV6Module();
  const substrate = initSubstrateV6Module();

  return {
    kernel,
    ecosystem,
    sim,
    tec,
    governance,
    routing,
    substrate,

    async run(region: string) {
      // 1. Fuse substrate metrics adaptively
      const fused = await substrate.fuseAdaptive(kernel.stress);

      // 2. Compute unified feedback packet
      const feedback = runFeedbackPipeline(fused, kernel.stress);

      // 3. Apply kernel-level feedback
      kernel.applyFeedback(feedback.packet);

      // 4. Run adaptive SIM, TEC, Governance
      const trajectory = await sim.runAdaptive(region, fused, kernel.stress);
      const cost = await tec.estimateAdaptive(fused, region, kernel.stress);
      const decision = await governance.evaluateAdaptive(fused, region, kernel.stress);

      // 5. Apply feedback to ecosystem (identity adaptation + influence propagation)
      ecosystem.applyKernelFeedback(feedback.packet, kernel.stress);

      // 6. Adaptive routing (single clean evaluation)
      const nextRoute = routing.evaluateAdaptive(
        routing.getCurrent(),
        routing.routes,
        kernel.stress
      );

      return {
        fused,
        feedback,
        trajectory,
        cost,
        decision,
        nextRoute
      };
    }
  };
}
