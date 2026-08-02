export interface Env {
  WORLD_STATE: DurableObjectNamespace;
  PORTAL_ENV: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/kernel/status") {
      return new Response(
        JSON.stringify({ status: "ONLINE", env: env.PORTAL_ENV }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    if (url.pathname === "/api/sim/tick") {
      const id = env.WORLD_STATE.idFromName("planetary");
      const stub = env.WORLD_STATE.get(id);
      const res = await stub.fetch("https://world-state/tick");
      return res;
    }

    return new Response("Portal‑OS‑Max backend", { status: 200 });
  },
};

export class WorldState {
  state: { ticks: number };

  constructor() {
    this.state = { ticks: 0 };
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.hostname === "world-state" && url.pathname === "/tick") {
      this.state.ticks += 1;
      return new Response(
        JSON.stringify({ ticks: this.state.ticks }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response("WorldState DO", { status: 200 });
  }
}
