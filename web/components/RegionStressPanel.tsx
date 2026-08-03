// web/components/RegionStressPanel.tsx

import React from "react";

interface Props {
  region: string;
  stress: number;
}

export function RegionStressPanel({ region, stress }: Props) {
  const pct = Math.min(100, stress * 10);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <h3>Region Stress — {region}</h3>
      <div
        style={{
          width: "100%",
          height: "12px",
          background: "#eee",
          borderRadius: "6px",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: pct > 70 ? "#c9302c" : pct > 40 ? "#ec971f" : "#5cb85c",
            transition: "width 0.3s ease"
          }}
        />
      </div>
      <p>Stress Influence: {stress.toFixed(2)}</p>
    </div>
  );
}
