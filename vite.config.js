import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as XLSX from "xlsx";
import fs from "node:fs";
import { MASTER_XLSX as MASTER } from "./data-source.mjs";

const FIXED = ["Department", "Category", "Capability", "Description"];

/* Dev-only API: POST /api/add-capability appends a row to the master workbook.
   Only runs under `npm run dev` — on the built static site the fetch 404s and
   the form falls back to download/copy. */
function addCapabilityApi() {
  return {
    name: "add-capability-api",
    configureServer(server) {
      server.middlewares.use("/api/add-capability", (req, res, next) => {
        if (req.method !== "POST") return next();
        let body = "";
        req.on("data", (c) => (body += c));
        req.on("end", () => {
          const send = (code, obj) => {
            res.statusCode = code;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(obj));
          };
          try {
            const data = JSON.parse(body || "{}");
            if (!data.capability || !data.department) {
              return send(400, { ok: false, error: "Missing required fields" });
            }
            const wb = XLSX.read(fs.readFileSync(MASTER), { type: "buffer" });
            const ws = wb.Sheets["Capabilities"];
            const header = XLSX.utils.sheet_to_json(ws, { header: 1 })[0] || [];
            const toolCols = header.filter((h) => !FIXED.includes(h));
            const enabled = new Set(data.tools || []);
            const row = {
              Department: data.department,
              Category: data.category || "",
              Capability: data.capability,
              Description: data.description || "",
            };
            toolCols.forEach((t) => {
              row[t] = enabled.has(t) ? "X" : "";
            });
            XLSX.utils.sheet_add_json(ws, [row], {
              skipHeader: true,
              origin: -1,
              header,
            });
            fs.writeFileSync(MASTER, XLSX.write(wb, { bookType: "xlsx", type: "buffer" }));
            send(200, { ok: true });
          } catch (e) {
            send(500, { ok: false, error: String((e && e.message) || e) });
          }
        });
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  base: command === "build" ? "./" : "/",
  plugins: [react(), addCapabilityApi()],
  server: {
    port: 5173,
    open: false,
  },
}));
