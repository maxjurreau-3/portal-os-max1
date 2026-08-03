// web/main.tsx

import React from "react";
import { createRoot } from "react-dom/client";
import { AppV6 } from "./AppV6";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container #root not found in index.html");
}

const root = createRoot(container);
root.render(<AppV6 />);
