// src/identity/influence.ts

export interface InfluenceEdge {
  from: string;
  to: string;
  weight: number; // 0–1 influence strength
}

export interface InfluenceGraph {
  nodes: string[];
  edges: InfluenceEdge[];
}

export function createInfluenceGraph(): InfluenceGraph {
  return {
    nodes: [],
    edges: []
  };
}

export function addInfluenceEdge(
  graph: InfluenceGraph,
  from: string,
  to: string,
  weight: number
) {
  graph.nodes.push(from);
  graph.nodes.push(to);

  graph.edges.push({
    from,
    to,
    weight
  });
}
