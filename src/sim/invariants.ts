// src/sim/invariants.ts

export interface SimInvariant {
  id: string;
  description: string;
}

export const invariants: SimInvariant[] = [
  {
    id: "identity-consistency",
    description: "Identity must remain consistent across SIM runs."
  },
  {
    id: "no-destructive-output",
    description: "SIM must not produce destructive side effects."
  }
];
