import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// Relative `base` so the production build is portable: the dist/ folder works
// served from any internal path, a network share, or opened locally — no
// hardcoded site root. Dev still serves at http://localhost:5173/.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "./" : "/",
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
  },
}));
