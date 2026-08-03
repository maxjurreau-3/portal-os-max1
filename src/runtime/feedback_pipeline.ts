// src/runtime/feedback_pipeline.ts

import type { FusedMetric } from "../substrate/fusion";
import type { StressRegistry } from "../kernel/stress";
import { createKernelFeedback } from "../kernel/feedback";

export interface FeedbackPipelineResult {
  fused: FusedMetric[];
  simStress: number;
  tecStress: number;
  governanceStress: number;
  routingStress: number;
  packet: ReturnType<typeof createKernelFeedback>;
}

export function runFeedbackPipeline(
  fused: FusedMetric[],
  stress: StressRegistry
): FeedbackPipelineResult {
  const level = stress.getSmoothed();

  const simStress = level * 0.4;
  const tecStress = level * 0.3;
  const governanceStress = level * 0.2;
  const routingStress = level * 0.1;

  const packet = createKernelFeedback(
    {},
    simStress,
    tecStress,
    governanceStress,
    routingStress
  );

  return {
    fused,
    simStress,
    tecStress,
    governanceStress,
    routingStress,
    packet
  };
}
