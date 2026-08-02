// src/kernel/config.ts

export interface KernelConfig {
  version: string;
  environment: "development" | "production";
  enableSIM: boolean;
  enableGovernance: boolean;
  enableIdentity: boolean;
  enableRouting: boolean;
  enableTEC: boolean;
}

export async function loadKernelConfig(): Promise<KernelConfig> {
  const environment =
    import.meta.env.MODE === "production" ? "production" : "development";

  return {
    version: "1.0.0",
    environment,
    enableSIM: true,
    enableGovernance: true,
    enableIdentity: true,
    enableRouting: true,
    enableTEC: true
  };
}
