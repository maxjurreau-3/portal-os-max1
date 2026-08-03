// web/components/AdaptiveStressBar.tsx

import React from "react";

interface Props {
  stress: number;
}

export function AdaptiveStressBar({ stress }: Props) {
  const pct = Math.min(100, stress * 10);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <h3>Kernel Stress</h3>
      <div
        style={{
          width: "100%",
          height: "12px",
          background: "#ddd",
          borderRadius: "6px",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: pct > 70 ? "#d9534f" : pct > 40 ? "#f0ad4e" : "#5cb85c",
            transition: "width 0.3s ease"
          }}
        />
      </div>
      <p>Stress Level: {stress.toFixed(2)}</p>
    </div>
  );
}
