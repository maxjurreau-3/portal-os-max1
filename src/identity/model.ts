// src/identity/model.ts

export type IdentityTier = "core" | "premium";

export interface Identity {
  id: string;
  displayName: string;
  tier: IdentityTier;
  createdAt: Date;
}

export function createIdentity(
  id: string,
  displayName: string,
  tier: IdentityTier = "core"
): Identity {
  return {
    id,
    displayName,
    tier,
    createdAt: new Date()
  };
}
