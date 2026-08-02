import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: ".",            // IMPORTANT
  publicDir: "public",  // IMPORTANT
  plugins: [react()],
  build: {
    outDir: "dist"
  }
});
