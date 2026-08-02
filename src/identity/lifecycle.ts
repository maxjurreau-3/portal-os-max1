// src/identity/lifecycle.ts

import { Identity, createIdentity } from "./model";

let currentIdentity: Identity | null = null;

export async function initializeIdentity(): Promise<Identity> {
  currentIdentity = createIdentity("bee-core", "BEE-SIM Core", "core");
  return currentIdentity;
}

export function getCurrentIdentity(): Identity | null {
  return currentIdentity;
}

export function clearIdentity(): void {
  currentIdentity = null;
}
