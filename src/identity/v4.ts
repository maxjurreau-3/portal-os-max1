// src/identity/v4.ts

import type { KernelV4Config } from "../kernel/v4";

export type IdentityKind = "agent" | "collective" | "institution";

export interface IdentityV4 {
  id: string;
  kind: IdentityKind;
  displayName: string;
  region: string;
  createdAt: Date;
}

export interface IdentityModule {
  set(identity: IdentityV4): void;
  get(): IdentityV4 | null;
}

export async function initIdentityModule(_config: KernelV4Config): Promise<IdentityModule> {
  let current: IdentityV4 | null = null;

  return {
    set(identity: IdentityV4) {
      current = identity;
    },
    get() {
      return current;
    }
  };
}
