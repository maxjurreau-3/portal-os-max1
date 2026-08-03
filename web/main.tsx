// web/main.tsx

import React from "react";
import { createRoot } from "react-dom/client";
import { AppV4 } from "./AppV4";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container #root not found in index.html");
}

const root = createRoot(container);
root.render(<AppV4 />);
