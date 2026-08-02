// web/App.tsx
import React from "react";
import { bootKernel } from "../src/kernel/boot";
import { getCurrentIdentity } from "../src/identity/lifecycle";
import { routes } from "../src/routing/topology";
import { navigateTo, getCurrentRoute } from "../src/routing/router";

export const App: React.FC = () => {
  const [booted, setBooted] = React.useState(false);
  const [route, setRoute] = React.useState(getCurrentRoute());
  const [identityName, setIdentityName] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      await bootKernel();
      const identity = getCurrentIdentity();
      setIdentityName(identity?.displayName ?? null);
      setBooted(true);
    })();
  }, []);

  const onNav = (id: typeof routes[number]["id"]) => {
    navigateTo(id);
    setRoute(id);
  };

  return (
    <div style={{ fontFamily: "system-ui", padding: "1.5rem" }}>
      <header style={{ marginBottom: "1rem" }}>
        <h1>Portal-OS-Max</h1>
        <p>SIM-first, identity-governed operating substrate.</p>
        <p>
          Status:{" "}
          <strong>{booted ? "Kernel booted" : "Booting kernel..."}</strong>
        </p>
        {identityName && <p>Identity: {identityName}</p>}
      </header>

      <nav style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
        {routes.map(r => (
          <button
            key={r.id}
            onClick={() => onNav(r.id)}
            style={{
              padding: "0.4rem 0.8rem",
              borderRadius: "0.25rem",
              border: route === r.id ? "2px solid black" : "1px solid #ccc",
              background: route === r.id ? "#eee" : "#fff",
              cursor: "pointer"
            }}
          >
            {r.label}
          </button>
        ))}
      </nav>

      <main>
        {route === "home" && <p>Home: kernel overview and status.</p>}
        {route === "sim" && <p>SIM: scenarios and invariants.</p>}
        {route === "identity" && <p>Identity: current identity state.</p>}
      </main>
    </div>
  );
};
