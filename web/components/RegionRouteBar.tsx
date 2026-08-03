// web/components/RegionRouteBar.tsx

import React from "react";
import type { Region } from "../../src/ecosystem/regions";

interface Props {
  regions: Region[];
  onSelect: (regionId: string) => void;
}

export function RegionRouteBar({ regions, onSelect }: Props) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <h3>Regions</h3>
      {regions.map(region => (
        <button
          key={region.id}
          onClick={() => onSelect(region.id)}
          style={{ marginRight: "0.5rem" }}
        >
          {region.name}
        </button>
      ))}
    </div>
  );
}
