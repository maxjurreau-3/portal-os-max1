// src/sim/runtime.ts

import { invariants } from "./invariants";
import { scenarios } from "./scenarios";

export async function initializeSIM(): Promise<void> {
  console.info("[SIM] Runtime initialized.");
  console.info("[SIM] Invariants:", invariants.map(i => i.id));
  console.info("[SIM] Scenarios:", scenarios.map(s => s.id));
}

export async function shutdownSIM(): Promise<void> {
  console.info("[SIM] Runtime shutdown.");
}
