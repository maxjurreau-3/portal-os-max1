import React from "react";
import AppV5 from "./AppV5";

export default function App(): JSX.Element {
  return (
    <div className="app-root">
      <h1>Portal‑OS‑Max</h1>
      <p>Legacy App shell — mounting AppV5</p>
      <AppV5 />
    </div>
  );
}
