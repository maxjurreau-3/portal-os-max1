// src/kernel/boot.ts

import { KernelConfig, loadKernelConfig } from "./config";
import {
  KernelModules,
  initKernelModules,
  startModules,
  stopModules
} from "./modules";

export interface KernelContext {
  config: KernelConfig;
  modules: KernelModules;
  startedAt: Date;
  healthy: boolean;
}

export async function bootKernel(): Promise<KernelContext> {
  const startedAt = new Date();
  const config = await loadKernelConfig();
  const modules = await initKernelModules(config);
  await startModules(modules);

  const context: KernelContext = {
    config,
    modules,
    startedAt,
    healthy: true
  };

  console.info("[Portal-OS-Max] Kernel booted:", {
    version: config.version,
    environment: config.environment,
    startedAt: startedAt.toISOString()
  });

  return context;
}

export async function shutdownKernel(context: KernelContext): Promise<void> {
  if (!context.healthy) return;

  await stopModules(context.modules);
  context.healthy = false;

  console.info("[Portal-OS-Max] Kernel shutdown:", {
    startedAt: context.startedAt.toISOString()
  });
}
