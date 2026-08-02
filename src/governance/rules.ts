// src/governance/rules.ts

import { Policy, getPolicies } from "./policies";

export interface RuleCheckResult {
  ok: boolean;
  violatedPolicies: Policy[];
}

export function evaluateRules(): RuleCheckResult {
  const active = getPolicies().filter(p => p.enabled);
  return {
    ok: true,
    violatedPolicies: []
  };
}
