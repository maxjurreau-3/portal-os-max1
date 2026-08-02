// src/tec/resources.ts

export interface ResourceUsage {
  cpu: number;
  memory: number;
}

export function getResourceUsage(): ResourceUsage {
  return {
    cpu: Math.random(),
    memory: Math.random()
  };
}
