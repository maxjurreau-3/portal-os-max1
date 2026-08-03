// src/kernel/feedback.ts

export interface KernelFeedbackPacket {
  fusedSignals: Record<string, number>;
  simStress: number;
  tecStress: number;
  governanceStress: number;
  routingStress: number;
  globalStress: number;
}

export function createKernelFeedback(
  fusedSignals: Record<string, number>,
  simStress: number,
  tecStress: number,
  governanceStress: number,
  routingStress: number
): KernelFeedbackPacket {
  const globalStress =
    simStress * 0.25 +
    tecStress * 0.25 +
    governanceStress * 0.25 +
    routingStress * 0.25;

  return {
    fusedSignals,
    simStress,
    tecStress,
    governanceStress,
    routingStress,
    globalStress
  };
}
