// src/ecosystem/collectives.ts

import type { IdentityV4 } from "../identity/v4";

export interface Collective {
  id: string;
  name: string;
  members: IdentityV4[];
}

export interface CollectiveRegistry {
  collectives: Collective[];
  create(name: string): Collective;
  addMember(collectiveId: string, identity: IdentityV4): void;
  list(): Collective[];
}

export function createCollectiveRegistry(): CollectiveRegistry {
  const collectives: Collective[] = [];

  return {
    collectives,

    create(name) {
      const collective: Collective = {
        id: crypto.randomUUID(),
        name,
        members: []
      };
      collectives.push(collective);
      return collective;
    },

    addMember(collectiveId, identity) {
      const col = collectives.find(c => c.id === collectiveId);
      if (col) col.members.push(identity);
    },

    list() {
      return collectives;
    }
  };
}
