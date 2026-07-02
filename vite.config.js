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
            const dept = String(data.department).trim();
            const cap = String(data.capability).trim();
            const wb = XLSX.read(fs.readFileSync(MASTER), { type: "buffer" });

            // --- Capabilities sheet (append only if it's a new capability) ---
            const ws = wb.Sheets["Capabilities"];
            const header = XLSX.utils.sheet_to_json(ws, { header: 1 })[0] || [];
            const existing = XLSX.utils.sheet_to_json(ws, { defval: "" });
            const dupe = existing.some(
              (r) =>
                String(r.Capability).trim().toLowerCase() === cap.toLowerCase() &&
                String(r.Department).trim().toLowerCase() === dept.toLowerCase()
            );
            if (!dupe) {
              const toolCols = header.filter((h) => !FIXED.includes(h));
              const enabled = new Set(data.tools || []);
              const row = {
                Department: dept,
                Category: data.category || "",
                Capability: cap,
                Description: data.description || "",
              };
              toolCols.forEach((t) => {
                row[t] = enabled.has(t) ? "X" : "";
              });
              XLSX.utils.sheet_add_json(ws, [row], { skipHeader: true, origin: -1, header });
            }

            // --- Usage sheet (one author guide row per selected tool) ---
            if (data.url) {
              const UH = ["Capability", "Department", "Tool", "Author", "URL"];
              const toolsList = data.tools && data.tools.length ? data.tools : [""];
              const usageRows = toolsList.map((t) => ({
                Capability: cap,
                Department: dept,
                Tool: t,
                Author: data.author || "Anonymous",
                URL: data.url,
              }));
              let uws = wb.Sheets["Usage"];
              if (!uws) {
                uws = XLSX.utils.json_to_sheet(usageRows, { header: UH });
                XLSX.utils.book_append_sheet(wb, uws, "Usage");
              } else {
                XLSX.utils.sheet_add_json(uws, usageRows, {
                  skipHeader: true,
                  origin: -1,
                  header: UH,
                });
              }
            }

            fs.writeFileSync(MASTER, XLSX.write(wb, { bookType: "xlsx", type: "buffer" }));
            send(200, { ok: true, added: !dupe });
          } catch (e) {
            send(500, { ok: false, error: String((e && e.message) || e) });
          }
        });
      });

      // POST /api/request-capability -> append to a "Requests" sheet
      server.middlewares.use("/api/request-capability", (req, res, next) => {
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
            if (!data.request) return send(400, { ok: false, error: "Missing request" });
            const wb = XLSX.read(fs.readFileSync(MASTER), { type: "buffer" });
            const REQ_HEADER = ["Submitted", "Request", "Department", "Details"];
            const row = {
              Submitted: new Date().toISOString().slice(0, 10),
              Request: data.request,
              Department: data.department || "",
              Details: data.details || "",
            };
            let ws = wb.Sheets["Requests"];
            if (!ws) {
              ws = XLSX.utils.json_to_sheet([row], { header: REQ_HEADER });
              XLSX.utils.book_append_sheet(wb, ws, "Requests");
            } else {
              XLSX.utils.sheet_add_json(ws, [row], {
                skipHeader: true,
                origin: -1,
                header: REQ_HEADER,
              });
            }
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
