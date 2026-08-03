// src/routing/region.ts

export interface RegionRoute {
  id: string;
  regionId: string;
  path: string;
  label: string;
}

export function createRegionRoute(regionId: string): RegionRoute {
  return {
    id: `region-${regionId}`,
    regionId,
    path: `/region/${regionId}`,
    label: `Region: ${regionId}`
  };
}
