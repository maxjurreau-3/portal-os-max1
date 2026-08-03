// src/kernel/stress.ts

export interface StressPoint {
  timestamp: Date;
  value: number;
}

export interface StressRegistry {
  points: StressPoint[];
  add(value: number): void;
  getSmoothed(): number;
}

export function createStressRegistry(): StressRegistry {
  const points: StressPoint[] = [];

  return {
    points,

    add(value) {
      points.push({
        timestamp: new Date(),
        value
      });
    },

    getSmoothed() {
      if (points.length === 0) return 0;

      const recent = points.slice(-10);
      const avg =
        recent.reduce((acc, p) => acc + p.value, 0) / recent.length;

      return avg;
    }
  };
}
