// src/ecosystem/adaptation.ts

import type { StressRegistry } from "../kernel/stress";
import type { IdentityV4 } from "../identity/v4";

export interface AdaptationRule {
  id: string;
  description: string;
  apply(identity: IdentityV4, stress: number): IdentityV4;
}

export const AdaptationRules: AdaptationRule[] = [
  {
    id: "identity-role-shift",
    description: "High stress shifts agents toward institutional roles.",
    apply(identity, stress) {
      if (stress > 5 && identity.kind === "individual") {
        return { ...identity, kind: "institution" };
      }
      return identity;
    }
  },
  {
    id: "identity-influence-boost",
    description: "Stress boosts influence weight of governance actors.",
    apply(identity, stress) {
      if (identity.kind === "institution") {
        return { ...identity, influenceWeight: (identity.influenceWeight ?? 1) + stress * 0.1 };
      }
      return identity;
    }
  }
];

export function adaptIdentity(identity: IdentityV4, stress: StressRegistry): IdentityV4 {
  const level = stress.getSmoothed();
  let updated = identity;

  for (const rule of AdaptationRules) {
    updated = rule.apply(updated, level);
  }

  return updated;
}
